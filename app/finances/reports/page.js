"use client";

import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Search,
  Printer,
  Share2,
  Eye,
  ChevronDown,
  PieChart,
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building,
  Globe,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FinancialReportsPage() {
  const [reportType, setReportType] = useState('monthly');
  const [year, setYear] = useState('2024');
  const [month, setMonth] = useState('01');
  const [selectedReport, setSelectedReport] = useState(null);


  const reportData = {
    years: ['2024', '2023', '2022', '2021', '2020'],
    months: [
      { id: '01', name: 'January' },
      { id: '02', name: 'February' },
      { id: '03', name: 'March' },
      { id: '04', name: 'April' },
      { id: '05', name: 'May' },
      { id: '06', name: 'June' },
      { id: '07', name: 'July' },
      { id: '08', name: 'August' },
      { id: '09', name: 'September' },
      { id: '10', name: 'October' },
      { id: '11', name: 'November' },
      { id: '12', name: 'December' }
    ],
    reports: {
      monthly: [
        {
          id: 1,
          title: 'January 2024 Financial Report',
          period: 'January 2024',
          date: '2024-02-05',
          type: 'monthly',
          size: '2.4 MB',
          downloads: 145,
          summary: {
            totalFunds: 38500000,
            totalDonations: 2100,
            avgDonation: 18333,
            expenses: 31250000,
            netBalance: 7250000,
            growth: 8.2
          }
        },
        {
          id: 2,
          title: 'December 2023 Financial Report',
          period: 'December 2023',
          date: '2024-01-05',
          type: 'monthly',
          size: '2.3 MB',
          downloads: 128,
          summary: {
            totalFunds: 35500000,
            totalDonations: 1950,
            avgDonation: 18205,
            expenses: 28800000,
            netBalance: 6700000,
            growth: 5.8
          }
        },
        {
          id: 3,
          title: 'November 2023 Financial Report',
          period: 'November 2023',
          date: '2023-12-05',
          type: 'monthly',
          size: '2.2 MB',
          downloads: 112,
          summary: {
            totalFunds: 33500000,
            totalDonations: 1850,
            avgDonation: 18108,
            expenses: 27200000,
            netBalance: 6300000,
            growth: 4.1
          }
        }
      ],
      quarterly: [
        {
          id: 4,
          title: 'Q4 2023 Financial Report',
          period: 'October - December 2023',
          date: '2024-01-15',
          type: 'quarterly',
          size: '5.8 MB',
          downloads: 98,
          summary: {
            totalFunds: 105500000,
            totalDonations: 5750,
            avgDonation: 18348,
            expenses: 85600000,
            netBalance: 19900000,
            growth: 12.5
          }
        },
        {
          id: 5,
          title: 'Q3 2023 Financial Report',
          period: 'July - September 2023',
          date: '2023-10-15',
          type: 'quarterly',
          size: '5.6 MB',
          downloads: 86,
          summary: {
            totalFunds: 94000000,
            totalDonations: 5150,
            avgDonation: 18252,
            expenses: 76300000,
            netBalance: 17700000,
            growth: 10.2
          }
        }
      ],
      annual: [
        {
          id: 6,
          title: 'Annual Report 2023',
          period: 'January - December 2023',
          date: '2024-01-31',
          type: 'annual',
          size: '12.5 MB',
          downloads: 245,
          summary: {
            totalFunds: 385000000,
            totalDonations: 21000,
            avgDonation: 18333,
            expenses: 312500000,
            netBalance: 72500000,
            growth: 15.8
          }
        },
        {
          id: 7,
          title: 'Annual Report 2022',
          period: 'January - December 2022',
          date: '2023-01-31',
          type: 'annual',
          size: '11.8 MB',
          downloads: 198,
          summary: {
            totalFunds: 332500000,
            totalDonations: 18200,
            avgDonation: 18269,
            expenses: 270000000,
            netBalance: 62500000,
            growth: 12.3
          }
        }
      ],
      audit: [
        {
          id: 8,
          title: 'Annual Audit Report 2023',
          period: 'Audit Period 2023',
          date: '2024-02-28',
          type: 'audit',
          size: '8.2 MB',
          downloads: 178,
          summary: {
            auditor: 'PricewaterhouseCoopers Pakistan',
            opinion: 'Unqualified',
            compliance: 'Fully Compliant',
            findings: 'No Material Weaknesses'
          }
        },
        {
          id: 9,
          title: 'Annual Audit Report 2022',
          period: 'Audit Period 2022',
          date: '2023-02-28',
          type: 'audit',
          size: '7.9 MB',
          downloads: 156,
          summary: {
            auditor: 'PricewaterhouseCoopers Pakistan',
            opinion: 'Unqualified',
            compliance: 'Fully Compliant',
            findings: 'Minor Observations'
          }
        }
      ]
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const filteredReports = reportData.reports[reportType].filter(report => {
    if (reportType === 'monthly' && month) {
      return report.period.includes(reportData.months.find(m => m.id === month)?.name);
    }
    if (year && !report.period.includes(year)) return false;
    return true;
  });

  const generateReport = () => {
    const newReport = {
      id: Date.now(),
      title: `${reportData.months.find(m => m.id === month)?.name} ${year} Financial Report`,
      period: `${reportData.months.find(m => m.id === month)?.name} ${year}`,
      date: new Date().toISOString().split('T')[0],
      type: 'monthly',
      size: '2.5 MB',
      downloads: 0,
      summary: {
        totalFunds: 38500000,
        totalDonations: 2100,
        avgDonation: 18333,
        expenses: 31250000,
        netBalance: 7250000,
        growth: 8.2
      }
    };
    
    alert(`Report "${newReport.title}" has been generated. It would now be available for download.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
              <p className="text-sm text-gray-600">Detailed financial reports and audit documents</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={generateReport}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <FileText className="h-5 w-5 mr-2" />
                Generate Report
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Printer className="h-5 w-5 mr-2" />
                Print All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Filter className="h-5 w-5 mr-2" />
                Advanced Filters
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Report Type:</span>
                <select 
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="monthly">Monthly Reports</option>
                  <option value="quarterly">Quarterly Reports</option>
                  <option value="annual">Annual Reports</option>
                  <option value="audit">Audit Reports</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Year:</span>
                <select 
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                >
                  {reportData.years.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              
              {reportType === 'monthly' && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Month:</span>
                  <select 
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                  >
                    {reportData.months.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Report Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white rounded-xl shadow border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      {report.type.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{report.size}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{report.period}</p>
                
                <div className="space-y-3 mb-6">
                  {report.type !== 'audit' ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Funds:</span>
                        <span className="font-medium">{formatCurrency(report.summary.totalFunds)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Donations:</span>
                        <span className="font-medium">{report.summary.totalDonations.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Growth:</span>
                        <span className={`font-medium ${report.summary.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {report.summary.growth >= 0 ? '+' : ''}{report.summary.growth}%
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Auditor:</span>
                        <span className="font-medium">{report.summary.auditor}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Opinion:</span>
                        <span className="font-medium text-green-600">{report.summary.opinion}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Published: {formatDate(report.date)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report Details */}
        {selectedReport && (
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{selectedReport.title}</h2>
              <button 
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Period:</span>
                    <span className="font-medium">{selectedReport.period}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Publication Date:</span>
                    <span className="font-medium">{formatDate(selectedReport.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>File Size:</span>
                    <span className="font-medium">{selectedReport.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Downloads:</span>
                    <span className="font-medium">{selectedReport.downloads}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Download className="h-5 w-5 mr-2" />
                    Download Report
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <Printer className="h-5 w-5 mr-2" />
                    Print Report
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Report Statistics</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {Object.values(reportData.reports).flat().length}
              </div>
              <div className="text-gray-600">Total Reports</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {Object.values(reportData.reports).flat().reduce((sum, report) => sum + report.downloads, 0).toLocaleString()}
              </div>
              <div className="text-gray-600">Total Downloads</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">2024</div>
              <div className="text-gray-600">Current Year</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">5</div>
              <div className="text-gray-600">Years of Data</div>
            </div>
          </div>
        </div>

        {/* Archive Notice */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow p-6">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-green-600 mr-4" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Report Archive</h3>
              <p className="text-gray-700">
                Reports are archived after 7 years as per regulatory requirements. 
                Older reports are available upon request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}