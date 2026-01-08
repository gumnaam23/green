"use client";

import {
  PieChart,
  DollarSign,
  Edit,
  Save,
  X,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Settings,
  Target,
  Users,
  Building,
  TrendingUp,
  FileText
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ManageAllocationsPage() {
  const [allocations, setAllocations] = useState({
    plantation: 65,
    community: 15,
    admin: 10,
    fundraising: 5,
    research: 5
  });

  const [editing, setEditing] = useState(null);
  const [tempAllocations, setTempAllocations] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [totalFunds, setTotalFunds] = useState(452750000); // From financial data

  const allocationCategories = [
    {
      key: 'plantation',
      label: 'Tree Plantation & Reforestation',
      description: 'Direct funding for planting trees, maintenance, and reforestation projects',
      icon: Target,
      color: 'bg-green-500',
      min: 50,
      recommended: 65
    },
    {
      key: 'community',
      label: 'Community Development',
      description: 'Education, training, and community engagement programs',
      icon: Users,
      color: 'bg-blue-500',
      min: 5,
      recommended: 15
    },
    {
      key: 'admin',
      label: 'Administration & Operations',
      description: 'Staff salaries, office expenses, and operational costs',
      icon: Building,
      color: 'bg-yellow-500',
      min: 5,
      recommended: 10
    },
    {
      key: 'fundraising',
      label: 'Fundraising & Marketing',
      description: 'Marketing campaigns, donor acquisition, and fundraising activities',
      icon: TrendingUp,
      color: 'bg-purple-500',
      min: 2,
      recommended: 5
    },
    {
      key: 'research',
      label: 'Research & Development',
      description: 'Environmental research, impact studies, and technological development',
      icon: FileText,
      color: 'bg-gray-500',
      min: 2,
      recommended: 5
    }
  ];

  useEffect(() => {
    loadAllocations();
  }, []);

  const loadAllocations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/financials?type=allocations');
      if (!response.ok) {
        throw new Error('Failed to load allocations');
      }
      const data = await response.json();
      if (data.allocations) {
        setAllocations(data.allocations);
      }
      if (data.totalFunds) {
        setTotalFunds(data.totalFunds);
      }
    } catch (err) {
      console.error('Error loading allocations:', err);
      // Keep default allocations if API fails
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (key) => {
    setEditing(key);
    setTempAllocations({ ...allocations });
  };

  const cancelEditing = () => {
    setEditing(null);
    setTempAllocations({});
    setError(null);
  };

  const saveAllocations = async () => {
    try {
      setSaving(true);
      setError(null);

      // Validate total equals 100%
      const total = Object.values(tempAllocations).reduce((sum, val) => sum + val, 0);
      if (total !== 100) {
        throw new Error(`Total allocation must equal 100%. Current total: ${total}%`);
      }

      // Validate minimums
      for (const category of allocationCategories) {
        if (tempAllocations[category.key] < category.min) {
          throw new Error(`${category.label} cannot be less than ${category.min}%`);
        }
      }

      const response = await fetch('/api/admin/financials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'allocations',
          allocations: tempAllocations
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save allocations');
      }

      setAllocations(tempAllocations);
      setEditing(null);
      setTempAllocations({});
      setSuccess('Fund allocations updated successfully!');

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateAllocation = (key, value) => {
    const newValue = Math.max(0, Math.min(100, parseInt(value) || 0));
    setTempAllocations(prev => ({
      ...prev,
      [key]: newValue
    }));
  };

  const resetToRecommended = () => {
    const recommended = {};
    allocationCategories.forEach(cat => {
      recommended[cat.key] = cat.recommended;
    });
    setTempAllocations(recommended);
  };

  const getCurrentTotal = () => {
    return Object.values(editing ? tempAllocations : allocations).reduce((sum, val) => sum + val, 0);
  };

  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `PKR ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `PKR ${(amount / 1000).toFixed(1)}K`;
    }
    return `PKR ${amount}`;
  };

  const getAllocatedAmount = (percentage) => {
    return Math.round((percentage / 100) * totalFunds);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link
            href="/admin/financials"
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Fund Allocations</h1>
            <p className="text-gray-600">Configure how funds are distributed across different programs</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={loadAllocations}
            disabled={loading}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <h3 className="font-bold text-gray-900">Allocations Updated!</h3>
              <p className="text-gray-600 mt-1">{success}</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-4" />
            <div>
              <h3 className="font-bold text-gray-900">Error</h3>
              <p className="text-gray-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {formatCurrency(totalFunds)}
          </div>
          <div className="text-gray-600">Total Funds Available</div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <PieChart className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {getCurrentTotal()}%
          </div>
          <div className="text-gray-600">
            {editing ? 'Current Allocation Total' : 'Allocated Percentage'}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {100 - getCurrentTotal()}%
          </div>
          <div className="text-gray-600">
            {editing ? 'Remaining to Allocate' : 'Unallocated'}
          </div>
        </div>
      </div>

      {/* Allocation Controls */}
      <div className="bg-white rounded-xl shadow mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Fund Allocation Settings</h2>
            <div className="flex items-center space-x-3">
              {editing ? (
                <>
                  <button
                    onClick={resetToRecommended}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Reset to Recommended
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={saveAllocations}
                    disabled={saving || getCurrentTotal() !== 100}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => startEditing('all')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Allocations
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {allocationCategories.map((category) => {
              const Icon = category.icon;
              const currentValue = editing ? tempAllocations[category.key] : allocations[category.key];
              const allocatedAmount = getAllocatedAmount(currentValue);

              return (
                <div key={category.key} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start">
                      <div className={`p-3 rounded-lg mr-4 ${category.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{category.label}</h3>
                        <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="text-gray-500">Min: {category.min}%</span>
                          <span className="mx-3 text-gray-300">•</span>
                          <span className="text-green-600">Recommended: {category.recommended}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {currentValue}%
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatCurrency(allocatedAmount)}
                      </div>
                    </div>
                  </div>

                  {editing && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Percentage Allocation
                      </label>
                      <input
                        type="number"
                        value={tempAllocations[category.key] || 0}
                        onChange={(e) => updateAllocation(category.key, e.target.value)}
                        min={category.min}
                        max="100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${category.color}`}
                          style={{ width: `${(tempAllocations[category.key] || 0)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {!editing && (
                    <div className="mt-4">
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${category.color}`}
                          style={{ width: `${currentValue}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Allocation Impact Preview */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Allocation Impact Preview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Current vs Recommended</h3>
            <div className="space-y-3">
              {allocationCategories.map((category) => {
                const current = editing ? tempAllocations[category.key] : allocations[category.key];
                const recommended = category.recommended;
                const difference = current - recommended;

                return (
                  <div key={category.key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{category.label}</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">{current}%</span>
                      {difference !== 0 && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          difference > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {difference > 0 ? '+' : ''}{difference}%
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Key Insights</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <Target className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                <span>Plantation allocation directly impacts tree planting capacity</span>
              </div>
              <div className="flex items-start">
                <Users className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                <span>Community programs build long-term environmental awareness</span>
              </div>
              <div className="flex items-start">
                <TrendingUp className="h-4 w-4 text-purple-600 mr-2 mt-0.5" />
                <span>Balanced allocations ensure sustainable growth</span>
              </div>
              <div className="flex items-start">
                <Settings className="h-4 w-4 text-gray-600 mr-2 mt-0.5" />
                <span>Regular reviews help optimize fund utilization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
