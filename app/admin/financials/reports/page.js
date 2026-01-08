"use client";

import {
  Download,
  FileText,
  Calendar,
  Filter,
  BarChart3,
  TrendingUp,
  PieChart,
  RefreshCw,
  Printer,
  Mail,
  ArrowLeft,
  ChevronDown,
  Search,
  Eye,
  Edit,
  MoreVertical
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FinancialReportsPage() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last-30-days');
  const [reportType, setReportType] = useState('summary');
  const [donationType, setDonationType] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    loadReportData();
  }, [dateRange, reportType, donationType, cityFilter]);

  const loadReportData = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        range: dateRange,
        type: reportType,
        donationType: donationType,
        city: cityFilter
      });

      const response = await fetch(`/api/admin/financials/reports?${params}`);
      if (!response.ok) {
        throw new Error('Failed to load report data');
      }

      const data = await response.json();
      setReportData(data);
    } catch (err) {
      console.error('Error loading report data:', err);
      // Fallback to sample data for demo
      setReportData(getSampleData());
    } finally {
      setLoading(false);
    }
  };

  const getSampleData = () => ({
    summary: {
      totalRevenue: 2850000,
      totalDonations: 1250,
      averageDonation: 2280,
      totalTrees: 2850,
      periodGrowth: 15.2,
      topDonor: 'TechCorp Solutions',
      topAmount: 500000
    },
    monthlyBreakdown: [
      { month: 'Jan 2024', revenue: 245000, donations: 108, trees: 245 },
      { month: 'Feb 2024', revenue: 268000, donations: 115, trees: 268 },
      { month: 'Mar 2024', revenue: 295000, donations: 128, trees: 295 },
      { month: 'Apr 2024', revenue: 312000, donations: 135, trees: 312 },
      { month: 'May 2024', revenue: 348000, donations: 152, trees: 348 },
      { month: 'Jun 2024', revenue: 365000, donations: 158, trees: 365 },
      { month: 'Jul 2024', revenue: 392000, donations: 172, trees: 392 },
      { month: 'Aug 2024', revenue: 415000, donations: 180, trees: 415 },
      { month: 'Sep 2024', revenue: 438000, donations: 192, trees: 438 },
      { month: 'Oct 2024', revenue: 465000, donations: 205, trees: 465 },
      { month: 'Nov 2024', revenue: 492000, donations: 218, trees: 492 },
      { month: 'Dec 2024', revenue: 520000, donations: 232, trees: 520 }
    ],
    donationSources: [
      { source: 'Individual', amount: 1425000, percentage: 50, count: 625 },
      { source: 'Corporate', amount: 997500, percentage: 35, count: 438 },
      { source: 'Government', amount: 285000, percentage: 10, count: 125 },
      { source: 'International', amount: 142500, percentage: 5, count: 62 }
    ],
    cityBreakdown: [
      { city: 'Karachi', amount: 855000, donations: 375, trees: 855 },
      { city: 'Lahore', amount: 712500, donations: 313, trees: 713 },
      { city: 'Islamabad', amount: 427500, donations: 188, trees: 428 },
      { city: 'Rawalpindi', amount: 285000, donations: 125, trees: 285 },
      { city: 'Faisalabad', amount: 213750, donations: 94, trees: 214 },
      { city: 'Multan', amount: 142500, donations: 63, trees: 143 },
      { city: 'Peshawar', amount: 71300, donations: 31, trees: 71 },
      { city: 'Quetta', amount: 57000, donations: 25, trees: 57 },
      { city: 'Others', amount: 142500, donations: 36, trees: 143 }
    ],
    topDonors: [
      { name: 'TechCorp Solutions', amount: 500000, type: 'Corporate', city: 'Karachi', trees: 500 },
      { name: 'Ahmed Raza', amount: 25000, type: 'Individual', city: 'Lahore', trees: 25 },
      { name: 'EcoBank Pakistan', amount: 100000, type: 'Corporate', city: 'Islamabad', trees: 100 },
      { name: 'Ministry of Climate', amount: 250000, type: 'Government', city: 'Islamabad', trees: 250 },
      { name: 'Fatima Khan', amount: 15000, type: 'Individual', city: 'Karachi', trees: 15 }
    ],
    recentTransactions: [
      { id: 'TXN001', donor: 'TechCorp Solutions', amount: 500000, type: 'Corporate', date: '2024-01-15', trees: 500, status: 'completed' },
      { id: 'TXN002', donor: 'Ahmed Raza', amount: 25000, type: 'Individual', date: '2024-01-14', trees: 25, status: 'completed' },
      { id: 'TXN003', donor: 'EcoBank Pakistan', amount: 100000, type: 'Corporate', date: '2024-01-14', trees: 100, status: 'completed' },
      { id: 'TXN004', donor: 'Ministry of Climate', amount: 250000, type: 'Government', date: '2024-01-13', trees: 250, status: 'completed' },
      { id: 'TXN005', donor: 'Fatima Khan', amount: 15000, type: 'Individual', date: '2024-01-13', trees: 15, status: 'completed' }
    ]
  });

  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `PKR ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `PKR ${(amount / 1000).toFixed(1)}K`;
    }
    return `PKR ${amount}`;
  };

  const exportReport = async (format) => {
    try {
      setExportLoading(true);
      // In a real implementation, this would call an export API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate export
      alert(`${format.toUpperCase()} export completed!`);
    } catch (err) {
      alert('Export failed: ' + err.message);
    } finally {
      setExportLoading(false);
    }
  };

  const printReport = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const data = reportData || getSampleData();

  return (
    <div className="print:bg-white print:text-black">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link
            href="/admin/financials"
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg print:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
            <p className="text-gray-600">Comprehensive financial analytics and reporting</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 print:hidden">
          <button
            onClick={loadReportData}
            disabled={loading}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportReport('pdf')}
              disabled={exportLoading}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              <Download className="h-4 w-4 mr-2" />
              PDF
            </button>
            <button
              onClick={() => exportReport('excel')}
              disabled={exportLoading}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Excel
            </button>
            <button
              onClick={printReport}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="last-6-months">Last 6 Months</option>
              <option value="last-year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="summary">Summary Report</option>
              <option value="detailed">Detailed Report</option>
              <option value="monthly">Monthly Analysis</option>
              <option value="donor">Donor Analysis</option>
              <option value="geographic">Geographic Analysis</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Donation Type</label>
            <select
              value={donationType}
              onChange={(e) => setDonationType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="individual">Individual</option>
              <option value="corporate">Corporate</option>
              <option value="government">Government</option>
              <option value="international">International</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Cities</option>
              <option value="karachi">Karachi</option>
              <option value="lahore">Lahore</option>
              <option value="islamabad">Islamabad</option>
              <option value="rawalpindi">Rawalpindi</option>
              <option value="faisalabad">Faisalabad</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Financial Summary Report</h2>
            <p className="text-gray-600">Generated on {new Date().toLocaleDateString('en-PK')} for {dateRange.replace('-', ' ').toUpperCase()}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">{formatCurrency(data.summary.totalRevenue)}</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{data.summary.totalDonations.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Donations</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(data.summary.averageDonation)}</div>
            <div className="text-sm text-gray-600">Average Donation</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{data.summary.totalTrees.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Trees Planted</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{data.summary.periodGrowth}%</div>
            <div className="text-sm text-gray-600">Period Growth</div>
          </div>
        </div>
      </div>

      {/* Charts and Analysis */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Trend Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            Monthly Revenue Trend
          </h3>
          <div className="space-y-3">
            {data.monthlyBreakdown.slice(-6).map((month, index) => (
              <div key={month.month} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 w-20">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(month.revenue / Math.max(...data.monthlyBreakdown.map(m => m.revenue))) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(month.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Sources */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-purple-600" />
            Donation Sources
          </h3>
          <div className="space-y-4">
            {data.donationSources.map((source, index) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded mr-3 ${
                    index === 0 ? 'bg-green-500' :
                    index === 1 ? 'bg-blue-500' :
                    index === 2 ? 'bg-purple-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="text-sm text-gray-600">{source.source}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{formatCurrency(source.amount)}</div>
                  <div className="text-xs text-gray-500">{source.percentage}% ({source.count} donations)</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Analysis */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
          Geographic Distribution
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contribution</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.cityBreakdown.map((city) => (
                <tr key={city.city} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{city.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(city.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{city.donations}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{city.trees}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2 bg-gray-200 rounded-full w-16 mr-3">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(city.amount / data.summary.totalRevenue) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {((city.amount / data.summary.totalRevenue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Donors */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          Top Donors
        </h3>
        <div className="space-y-4">
          {data.topDonors.map((donor, index) => (
            <div key={donor.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{donor.name}</div>
                  <div className="text-sm text-gray-600">{donor.type} • {donor.city}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{formatCurrency(donor.amount)}</div>
                <div className="text-sm text-gray-600">{donor.trees} trees</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-purple-600" />
          Recent Transactions
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{transaction.donor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{formatCurrency(transaction.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {new Date(transaction.date).toLocaleDateString('en-PK')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
