// app/api/admin/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import Statistics from "@/models/Statistics";
import Donation from "@/models/Donation";
import Tree from "@/models/Tree";
import Volunteer from "@/models/Volunteer";
import Location from "@/models/Location";
import PendingTask from "@/models/PendingTask";
import RecentActivity from "@/models/RecentActivity";

export async function GET() {
  try {
    await connectDB();

    // Get overall statistics
    const stats = await Statistics.findOne().lean();

    // Calculate real-time stats
    const totalTrees = await Tree.countDocuments();
    const totalDonations = await Donation.countDocuments();
    const totalDonationAmount = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalVolunteers = await Volunteer.countDocuments();
    const totalLocations = await Location.countDocuments();

    // Get recent activity (last 5 items)
    const recentActivity = await RecentActivity.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Get pending tasks
    const pendingTasks = await PendingTask.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Calculate changes (comparing to previous month - simplified)
    const currentMonth = new Date();
    const previousMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);

    const currentMonthTrees = await Tree.countDocuments({
      createdAt: { $gte: currentMonth }
    });
    const previousMonthTrees = await Tree.countDocuments({
      createdAt: { $gte: previousMonth, $lt: currentMonth }
    });

    const currentMonthDonations = await Donation.countDocuments({
      date: { $gte: currentMonth }
    });
    const previousMonthDonations = await Donation.countDocuments({
      date: { $gte: previousMonth, $lt: currentMonth }
    });

    const currentMonthVolunteers = await Volunteer.countDocuments({
      createdAt: { $gte: currentMonth }
    });
    const previousMonthVolunteers = await Volunteer.countDocuments({
      createdAt: { $gte: previousMonth, $lt: currentMonth }
    });

    const treesChange = previousMonthTrees > 0
      ? ((currentMonthTrees - previousMonthTrees) / previousMonthTrees * 100).toFixed(1)
      : 0;
    const donationsChange = previousMonthDonations > 0
      ? ((currentMonthDonations - previousMonthDonations) / previousMonthDonations * 100).toFixed(1)
      : 0;
    const volunteersChange = previousMonthVolunteers > 0
      ? ((currentMonthVolunteers - previousMonthVolunteers) / previousMonthVolunteers * 100).toFixed(1)
      : 0;

    // Format the response data
    const dashboardData = {
      stats: {
        totalTrees: {
          value: totalTrees.toLocaleString(),
          change: `${treesChange >= 0 ? '+' : ''}${treesChange}%`,
          raw: totalTrees
        },
        totalDonations: {
          value: `PKR ${(totalDonationAmount[0]?.total || 0) / 1000000}M`,
          change: `${donationsChange >= 0 ? '+' : ''}${donationsChange}%`,
          raw: totalDonationAmount[0]?.total || 0
        },
        activeVolunteers: {
          value: totalVolunteers.toLocaleString(),
          change: `${volunteersChange >= 0 ? '+' : ''}${volunteersChange}%`,
          raw: totalVolunteers
        },
        plantationSites: {
          value: totalLocations.toString(),
          change: "+0", // Simplified
          raw: totalLocations
        }
      },
      recentActivity: recentActivity.map(activity => ({
        id: activity._id,
        action: activity.action,
        user: activity.user,
        amount: activity.amount,
        trees: activity.trees,
        location: activity.location,
        time: activity.timeAgo || formatTimeAgo(activity.createdAt),
        status: activity.status
      })),
      pendingTasks: pendingTasks.map(task => ({
        id: task._id,
        task: task.title,
        priority: task.priority,
        due: task.dueDate ? formatDueDate(task.dueDate) : 'No deadline'
      })),
      quickStats: {
        treeSurvivalRate: stats?.treeSurvivalRate || 87.5,
        pendingTasksCount: pendingTasks.length,
        completedProjects: stats?.completedProjects || 156,
        totalVolunteers: totalVolunteers
      }
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    console.error('Admin dashboard API error:', error);
    return NextResponse.json(
      { message: "Admin dashboard data fetch failed", error: error.message },
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
  return `${days} days ago`;
}

function formatDueDate(date) {
  const now = new Date();
  const dueDate = new Date(date);
  const diff = dueDate - now;
  const days = Math.ceil(diff / 86400000);

  if (days < 0) return 'Overdue';
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days <= 7) return `In ${days} days`;
  return dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
