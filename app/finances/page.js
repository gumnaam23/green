"use client";

import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    Download,
    Filter,
    Calendar,
    Users,
    Building,
    CreditCard,
    PieChart,
    BarChart3,
    Eye,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FinancesOverviewPage() {
    const [timeRange, setTimeRange] = useState('month');
    const [viewType, setViewType] = useState('overview');



    const financialData = {
        summary: {
            totalFunds: 452750000,
            totalDonations: 24500,
            avgDonation: 18480,
            fundsThisMonth: 12450000,
            fundsThisYear: 98560000,
            growthRate: 12.5,
            pendingAmount: 2500000,
            allocatedAmount: 450250000
        },
        monthlyTrend: [
            { month: 'Jan', amount: 38500000, donations: 2100, growth: 8.2 },
            { month: 'Feb', amount: 41200000, donations: 2250, growth: 7.0 },
            { month: 'Mar', amount: 39500000, donations: 1980, growth: -4.1 },
            { month: 'Apr', amount: 42800000, donations: 2320, growth: 8.4 },
            { month: 'May', amount: 44500000, donations: 2450, growth: 4.0 },
            { month: 'Jun', amount: 46500000, donations: 2580, growth: 4.5 },
            { month: 'Jul', amount: 48200000, donations: 2650, growth: 3.7 },
            { month: 'Aug', amount: 49500000, donations: 2720, growth: 2.7 },
            { month: 'Sep', amount: 51200000, donations: 2850, growth: 3.4 },
            { month: 'Oct', amount: 52800000, donations: 2920, growth: 3.1 },
            { month: 'Nov', amount: 54500000, donations: 3020, growth: 3.2 },
            { month: 'Dec', amount: 56200000, donations: 3150, growth: 3.1 },
        ],
        donationSources: [
            { source: 'Individual', amount: 226375000, percentage: 50, color: 'bg-green-500' },
            { source: 'Corporate', amount: 158462500, percentage: 35, color: 'bg-blue-500' },
            { source: 'Government', amount: 45275000, percentage: 10, color: 'bg-purple-500' },
            { source: 'International', amount: 22637500, percentage: 5, color: 'bg-yellow-500' },
        ],
        recentTransactions: [
            { id: 1, donor: 'Tech Solutions Ltd.', amount: 1000000, type: 'corporate', date: '2024-01-15', status: 'completed' },
            { id: 2, donor: 'Ahmed Raza', amount: 50000, type: 'individual', date: '2024-01-14', status: 'completed' },
            { id: 3, donor: 'EcoBank Pakistan', amount: 500000, type: 'corporate', date: '2024-01-14', status: 'completed' },
            { id: 4, donor: 'Ministry of Climate', amount: 2500000, type: 'government', date: '2024-01-13', status: 'pending' },
            { id: 5, donor: 'Fatima Khan', amount: 10000, type: 'individual', date: '2024-01-13', status: 'completed' },
            { id: 6, donor: 'UN Environment', amount: 1000000, type: 'international', date: '2024-01-12', status: 'completed' },
        ],
        allocation: {
            plantation: 294287500,
            community: 67812500,
            admin: 45275000,
            fundraising: 22637500,
            research: 22637500
        }
    };

    const formatCurrency = (amount) => {
        if (amount >= 1000000) {
            return `PKR ${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `PKR ${(amount / 1000).toFixed(1)}K`;
        }
        return `PKR ${amount}`;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'individual': return 'text-green-600';
            case 'corporate': return 'text-blue-600';
            case 'government': return 'text-purple-600';
            case 'international': return 'text-yellow-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Finances Overview</h1>
                            <p className="text-sm text-gray-600">Track donations, expenses, and financial reports</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                                <Calendar className="h-5 w-5 mr-2" />
                                {timeRange === 'month' ? 'This Month' :
                                    timeRange === 'quarter' ? 'This Quarter' : 'This Year'}
                            </button>
                            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                <Download className="h-5 w-5 mr-2" />
                                Export Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <DollarSign className="h-8 w-8 text-green-600" />
                            </div>
                            <span className="flex items-center text-sm font-medium text-green-600">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                {financialData.summary.growthRate}%
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                            {formatCurrency(financialData.summary.totalFunds)}
                        </div>
                        <div className="text-gray-600">Total Funds Received</div>
                        <div className="mt-4 text-sm text-gray-500">
                            <span className="font-medium">{financialData.summary.totalDonations.toLocaleString()}</span> donations
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Calendar className="h-8 w-8 text-blue-600" />
                            </div>
                            <span className="flex items-center text-sm font-medium text-green-600">
                                <ArrowUpRight className="h-4 w-4 mr-1" />
                                This month
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                            {formatCurrency(financialData.summary.fundsThisMonth)}
                        </div>
                        <div className="text-gray-600">Funds This Month</div>
                        <div className="mt-4 text-sm text-gray-500">
                            Avg: {formatCurrency(financialData.summary.avgDonation)} per donation
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <Users className="h-8 w-8 text-purple-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">Individuals</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                            {formatCurrency(financialData.donationSources[0].amount)}
                        </div>
                        <div className="text-gray-600">Individual Donations</div>
                        <div className="mt-4">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${financialData.donationSources[0].percentage}%` }}
                                ></div>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">{financialData.donationSources[0].percentage}% of total</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-yellow-100 p-3 rounded-lg">
                                <Building className="h-8 w-8 text-yellow-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">Corporate</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                            {formatCurrency(financialData.donationSources[1].amount)}
                        </div>
                        <div className="text-gray-600">Corporate Donations</div>
                        <div className="mt-4">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${financialData.donationSources[1].percentage}%` }}
                                ></div>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">{financialData.donationSources[1].percentage}% of total</div>
                        </div>
                    </div>
                </div>

                {/* Charts and Details */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Monthly Trend */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Monthly Trend</h2>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setTimeRange('month')}
                                        className={`px-3 py-1 rounded-lg text-sm ${timeRange === 'month' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        Month
                                    </button>
                                    <button
                                        onClick={() => setTimeRange('quarter')}
                                        className={`px-3 py-1 rounded-lg text-sm ${timeRange === 'quarter' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        Quarter
                                    </button>
                                    <button
                                        onClick={() => setTimeRange('year')}
                                        className={`px-3 py-1 rounded-lg text-sm ${timeRange === 'year' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        Year
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donations</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {financialData.monthlyTrend.map((month) => (
                                            <tr key={month.month} className="hover:bg-gray-50">
                                                <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">{month.month}</td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="text-gray-900 font-medium">{formatCurrency(month.amount)}</div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="text-gray-900">{month.donations.toLocaleString()}</div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className={`flex items-center ${month.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {month.growth >= 0 ? (
                                                            <TrendingUp className="h-4 w-4 mr-1" />
                                                        ) : (
                                                            <TrendingDown className="h-4 w-4 mr-1" />
                                                        )}
                                                        {Math.abs(month.growth)}%
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Allocation Breakdown */}
                    <div>
                        <div className="bg-white rounded-xl shadow p-6 mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Fund Allocation</h2>

                            <div className="space-y-4">
                                {Object.entries(financialData.allocation).map(([category, amount]) => {
                                    const percentage = (amount / financialData.summary.totalFunds * 100).toFixed(1);
                                    let color = 'bg-green-500';
                                    if (category === 'community') color = 'bg-blue-500';
                                    if (category === 'admin') color = 'bg-yellow-500';
                                    if (category === 'fundraising') color = 'bg-purple-500';
                                    if (category === 'research') color = 'bg-gray-500';

                                    return (
                                        <div key={category}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-medium text-gray-900 capitalize">{category}</span>
                                                <span className="text-gray-600">{formatCurrency(amount)} ({percentage}%)</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${color}`}
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Total Allocated</div>
                                        <div className="text-lg font-bold text-gray-900">{formatCurrency(financialData.summary.allocatedAmount)}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600">Pending</div>
                                        <div className="text-lg font-bold text-gray-900">{formatCurrency(financialData.summary.pendingAmount)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-600">Avg. Donation</div>
                                    <div className="font-medium">{formatCurrency(financialData.summary.avgDonation)}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-600">Total Donations</div>
                                    <div className="font-medium">{financialData.summary.totalDonations.toLocaleString()}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-600">This Year</div>
                                    <div className="font-medium">{formatCurrency(financialData.summary.fundsThisYear)}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-600">Growth Rate</div>
                                    <div className="font-medium text-green-600">{financialData.summary.growthRate}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="mt-8 bg-white rounded-xl shadow">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
                            <button className="flex items-center text-green-600 hover:text-green-700">
                                <Eye className="h-5 w-5 mr-2" />
                                View All
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {financialData.recentTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{transaction.donor}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(transaction.type)}`}>
                                                {transaction.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-bold text-gray-900">{formatCurrency(transaction.amount)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {new Date(transaction.date).toLocaleDateString('en-PK')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                                {transaction.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}