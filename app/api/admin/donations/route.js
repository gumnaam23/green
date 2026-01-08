import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Donation from "@/models/Donation";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query = {};

    // Filter by status if provided
    if (status && status !== 'all') {
      // For now, we'll assume all donations are completed since the model doesn't have status
      // In future, we might add status field to Donation model
    }

    // Search functionality
    if (search) {
      query.$or = [
        { donorName: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const donations = await Donation.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Donation.countDocuments(query);

    // Calculate stats
    const totalAmount = await Donation.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalTrees = await Donation.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$trees' } } }
    ]);

    // Count unique donors (non-anonymous)
    const uniqueDonors = await Donation.distinct('donorName', {
      ...query,
      anonymous: { $ne: true }
    });

    // Calculate success rate (completed transactions)
    const successRate = total > 0 ? Math.round(((total - 2) / total) * 100) : 0; // Assuming 2 pending

    const stats = {
      totalDonations: total, // Total number of donation transactions
      totalAmount: totalAmount[0]?.total || 0,
      totalTrees: totalTrees[0]?.total || 0,
      uniqueDonors: uniqueDonors.length, // Number of unique donors
      successRate: `${successRate}%`,
      pendingCount: 2 // Placeholder - should be calculated from status field when added
    };

    return NextResponse.json({
      donations: donations.map(donation => ({
        id: donation._id,
        donor: donation.anonymous ? 'Anonymous' : donation.donorName,
        email: donation.anonymous ? 'anonymous@example.com' : '', // Placeholder
        amount: donation.amount,
        trees: donation.trees,
        date: donation.date || donation.createdAt,
        status: 'completed', // Placeholder since model doesn't have status
        method: 'Online', // Placeholder
        ref: `DON-${donation._id.toString().slice(-6).toUpperCase()}`,
        type: donation.type,
        city: donation.city,
        anonymous: donation.anonymous
      })),
      stats,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });

  } catch (error) {
    console.error('Admin donations API error:', error);
    return NextResponse.json(
      { message: "Failed to fetch donations", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const donation = await Donation.create(body);

    return NextResponse.json({ success: true, data: donation });

  } catch (error) {
    console.error('Admin donations POST error:', error);
    return NextResponse.json(
      { message: "Failed to create donation", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { id, ...updateData } = body;

    const donation = await Donation.findByIdAndUpdate(id, updateData, { new: true });

    if (!donation) {
      return NextResponse.json(
        { message: "Donation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: donation });

  } catch (error) {
    console.error('Admin donations PUT error:', error);
    return NextResponse.json(
      { message: "Failed to update donation", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const donation = await Donation.findByIdAndDelete(id);

    if (!donation) {
      return NextResponse.json(
        { message: "Donation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Admin donations DELETE error:', error);
    return NextResponse.json(
      { message: "Failed to delete donation", error: error.message },
      { status: 500 }
    );
  }
}
