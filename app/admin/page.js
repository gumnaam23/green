"use client";

import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Trees,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Calendar,
  Download,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/admin');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Error loading dashboard: {error}</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Trees',
      value: dashboardData?.stats?.totalTrees?.value || '0',
      change: dashboardData?.stats?.totalTrees?.change || '+0%',
      icon: Trees,
      color: 'green'
    },
    {
      title: 'Total Donations',
      value: dashboardData?.stats?.totalDonations?.value || 'PKR 0M',
      change: dashboardData?.stats?.totalDonations?.change || '+0%',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Active Volunteers',
      value: dashboardData?.stats?.activeVolunteers?.value || '0',
      change: dashboardData?.stats?.activeVolunteers?.change || '+0%',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Plantation Sites',
      value: dashboardData?.stats?.plantationSites?.value || '0',
      change: dashboardData?.stats?.plantationSites?.change || '+0',
      icon: MapPin,
      color: 'orange'
    },
  ];

  const recentActivity = dashboardData?.recentActivity || [];
  const pendingTasks = dashboardData?.pendingTasks || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color === 'green' ? 'bg-green-100' : stat.color === 'blue' ? 'bg-blue-100' : stat.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'}`}>
                <stat.icon className={`h-6 w-6 ${stat.color === 'green' ? 'text-green-600' : stat.color === 'blue' ? 'text-blue-600' : stat.color === 'purple' ? 'text-purple-600' : 'text-orange-600'}`} />
              </div>
              <div className={`flex items-center ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change.startsWith('+') ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-gray-600">{stat.title}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                <Link href="/admin/activity" className="text-green-600 hover:text-green-700 text-sm">
                  View All
                </Link>
              </div>
            </div>
            <div className="divide-y">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${activity.status === 'success' ? 'bg-green-100 text-green-600' : activity.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                        {activity.status === 'success' ? <CheckCircle className="h-4 w-4" /> : activity.status === 'pending' ? <Clock className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{activity.action}</div>
                        <div className="text-sm text-gray-500">by {activity.user} • {activity.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      {activity.amount && <div className="font-medium text-gray-900">{activity.amount}</div>}
                      {activity.trees && <div className="text-sm text-gray-500">{activity.trees} trees</div>}
                      {activity.location && <div className="text-sm text-gray-500">{activity.location}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Statistics</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{dashboardData?.quickStats?.treeSurvivalRate || 0}%</div>
                <div className="text-gray-600">Tree Survival Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{dashboardData?.quickStats?.pendingTasksCount || 0}</div>
                <div className="text-gray-600">Pending Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{dashboardData?.quickStats?.completedProjects || 0}</div>
                <div className="text-gray-600">Completed Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{(dashboardData?.quickStats?.totalVolunteers || 0).toLocaleString()}</div>
                <div className="text-gray-600">Total Volunteers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Pending Tasks */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Pending Tasks</h2>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{pendingTasks.length}</span>
              </div>
            </div>
            <div className="divide-y">
              {pendingTasks.map((task) => (
                <div key={task.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{task.task}</div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Due: {task.due}</span>
                    <button className="text-green-600 hover:text-green-700">Take Action</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <Link href="/admin/tasks" className="text-green-600 hover:text-green-700 font-medium w-full text-center block">
                View All Tasks
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/admin/trees/add" className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg text-center">
                Add New Trees
              </Link>
              <Link href="/admin/donations" className="block w-full border border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 px-4 rounded-lg text-center">
                View Donations
              </Link>
              <Link href="/admin/reports" className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg text-center">
                Generate Report
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">System Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Database</span>
                  <span className="text-green-600 font-medium">Online</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Storage</span>
                  <span className="text-green-600 font-medium">2.5 GB / 10 GB</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Uptime</span>
                  <span className="text-green-600 font-medium">99.9%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
