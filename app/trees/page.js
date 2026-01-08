"use client";

import { 
  Trees, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Users, 
  DollarSign, 
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Filter,
  Search,
  Download,
  Share2,
  Eye,
  Leaf,
  CloudRain,
  Wind,
  ThermometerSun,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TreesOverviewPage() {
  const [timeFilter, setTimeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [expandedSection, setExpandedSection] = useState('summary');




  // Comprehensive dummy data
  const treeData = {
    summary: {
      totalTrees: 1_254_803,
      targetTrees: 10_000_000,
      plantedThisMonth: 45_672,
      plantedThisYear: 548_912,
      survivalRate: 87.5,
      pendingPlantations: 42,
      completedProjects: 156,
      activeLocations: 78,
      estimatedCO2: 62_740_150, // kg
      waterSaved: 125_480_300, // liters
    },
    financials: {
      totalFunds: 452_750_000,
      fundsThisMonth: 12_450_000,
      fundsThisYear: 98_560_000,
      costPerTree: 500,
      allocation: {
        plantation: 65,
        maintenance: 20,
        community: 10,
        admin: 5
      }
    },
    recentActivity: [
      { id: 1, location: "Margalla Hills, Islamabad", trees: 1500, date: "2024-01-15", status: "completed", volunteers: 120 },
      { id: 2, location: "Karachi Coastal Area", trees: 800, date: "2024-01-14", status: "completed", volunteers: 80 },
      { id: 3, location: "Lahore Urban Parks", trees: 2000, date: "2024-01-13", status: "in-progress", volunteers: 150 },
      { id: 4, location: "Swat Valley", trees: 3000, date: "2024-01-12", status: "planned", volunteers: 0 },
      { id: 5, location: "Changa Manga Forest", trees: 1200, date: "2024-01-11", status: "completed", volunteers: 95 },
    ],
    speciesDistribution: [
      { name: "Neem", count: 250_000, percentage: 20, benefits: ["Air purification", "Medicinal"] },
      { name: "Kikar", count: 180_000, percentage: 14, benefits: ["Drought resistant", "Soil improvement"] },
      { name: "Sheesham", count: 150_000, percentage: 12, benefits: ["Timber quality", "Nitrogen fixation"] },
      { name: "Deodar", count: 120_000, percentage: 10, benefits: ["High altitude", "Carbon sequestration"] },
      { name: "Mango", count: 80_000, percentage: 6, benefits: ["Fruit production", "Livelihood"] },
      { name: "Others", count: 474_803, percentage: 38, benefits: ["Diverse ecosystem"] },
    ],
    provincialBreakdown: [
      { province: "Punjab", trees: 520_000, percentage: 41, projects: 32, color: "bg-green-500" },
      { province: "Sindh", trees: 130_000, percentage: 10, projects: 18, color: "bg-blue-500" },
      { province: "KPK", trees: 180_000, percentage: 14, projects: 15, color: "bg-emerald-500" },
      { province: "Balochistan", trees: 65_000, percentage: 5, projects: 8, color: "bg-teal-500" },
      { province: "Islamabad", trees: 359_803, percentage: 29, projects: 5, color: "bg-purple-500" },
    ],
    monthlyTrend: [
      { month: "Jan 2023", trees: 35_000, funds: 15_000_000 },
      { month: "Feb 2023", trees: 28_000, funds: 12_000_000 },
      { month: "Mar 2023", trees: 42_000, funds: 18_000_000 },
      { month: "Apr 2023", trees: 38_000, funds: 16_000_000 },
      { month: "May 2023", trees: 25_000, funds: 10_000_000 },
      { month: "Jun 2023", trees: 30_000, funds: 13_000_000 },
      { month: "Jul 2023", trees: 45_000, funds: 20_000_000 },
      { month: "Aug 2023", trees: 50_000, funds: 22_000_000 },
      { month: "Sep 2023", trees: 48_000, funds: 21_000_000 },
      { month: "Oct 2023", trees: 52_000, funds: 23_000_000 },
      { month: "Nov 2023", trees: 55_000, funds: 24_000_000 },
      { month: "Dec 2023", trees: 60_000, funds: 26_000_000 },
    ]
  };

  // Environmental Impact Calculations
  const environmentalImpact = {
    co2Absorbed: treeData.summary.totalTrees * 20, // kg per year per tree
    oxygenProduced: treeData.summary.totalTrees * 118, // kg per year per tree
    waterFiltered: treeData.summary.totalTrees * 100, // liters per year per tree
    airPollutionReduced: treeData.summary.totalTrees * 1.5, // kg per year per tree
    soilErosionPrevented: treeData.summary.totalTrees * 95, // square meters per tree
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Trees Dashboard</h1>
              <p className="text-green-100 max-w-3xl">
                Comprehensive overview of all tree plantation activities across Pakistan. Track progress, 
                monitor environmental impact, and explore detailed statistics.
              </p>
            </div>
            <div className="mt-6 lg:mt-0 flex space-x-4">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Export Data
              </button>
              <Link 
                href="/donate" 
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-3 rounded-lg flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Fund More Trees
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search locations, projects..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Filter className="h-5 w-5 mr-2" />
                More Filters
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              
              <select 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="all">All Locations</option>
                <option value="punjab">Punjab</option>
                <option value="sindh">Sindh</option>
                <option value="kpk">KPK</option>
                <option value="balochistan">Balochistan</option>
                <option value="islamabad">Islamabad</option>
              </select>
              
              <button className="flex items-center text-green-700 hover:text-green-800">
                <Share2 className="h-5 w-5 mr-2" />
                Share Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Trees className="h-8 w-8 text-green-600" />
              </div>
              <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
                +12.5% this month
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {treeData.summary.totalTrees.toLocaleString()}
            </div>
            <div className="text-gray-600">Total Trees Planted</div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Progress to 10M goal</span>
                <span>{((treeData.summary.totalTrees / treeData.summary.targetTrees) * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(treeData.summary.totalTrees / treeData.summary.targetTrees) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <span className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                PKR {treeData.financials.costPerTree}/tree
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              PKR {(treeData.financials.totalFunds / 1000000).toFixed(1)}M
            </div>
            <div className="text-gray-600">Total Funds Raised</div>
            <div className="mt-4 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>This month:</span>
                <span className="font-medium">PKR {(treeData.financials.fundsThisMonth / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <span className="text-sm font-medium bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                Excellent
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {treeData.summary.survivalRate}%
            </div>
            <div className="text-gray-600">Average Survival Rate</div>
            <div className="mt-4 text-sm text-gray-500">
              Based on 3-year monitoring of 500,000+ trees
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <span className="text-sm font-medium bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                Nationwide
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {treeData.summary.activeLocations}
            </div>
            <div className="text-gray-600">Active Plantation Sites</div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-500">
                <AlertCircle className="h-4 w-4 mr-2" />
                {treeData.summary.pendingPlantations} pending tasks
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Environmental Impact */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Environmental Impact</h2>
                <button 
                  onClick={() => setExpandedSection(expandedSection === 'impact' ? null : 'impact')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {expandedSection === 'impact' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CloudRain className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">
                    {(environmentalImpact.co2Absorbed / 1000).toFixed(0)} tons
                  </div>
                  <div className="text-sm text-gray-600">CO₂ Absorbed/year</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Wind className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">
                    {(environmentalImpact.oxygenProduced / 1000).toFixed(0)} tons
                  </div>
                  <div className="text-sm text-gray-600">Oxygen Produced/year</div>
                </div>
                
                <div className="text-center p-4 bg-cyan-50 rounded-lg">
                  <Leaf className="h-8 w-8 text-cyan-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">
                    {(environmentalImpact.waterFiltered / 1000000).toFixed(1)}M L
                  </div>
                  <div className="text-sm text-gray-600">Water Filtered/year</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <ThermometerSun className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">
                    {treeData.summary.totalTrees / 1000}k
                  </div>
                  <div className="text-sm text-gray-600">Cooling Effect</div>
                </div>
              </div>
              
              {expandedSection === 'impact' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-700 mb-2">Equivalent to:</div>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Removing {(environmentalImpact.co2Absorbed / 5000).toFixed(0)} cars from roads
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Powering {(environmentalImpact.co2Absorbed / 10000).toFixed(0)} homes for a year
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700 mb-2">Biodiversity Impact:</div>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Supports 250+ bird species
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Protects 50+ endangered species
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Plantation Activity</h2>
                <Link href="/trees/planted" className="text-green-700 hover:text-green-800 font-medium flex items-center">
                  View All
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {treeData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg mr-4 ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                        activity.status === 'in-progress' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {activity.status === 'completed' ? <CheckCircle className="h-6 w-6" /> :
                         activity.status === 'in-progress' ? <Clock className="h-6 w-6" /> :
                         <Calendar className="h-6 w-6" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{activity.location}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(activity.date).toLocaleDateString('en-PK', { 
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{activity.trees.toLocaleString()} trees</div>
                      <div className="text-sm text-gray-500">
                        <Users className="h-4 w-4 inline mr-1" />
                        {activity.volunteers} volunteers
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Species Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Species Distribution</h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <Eye className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {treeData.speciesDistribution.map((species) => (
                  <div key={species.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="font-medium text-gray-900">{species.name}</div>
                      <div className="text-gray-600">{species.count.toLocaleString()} trees ({species.percentage}%)</div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${species.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Benefits: {species.benefits.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Provincial Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Provincial Breakdown</h2>
              
              <div className="space-y-4">
                {treeData.provincialBreakdown.map((province) => (
                  <div key={province.province} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="font-medium text-gray-900">{province.province}</div>
                      <div className="text-gray-600">{province.trees.toLocaleString()} trees</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${province.color}`}
                          style={{ width: `${province.percentage}%` }}
                        ></div>
                      </div>
                      <span className="ml-3 text-sm font-medium">{province.percentage}%</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {province.projects} active projects
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link 
                  href="/trees/locations" 
                  className="flex items-center justify-center text-green-700 hover:text-green-800 font-medium"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  View All Locations on Map
                </Link>
              </div>
            </div>

            {/* Financial Allocation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Financial Allocation</h2>
              
              <div className="space-y-4">
                {Object.entries(treeData.financials.allocation).map(([category, percentage]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="font-medium text-gray-900 capitalize">{category}</div>
                      <div className="text-gray-600">{percentage}%</div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          category === 'plantation' ? 'bg-green-500' :
                          category === 'maintenance' ? 'bg-blue-500' :
                          category === 'community' ? 'bg-yellow-500' :
                          'bg-purple-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <div className="text-sm text-gray-600">Average cost per tree:</div>
                <div className="text-2xl font-bold text-gray-900">PKR {treeData.financials.costPerTree}</div>
                <div className="text-xs text-gray-500 mt-1">Includes 3-year maintenance</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              
              <div className="space-y-4">
                <Link 
                  href="/donate" 
                  className="block bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4 rounded-lg text-center font-medium transition-colors"
                >
                  Fund New Trees
                </Link>
                
                <Link 
                  href="/trees/pending" 
                  className="block bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4 rounded-lg text-center font-medium transition-colors"
                >
                  View Pending Tasks
                </Link>
                
                <Link 
                  href="/volunteers" 
                  className="block bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4 rounded-lg text-center font-medium transition-colors"
                >
                  Join Next Drive
                </Link>
                
                <Link 
                  href="/admin/trees/add" 
                  className="block bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4 rounded-lg text-center font-medium transition-colors"
                >
                  Report New Plantation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Monthly Planting Trends</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Last 12 months</span>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trees Planted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funds Raised</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Survival</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {treeData.monthlyTrend.map((month, index) => {
                  const growthRate = index > 0 ? 
                    ((month.trees - treeData.monthlyTrend[index-1].trees) / treeData.monthlyTrend[index-1].trees * 100).toFixed(1) : 
                    0;
                  
                  return (
                    <tr key={month.month} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{month.month}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${(month.trees / 60000) * 100}%` }}
                            ></div>
                          </div>
                          <span>{month.trees.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        PKR {(month.funds / 1000000).toFixed(1)}M
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          growthRate > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {growthRate > 0 ? '+' : ''}{growthRate}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">85-90%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-green-800 to-emerald-700 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Every tree you plant contributes to a greener Pakistan. Join our mission to plant 10 million trees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/donate" 
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-lg flex items-center justify-center"
            >
              <Trees className="h-5 w-5 mr-2" />
              Plant Trees Now
            </Link>
            <Link 
              href="/contact" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg border border-white/30"
            >
              Request Detailed Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}