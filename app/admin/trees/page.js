"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Trees, Plus, Edit, Clock, TrendingUp, Users, Target } from "lucide-react";

export default function TreesPage() {
  const [stats, setStats] = useState({
    totalTrees: 0,
    plantedTrees: 0,
    pendingTrees: 0,
    totalProjects: 0,
    averageSurvivalRate: 87.5
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/trees?page=1&limit=1');
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch tree stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trees Management</h1>
          <p className="text-gray-600">Manage tree plantation projects and records</p>
        </div>
        <Link
          href="/admin/trees/add"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Plantation
        </Link>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? '...' : stats.totalTrees.toLocaleString()}
              </div>
              <div className="text-gray-600">Total Trees</div>
            </div>
            <Trees className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? '...' : stats.plantedTrees.toLocaleString()}
              </div>
              <div className="text-gray-600">Trees Planted</div>
            </div>
            <Target className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? '...' : stats.totalProjects}
              </div>
              <div className="text-gray-600">Total Projects</div>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? '...' : `${stats.averageSurvivalRate}%`}
              </div>
              <div className="text-gray-600">Avg Survival Rate</div>
            </div>
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Management Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/trees/add"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-green-500"
        >
          <Plus className="h-8 w-8 text-green-600 mb-3" />
          <h2 className="font-semibold text-lg text-gray-900">Add Trees</h2>
          <p className="text-sm text-gray-500">Add new plantation entries to the system</p>
        </Link>

        <Link
          href="/admin/trees/update"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-blue-500"
        >
          <Edit className="h-8 w-8 text-blue-600 mb-3" />
          <h2 className="font-semibold text-lg text-gray-900">Update Trees</h2>
          <p className="text-sm text-gray-500">Update planted trees data and status</p>
        </Link>

        <Link
          href="/admin/trees/pending"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border-l-4 border-yellow-500"
        >
          <Clock className="h-8 w-8 text-yellow-600 mb-3" />
          <h2 className="font-semibold text-lg text-gray-900">Pending Tasks</h2>
          <p className="text-sm text-gray-500">Manage pending plantations and tasks</p>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg border p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="font-medium text-gray-900">Export Data</div>
            <div className="text-sm text-gray-500">Download plantation records</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="font-medium text-gray-900">Generate Report</div>
            <div className="text-sm text-gray-500">Create monthly plantation report</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="font-medium text-gray-900">View Analytics</div>
            <div className="text-sm text-gray-500">Detailed plantation analytics</div>
          </button>
        </div>
      </div>
    </div>
  );
}
