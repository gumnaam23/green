"use client";

import {
  Users,
  Clock,
  MapPin,
  Award,
  Trees,
  Target,
  TrendingUp,
  Calendar,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
  Star
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function VolunteerSummariesPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVolunteerSummary();
  }, []);

  const fetchVolunteerSummary = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/volunteers?type=summaries');
      if (!response.ok) throw new Error('Failed to fetch volunteer summary');

      const {data} = await response.json();
      setSummary(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchVolunteerSummary();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error: {error}</p>
        <button
          onClick={refreshData}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Default data if no summary exists
  const defaultSummary = {
    totalVolunteers: 0,
    activeVolunteers: 0,
    volunteerHours: 0,
    upcomingEvents: 0,
    citiesCovered: 0,
    trainingCompleted: 0,
    awardsGiven: 0,
    treesPlantedByVolunteers: 0
  };

  const data = summary || defaultSummary;

  const metrics = [
    {
      title: 'Total Volunteers',
      value: data.totalVolunteers?.toLocaleString() || '0',
      icon: Users,
      color: 'bg-blue-500',
      description: 'Registered volunteers'
    },
    {
      title: 'Active Volunteers',
      value: data.activeVolunteers?.toLocaleString() || '0',
      icon: Activity,
      color: 'bg-green-500',
      description: 'Currently engaged'
    },
    {
      title: 'Volunteer Hours',
      value: data.volunteerHours?.toLocaleString() || '0',
      icon: Clock,
      color: 'bg-purple-500',
      description: 'Total hours contributed'
    },
    {
      title: 'Cities Covered',
      value: data.citiesCovered?.toLocaleString() || '0',
      icon: MapPin,
      color: 'bg-orange-500',
      description: 'Geographic reach'
    },
    {
      title: 'Trees Planted',
      value: data.treesPlantedByVolunteers?.toLocaleString() || '0',
      icon: Trees,
      color: 'bg-green-600',
      description: 'By volunteer efforts'
    },
    {
      title: 'Training Completed',
      value: data.trainingCompleted?.toLocaleString() || '0',
      icon: Target,
      color: 'bg-indigo-500',
      description: 'Training sessions'
    },
    {
      title: 'Awards Given',
      value: data.awardsGiven?.toLocaleString() || '0',
      icon: Award,
      color: 'bg-yellow-500',
      description: 'Recognition awards'
    },
    {
      title: 'Upcoming Events',
      value: data.upcomingEvents?.toLocaleString() || '0',
      icon: Calendar,
      color: 'bg-red-500',
      description: 'Scheduled activities'
    }
  ];

  const impactStats = [
    {
      label: 'Average Hours per Volunteer',
      value: data.totalVolunteers > 0 ? Math.round(data.volunteerHours / data.totalVolunteers) : 0,
      unit: 'hours'
    },
    {
      label: 'Trees per Volunteer',
      value: data.totalVolunteers > 0 ? Math.round(data.treesPlantedByVolunteers / data.totalVolunteers) : 0,
      unit: 'trees'
    },
    {
      label: 'Active Volunteer Rate',
      value: data.totalVolunteers > 0 ? Math.round((data.activeVolunteers / data.totalVolunteers) * 100) : 0,
      unit: '%'
    },
    {
      label: 'Training Completion Rate',
      value: data.totalVolunteers > 0 ? Math.round((data.trainingCompleted / data.totalVolunteers) * 100) : 0,
      unit: '%'
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteer Program Summary</h1>
          <p className="text-gray-600">Comprehensive analytics and metrics for our volunteer program</p>
        </div>
        <button
          onClick={refreshData}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Impact Statistics */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
          Program Impact Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stat.value}
                <span className="text-lg text-gray-500 ml-1">{stat.unit}</span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Program Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Volunteer Distribution */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-blue-600" />
            Volunteer Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600">Active Volunteers</span>
              </div>
              <span className="font-semibold">{data.activeVolunteers || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-400 rounded mr-3"></div>
                <span className="text-sm text-gray-600">Inactive Volunteers</span>
              </div>
              <span className="font-semibold">{(data.totalVolunteers || 0) - (data.activeVolunteers || 0)}</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Active Rate</span>
              <span>
                {data.totalVolunteers > 0
                  ? Math.round((data.activeVolunteers / data.totalVolunteers) * 100)
                  : 0
                }%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${data.totalVolunteers > 0 ? (data.activeVolunteers / data.totalVolunteers) * 100 : 0}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Achievement Highlights */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-600" />
            Achievement Highlights
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Trees className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-sm font-medium">Trees Planted</span>
              </div>
              <span className="text-lg font-bold text-green-600">
                {data.treesPlantedByVolunteers?.toLocaleString() || 0}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium">Total Hours</span>
              </div>
              <span className="text-lg font-bold text-blue-600">
                {data.volunteerHours?.toLocaleString() || 0}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-sm font-medium">Awards Given</span>
              </div>
              <span className="text-lg font-bold text-purple-600">
                {data.awardsGiven?.toLocaleString() || 0}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-orange-600 mr-3" />
                <span className="text-sm font-medium">Cities Reached</span>
              </div>
              <span className="text-lg font-bold text-orange-600">
                {data.citiesCovered?.toLocaleString() || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Program Goals & Targets */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Program Goals & Progress</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {data.totalVolunteers || 0}
            </div>
            <p className="text-sm text-gray-600 mb-2">Current Volunteers</p>
            <div className="text-xs text-gray-500">Target: 500 volunteers</div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${Math.min(((data.totalVolunteers || 0) / 500) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {data.treesPlantedByVolunteers || 0}
            </div>
            <p className="text-sm text-gray-600 mb-2">Trees Planted</p>
            <div className="text-xs text-gray-500">Target: 10,000 trees</div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${Math.min(((data.treesPlantedByVolunteers || 0) / 10000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {data.citiesCovered || 0}
            </div>
            <p className="text-sm text-gray-600 mb-2">Cities Covered</p>
            <div className="text-xs text-gray-500">Target: 50 cities</div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${Math.min(((data.citiesCovered || 0) / 50) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            <strong>Next Milestone:</strong> Reach 1000 volunteers and plant 25,000 trees across 100 cities by 2025
          </p>
        </div>
      </div>
    </div>
  );
}
