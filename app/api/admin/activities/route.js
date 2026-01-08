import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import RecentActivity from "@/models/RecentActivity";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    let query = {};

    // Filter by status if provided
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter by type if provided
    if (type && type !== 'all') {
      query.type = type;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { action: { $regex: search, $options: 'i' } },
        { user: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const activities = await RecentActivity.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await RecentActivity.countDocuments(query);

    // Calculate statistics
    const stats = {
      totalActivities: total,
      successActivities: await RecentActivity.countDocuments({ ...query, status: 'success' }),
      pendingActivities: await RecentActivity.countDocuments({ ...query, status: 'pending' }),
      failedActivities: await RecentActivity.countDocuments({ ...query, status: 'failed' }),
      plantationActivities: await RecentActivity.countDocuments({ ...query, type: 'plantation' }),
      donationActivities: await RecentActivity.countDocuments({ ...query, type: 'donation' })
    };

    return NextResponse.json({
      activities: activities.map(activity => ({
        id: activity._id,
        action: activity.action,
        user: activity.user,
        amount: activity.amount,
        trees: activity.trees,
        location: activity.location,
        time: activity.timeAgo || formatTimeAgo(activity.createdAt),
        timeAgo: formatTimeAgo(activity.createdAt),
        status: activity.status,
        type: activity.type,
        details: activity.details || generateDetails(activity),
        createdAt: activity.createdAt,
        updatedAt: activity.updatedAt
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
    console.error('Admin activities API error:', error);
    return NextResponse.json(
      { message: "Failed to fetch activities", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const activity = await RecentActivity.create(body);

    return NextResponse.json({ success: true, data: activity });

  } catch (error) {
    console.error('Admin activities POST error:', error);
    return NextResponse.json(
      { message: "Failed to create activity", error: error.message },
      { status: 500 }
    );
  }
}

// Helper functions
function formatTimeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes} mins ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

function generateDetails(activity) {
  // Generate descriptive details based on activity type
  switch (activity.type) {
    case 'plantation':
      return activity.trees
        ? `Successfully planted ${activity.trees} trees`
        : 'Tree plantation activity completed';
    case 'donation':
      return activity.amount
        ? `Received donation of ${activity.amount}`
        : 'Donation processed successfully';
    case 'volunteer':
      return 'New volunteer registered for activities';
    case 'location':
      return 'New plantation location added to system';
    case 'maintenance':
      return activity.trees
        ? `Maintenance completed for ${activity.trees} trees`
        : 'Tree maintenance activity completed';
    case 'survey':
      return 'Environmental survey completed';
    case 'training':
      return 'Volunteer training session completed';
    case 'report':
      return 'System report generated';
    default:
      return activity.action || 'Activity completed';
  }
}
