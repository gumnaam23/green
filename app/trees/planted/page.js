"use client";

import { 
  Trees, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Users, 
  Filter, 
  Search,
  Download,
  Eye,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Clock,
  BarChart3,
  Share2,
  Leaf,
  Cloud,
  Droplets,
  ThermometerSun,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function PlantedTreesPage() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedTree, setExpandedTree] = useState(null);
  const itemsPerPage = 10;




  // Comprehensive dummy data
  const plantedTreesData = {
    summary: {
      totalTrees: 1_254_803,
      totalProjects: 156,
      totalLocations: 78,
      totalVolunteers: 25_891,
      averageSurvival: 87.5,
      totalCO2: 62_740_150,
    },
    filters: {
      years: ['2024', '2023', '2022', '2021', '2020', '2019', '2018'],
      locations: [
        { id: 'all', name: 'All Locations' },
        { id: 'islamabad', name: 'Islamabad Capital Territory' },
        { id: 'punjab', name: 'Punjab Province' },
        { id: 'sindh', name: 'Sindh Province' },
        { id: 'kpk', name: 'Khyber Pakhtunkhwa' },
        { id: 'balochistan', name: 'Balochistan' },
        { id: 'ajk', name: 'Azad Kashmir' },
      ],
      species: [
        { id: 'all', name: 'All Species' },
        { id: 'neem', name: 'Neem' },
        { id: 'kikar', name: 'Kikar' },
        { id: 'sheesham', name: 'Sheesham' },
        { id: 'deodar', name: 'Deodar' },
        { id: 'mango', name: 'Mango' },
        { id: 'avicennia', name: 'Avicennia (Mangrove)' },
      ]
    },
    trees: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      projectCode: `GEP-${2024 - Math.floor(i/10)}-${(i % 10) + 100}`,
      location: [
        "Margalla Hills, Islamabad",
        "Changa Manga Forest, Punjab",
        "Karachi Coastal Area, Sindh",
        "Lahore Urban Parks, Punjab",
        "Swat Valley, KPK",
        "Thar Desert, Sindh",
        "Hunza Valley, Gilgit-Baltistan",
        "Quetta Green Belt, Balochistan",
        "Murree Hills, Punjab",
        "Sukkur Barrage, Sindh"
      ][i % 10],
      coordinates: `33.${6844 + i}° N, 73.${479 + i}° E`,
      species: ["Neem", "Kikar", "Sheesham", "Deodar", "Mango", "Avicennia"][i % 6],
      count: Math.floor(Math.random() * 5000) + 1000,
      plantingDate: `202${Math.floor(i/10)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      status: ["Thriving", "Healthy", "Growing", "Newly Planted"][i % 4],
      survivalRate: Math.floor(Math.random() * 20) + 80,
      volunteers: Math.floor(Math.random() * 500) + 50,
      projectLead: ["Dr. Ahmed Malik", "Ms. Sarah Khan", "Mr. Bilal Ahmed", "Dr. Fatima Raza"][i % 4],
      photos: Math.floor(Math.random() * 50) + 10,
      impact: {
        co2Absorbed: Math.floor(Math.random() * 50000) + 10000,
        oxygenProduced: Math.floor(Math.random() * 300000) + 50000,
        waterFiltered: Math.floor(Math.random() * 250000) + 50000,
        biodiversityIndex: Math.floor(Math.random() * 40) + 60,
      },
      maintenanceLogs: [
        { date: "2024-01-15", activity: "Watering", status: "Completed", notes: "Adequate rainfall received" },
        { date: "2024-01-10", activity: "Pest Control", status: "Completed", notes: "Minor pest infestation treated" },
        { date: "2024-01-05", activity: "Soil Testing", status: "Completed", notes: "Soil nutrients optimal" },
      ]
    }))
  };

  // Filter trees based on selected filters
  const filteredTrees = plantedTreesData.trees.filter(tree => {
    if (selectedYear !== 'all' && !tree.plantingDate.startsWith(selectedYear)) return false;
    if (selectedLocation !== 'all') {
      // Simple location filtering logic
      if (selectedLocation === 'islamabad' && !tree.location.includes('Islamabad')) return false;
      if (selectedLocation === 'punjab' && !tree.location.includes('Punjab')) return false;
      if (selectedLocation === 'sindh' && !tree.location.includes('Sindh')) return false;
      if (selectedLocation === 'kpk' && tree.location.includes('KPK')) return false;
    }
    if (selectedSpecies !== 'all' && tree.species.toLowerCase() !== selectedSpecies) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTrees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTrees = filteredTrees.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Planted Trees Database</h1>
              <p className="text-green-100 max-w-3xl">
                Detailed records of every tree planted through GreenEarth Pakistan. 
                Track growth, monitor impact, and verify plantation activities.
              </p>
            </div>
            <div className="mt-6 lg:mt-0 flex space-x-4">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Export CSV
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium flex items-center">
                <Share2 className="h-5 w-5 mr-2" />
                Share View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Total Trees Planted", value: plantedTreesData.summary.totalTrees.toLocaleString(), icon: Trees, color: "green" },
            { label: "Completed Projects", value: plantedTreesData.summary.totalProjects, icon: CheckCircle, color: "blue" },
            { label: "Plantation Locations", value: plantedTreesData.summary.totalLocations, icon: MapPin, color: "purple" },
            { label: "Volunteers Engaged", value: plantedTreesData.summary.totalVolunteers.toLocaleString(), icon: Users, color: "orange" },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg mr-4 ${
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by project code, location, or species..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center text-gray-600 hover:text-gray-900 whitespace-nowrap">
                <Filter className="h-5 w-5 mr-2" />
                Advanced Filters
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[120px]"
              >
                <option value="all">All Years</option>
                {plantedTreesData.filters.years.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
              
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[180px]"
              >
                {plantedTreesData.filters.locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
              
              <select 
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[150px]"
              >
                {plantedTreesData.filters.species.map(species => (
                  <option key={species.id} value={species.id}>{species.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Active Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedYear !== 'all' && (
              <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Year: {selectedYear}
                <button 
                  onClick={() => setSelectedYear('all')}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedLocation !== 'all' && (
              <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Location: {plantedTreesData.filters.locations.find(l => l.id === selectedLocation)?.name}
                <button 
                  onClick={() => setSelectedLocation('all')}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedSpecies !== 'all' && (
              <span className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                Species: {plantedTreesData.filters.species.find(s => s.id === selectedSpecies)?.name}
                <button 
                  onClick={() => setSelectedSpecies('all')}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-700">
            Showing <span className="font-bold">{filteredTrees.length.toLocaleString()}</span> plantation records
            {selectedYear !== 'all' && ` for ${selectedYear}`}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button className="text-green-700 hover:text-green-800 font-medium flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              View Analytics
            </button>
          </div>
        </div>

        {/* Trees Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Species</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Trees</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedTrees.map((tree, index) => (
                  <React.Fragment key={index}>
                    <tr  className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{tree.projectCode}</div>
                        <div className="text-sm text-gray-500">{tree.projectLead}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{tree.location}</div>
                        <div className="text-sm text-gray-500">{tree.coordinates}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {tree.species}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-gray-900">{tree.count.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">
                          <Users className="h-3 w-3 inline mr-1" />
                          {tree.volunteers} volunteers
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{formatDate(tree.plantingDate)}</div>
                        <div className="text-sm text-gray-500">{tree.photos} photos</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            tree.status === 'Thriving' ? 'bg-green-100 text-green-800' :
                            tree.status === 'Healthy' ? 'bg-blue-100 text-blue-800' :
                            tree.status === 'Growing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {tree.status}
                          </span>
                          <div className="ml-3 text-sm text-gray-500">
                            {tree.survivalRate}% survival
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setExpandedTree(expandedTree === tree.id ? null : tree.id)}
                          className="text-green-700 hover:text-green-800 font-medium flex items-center"
                        >
                          {expandedTree === tree.id ? (
                            <>
                              <ChevronUp className="h-5 w-5 mr-1" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <Eye className="h-5 w-5 mr-1" />
                              View Details
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expanded Row */}
                    {expandedTree === tree.id && (
                      <tr>
                        <td colSpan="7" className="px-6 py-6 bg-gray-50">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Environmental Impact */}
                            <div>
                              <h4 className="font-bold text-gray-900 mb-4">Environmental Impact</h4>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-50 rounded-lg p-4">
                                  <Cloud className="h-6 w-6 text-green-600 mb-2" />
                                  <div className="text-xl font-bold text-gray-900">
                                    {(tree.impact.co2Absorbed / 1000).toFixed(1)} tons
                                  </div>
                                  <div className="text-sm text-gray-600">CO₂ Absorbed/year</div>
                                </div>
                                <div className="bg-blue-50 rounded-lg p-4">
                                  <Leaf className="h-6 w-6 text-blue-600 mb-2" />
                                  <div className="text-xl font-bold text-gray-900">
                                    {(tree.impact.oxygenProduced / 1000).toFixed(1)} tons
                                  </div>
                                  <div className="text-sm text-gray-600">Oxygen Produced/year</div>
                                </div>
                                <div className="bg-cyan-50 rounded-lg p-4">
                                  <Droplets className="h-6 w-6 text-cyan-600 mb-2" />
                                  <div className="text-xl font-bold text-gray-900">
                                    {(tree.impact.waterFiltered / 1000).toFixed(0)}k L
                                  </div>
                                  <div className="text-sm text-gray-600">Water Filtered/year</div>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-4">
                                  <ThermometerSun className="h-6 w-6 text-purple-600 mb-2" />
                                  <div className="text-xl font-bold text-gray-900">
                                    {tree.impact.biodiversityIndex}%
                                  </div>
                                  <div className="text-sm text-gray-600">Biodiversity Index</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Maintenance Logs */}
                            <div>
                              <h4 className="font-bold text-gray-900 mb-4">Recent Maintenance</h4>
                              <div className="space-y-3">
                                {tree.maintenanceLogs.map((log, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                    <div>
                                      <div className="font-medium text-gray-900">{log.activity}</div>
                                      <div className="text-sm text-gray-500">{log.notes}</div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-sm text-gray-600">{formatDate(log.date)}</div>
                                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                        {log.status}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <Link 
                                  href={`/trees/locations?project=${tree.projectCode}`}
                                  className="text-green-700 hover:text-green-800 font-medium flex items-center"
                                >
                                  <MapPin className="h-5 w-5 mr-2" />
                                  View on Location Map
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-6">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredTrees.length)} of {filteredTrees.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium ${
                    currentPage === pageNum
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <select 
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
          </select>
        </div>

        {/* Map Preview */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Geographic Distribution</h2>
            <Link 
              href="/trees/locations" 
              className="text-green-700 hover:text-green-800 font-medium flex items-center"
            >
              <MapPin className="h-5 w-5 mr-2" />
              View Full Interactive Map
            </Link>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <div className="relative h-64">
              {/* Simplified Pakistan map representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 border-2 border-green-300 rounded-lg bg-green-50">
                  {/* Province outlines */}
                  <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 border border-green-400 rounded bg-green-100"></div>
                  <div className="absolute top-2/3 left-1/3 w-1/3 h-1/4 border border-green-400 rounded bg-green-100"></div>
                  <div className="absolute top-1/3 right-1/4 w-1/4 h-1/3 border border-green-400 rounded bg-green-100"></div>
                  
                  {/* Tree markers */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i}
                      className="absolute w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="mt-4 text-gray-600">
              Trees planted across all provinces of Pakistan. Hover over markers to see details.
            </p>
          </div>
        </div>

        {/* Data Verification */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Verified & Audited Data</h2>
              <p className="text-gray-700 mb-4">
                Every tree in our database is verified through multiple methods including:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>GPS Coordinates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Photo Documentation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Community Verification</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Regular Audits</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 mt-6 lg:mt-0 lg:text-right">
              <button className="bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 font-bold py-3 px-8 rounded-lg transition-colors">
                Request Audit Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}