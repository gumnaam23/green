import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const dateRange = searchParams.get('range') || 'last-30-days';
    const reportType = searchParams.get('type') || 'summary';
    const donationType = searchParams.get('donationType') || 'all';
    const cityFilter = searchParams.get('city') || 'all';

    // Calculate date range
    const now = new Date();
    let startDate, endDate = now;

    switch (dateRange) {
      case 'last-7-days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'last-30-days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'last-3-months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case 'last-6-months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        break;
      case 'last-year':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Build match conditions
    let matchConditions = {
      date: { $gte: startDate, $lte: endDate }
    };

    if (donationType !== 'all') {
      matchConditions.type = donationType;
    }

    if (cityFilter !== 'all') {
      matchConditions.city = new RegExp(cityFilter, 'i');
    }

    // Get total statistics for the period
    const totalStats = await Donation.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          totalDonations: { $sum: 1 },
          totalTrees: { $sum: '$trees' }
        }
      }
    ]);

    const totalRevenue = totalStats[0]?.totalRevenue || 0;
    const totalDonations = totalStats[0]?.totalDonations || 0;
    const totalTrees = totalStats[0]?.totalTrees || 0;
    const averageDonation = totalDonations > 0 ? Math.round(totalRevenue / totalDonations) : 0;

    // Get donation sources breakdown
    const donationSources = await Donation.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: '$type',
          amount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { amount: -1 } }
    ]);

    const formattedSources = donationSources.map(source => ({
      source: source._id.charAt(0).toUpperCase() + source._id.slice(1),
      amount: source.amount,
      percentage: totalRevenue > 0 ? Math.round((source.amount / totalRevenue) * 100) : 0,
      count: source.count
    }));

    // Get monthly breakdown
    const monthlyBreakdown = await Donation.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          revenue: { $sum: '$amount' },
          donations: { $sum: 1 },
          trees: { $sum: '$trees' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const formattedMonthly = monthlyBreakdown.map(item => {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return {
        month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
        revenue: item.revenue,
        donations: item.donations,
        trees: item.trees
      };
    });

    // Get city breakdown
    const cityBreakdown = await Donation.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: '$city',
          amount: { $sum: '$amount' },
          donations: { $sum: 1 },
          trees: { $sum: '$trees' }
        }
      },
      { $sort: { amount: -1 } },
      { $limit: 10 }
    ]);

    const formattedCities = cityBreakdown.map(city => ({
      city: city._id || 'Unknown',
      amount: city.amount,
      donations: city.donations,
      trees: city.trees
    }));

    // Get top donors
    const topDonors = await Donation.find(matchConditions)
      .sort({ amount: -1 })
      .limit(5)
      .lean();

    const formattedTopDonors = topDonors.map((donor, index) => ({
      name: donor.anonymous ? 'Anonymous' : donor.donorName,
      amount: donor.amount,
      type: donor.type,
      city: donor.city,
      trees: donor.trees || 0
    }));

    // Get recent transactions
    const recentTransactions = await Donation.find(matchConditions)
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const formattedTransactions = recentTransactions.map((donation, index) => ({
      id: `TXN${String(index + 1).padStart(3, '0')}`,
      donor: donation.anonymous ? 'Anonymous' : donation.donorName,
      amount: donation.amount,
      type: donation.type,
      date: donation.date || donation.createdAt,
      trees: donation.trees || 0,
      status: 'completed'
    }));

    // Calculate period growth (compare with previous period)
    const previousPeriodStart = new Date(startDate);
    previousPeriodStart.setTime(previousPeriodStart.getTime() - (endDate.getTime() - startDate.getTime()));

    const previousPeriodStats = await Donation.aggregate([
      {
        $match: {
          ...matchConditions,
          date: { $gte: previousPeriodStart, $lt: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' }
        }
      }
    ]);

    const previousRevenue = previousPeriodStats[0]?.totalRevenue || 0;
    const periodGrowth = previousRevenue > 0
      ? Math.round(((totalRevenue - previousRevenue) / previousRevenue) * 100)
      : (totalRevenue > 0 ? 100 : 0);

    const reportData = {
      summary: {
        totalRevenue,
        totalDonations,
        averageDonation,
        totalTrees,
        periodGrowth,
        topDonor: formattedTopDonors[0]?.name || 'N/A',
        topAmount: formattedTopDonors[0]?.amount || 0
      },
      monthlyBreakdown: formattedMonthly,
      donationSources: formattedSources,
      cityBreakdown: formattedCities,
      topDonors: formattedTopDonors,
      recentTransactions: formattedTransactions,
      metadata: {
        dateRange,
        reportType,
        donationType,
        cityFilter,
        generatedAt: new Date().toISOString(),
        totalRecords: totalDonations
      }
    };

    return NextResponse.json(reportData);

  } catch (error) {
    console.error('Admin financials reports API error:', error);
    return NextResponse.json(
      { message: "Failed to generate financial report", error: error.message },
      { status: 500 }
    );
  }
}
