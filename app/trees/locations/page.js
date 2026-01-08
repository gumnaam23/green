"use client";

import { 
  MapPin, 
  Search, 
  Filter, 
  Layers, 
  Navigation, 
  Target, 
  Trees,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  Compass,
  Download,
  Share2,
  Eye,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LocationsPage() {
  const [mapView, setMapView] = useState('satellite');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showSatellite, setShowSatellite] = useState(true);




  const locationsData = {
    summary: {
      totalLocations: 78,
      activeLocations: 65,
      plannedLocations: 13,
      totalTrees: 1_254_803,
      totalVolunteers: 25_891,
      totalProjects: 156,
    },
    provinces: [
      { 
        name: "Punjab", 
        count: 32, 
        trees: 520_000,
        active: 28,
        planned: 4,
        color: "bg-green-500"
      },
      { 
        name: "Sindh", 
        count: 18, 
        trees: 130_000,
        active: 15,
        planned: 3,
        color: "bg-blue-500"
      },
      { 
        name: "KPK", 
        count: 15, 
        trees: 180_000,
        active: 12,
        planned: 3,
        color: "bg-emerald-500"
      },
      { 
        name: "Balochistan", 
        count: 8, 
        trees: 65_000,
        active: 6,
        planned: 2,
        color: "bg-teal-500"
      },
      { 
        name: "Islamabad", 
        count: 5, 
        trees: 359_803,
        active: 4,
        planned: 1,
        color: "bg-purple-500"
      },
    ],
    featuredLocations: [
      {
        id: 1,
        name: "Margalla Hills National Park",
        province: "Islamabad",
        coordinates: "33.6844° N, 73.0479° E",
        trees: 150_000,
        status: "active",
        type: "forest",
        startDate: "2018-03-15",
        completion: 85,
        species: ["Chir Pine", "Kail", "Deodar", "Oak"],
        volunteers: 2500,
        impact: "Reduced soil erosion by 60%, increased biodiversity by 40%",
        description: "Large-scale reforestation project in the Margalla Hills to restore native pine forests and protect watershed areas.",
        photos: 45,
        challenges: ["Steep terrain", "Water availability", "Forest fires"],
        mapPosition: { x: 45, y: 30 }
      },
      {
        id: 2,
        name: "Changa Manga Forest",
        province: "Punjab",
        coordinates: "31.0833° N, 73.9167° E",
        trees: 250_000,
        status: "active",
        type: "forest",
        startDate: "2017-06-01",
        completion: 92,
        species: ["Sheesham", "Neem", "Kikar", "Bamboo"],
        volunteers: 3500,
        impact: "Revived Asia's largest man-made forest, created 500+ jobs",
        description: "Restoration of one of the world's largest man-made forests through community-based plantation drives.",
        photos: 67,
        challenges: ["Illegal logging", "Water management", "Pest control"],
        mapPosition: { x: 60, y: 40 }
      },
      {
        id: 3,
        name: "Karachi Coastal Mangroves",
        province: "Sindh",
        coordinates: "24.8607° N, 67.0011° E",
        trees: 80_000,
        status: "active",
        type: "mangrove",
        startDate: "2019-08-20",
        completion: 75,
        species: ["Avicennia marina", "Rhizophora mucronata"],
        volunteers: 1800,
        impact: "Protected 15km coastline, increased marine life by 35%",
        description: "Coastal mangrove restoration to combat sea intrusion and protect Karachi's coastline.",
        photos: 89,
        challenges: ["Pollution", "Urban encroachment", "Salinity"],
        mapPosition: { x: 80, y: 70 }
      },
      {
        id: 4,
        name: "Lahore Urban Green Belt",
        province: "Punjab",
        coordinates: "31.5497° N, 74.3436° E",
        trees: 120_000,
        status: "active",
        type: "urban",
        startDate: "2020-01-10",
        completion: 88,
        species: ["Neem", "Amaltas", "Gulmohar", "Jacaranda"],
        volunteers: 4200,
        impact: "Reduced urban heat island effect by 2°C, improved air quality",
        description: "Urban forestry project creating green belts and parks throughout Lahore city.",
        photos: 120,
        challenges: ["Space constraints", "Pollution", "Maintenance"],
        mapPosition: { x: 55, y: 45 }
      },
      {
        id: 5,
        name: "Swat Valley Reforestation",
        province: "KPK",
        coordinates: "35.2251° N, 72.4251° E",
        trees: 180_000,
        status: "planned",
        type: "forest",
        startDate: "2024-03-01",
        completion: 0,
        species: ["Deodar", "Spruce", "Walnut", "Apple"],
        volunteers: 0,
        impact: "Expected to restore 5000 hectares of degraded forest",
        description: "Large-scale reforestation project in Swat Valley to restore native conifer forests.",
        photos: 0,
        challenges: ["Security", "Accessibility", "Funding"],
        mapPosition: { x: 65, y: 25 }
      },
      {
        id: 6,
        name: "Thar Desert Greening",
        province: "Sindh",
        coordinates: "24.5775° N, 70.8206° E",
        trees: 50_000,
        status: "active",
        type: "desert",
        startDate: "2021-07-15",
        completion: 65,
        species: ["Acacia", "Prosopis", "Date Palm", "Neem"],
        volunteers: 1200,
        impact: "Reduced desertification, provided livelihood to 500 families",
        description: "Desert greening initiative using drought-resistant species to combat desertification.",
        photos: 56,
        challenges: ["Water scarcity", "Harsh climate", "Soil quality"],
        mapPosition: { x: 75, y: 60 }
      },
    ]
  };

  const filteredLocations = locationsData.featuredLocations.filter(location => {
    if (selectedProvince !== 'all' && location.province !== selectedProvince) return false;
    if (selectedStatus !== 'all' && location.status !== selectedStatus) return false;
    return true;
  });

  const handleMapClick = (x, y) => {
    // Find the nearest location
    const clickedLocation = locationsData.featuredLocations.find(loc => {
      const distance = Math.sqrt(
        Math.pow(loc.mapPosition.x - x, 2) + Math.pow(loc.mapPosition.y - y, 2)
      );
      return distance < 10; // Click radius
    });
    
    if (clickedLocation) {
      setSelectedLocation(clickedLocation);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Plantation Locations</h1>
              <p className="text-green-100 max-w-3xl">
                Explore our tree plantation sites across Pakistan. Click on map markers to view details.
              </p>
            </div>
            <div className="mt-6 lg:mt-0 flex space-x-4">
              <button 
                onClick={() => setShowSatellite(!showSatellite)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium flex items-center"
              >
                <Layers className="h-5 w-5 mr-2" />
                {showSatellite ? 'Map View' : 'Satellite View'}
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg font-medium flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Export Locations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {locationsData.provinces.map((province, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${province.color}`}>
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                  {province.active} active
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">{province.count}</div>
              <div className="text-gray-600">{province.name}</div>
              <div className="text-sm text-gray-500 mt-2">
                {province.trees.toLocaleString()} trees
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
                  placeholder="Search locations by name or coordinates..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center text-gray-600 hover:text-gray-900 whitespace-nowrap">
                <Filter className="h-5 w-5 mr-2" />
                More Filters
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select 
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[150px]"
              >
                <option value="all">All Provinces</option>
                {locationsData.provinces.map(province => (
                  <option key={province.name} value={province.name}>{province.name}</option>
                ))}
              </select>
              
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[150px]"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="planned">Planned</option>
              </select>
              
              <select 
                value={mapView}
                onChange={(e) => setMapView(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[150px]"
              >
                <option value="satellite">Satellite View</option>
                <option value="terrain">Terrain View</option>
                <option value="road">Road Map</option>
              </select>
            </div>
          </div>
        </div>

        {/* Map & Details Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Interactive Map</h2>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.2))}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    >
                      <ZoomIn className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.2))}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                    >
                      <ZoomOut className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                      <Compass className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Map Visualization */}
              <div className="relative h-[500px] bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
                {/* Pakistan Outline */}
                <div className="absolute inset-8 border-2 border-green-300 rounded-lg bg-green-50">
                  {/* Province boundaries */}
                  <div 
                    className="absolute top-1/4 left-1/4 w-1/4 h-1/4 border border-green-400 rounded bg-green-100/50 cursor-pointer hover:bg-green-200/50"
                    onClick={() => handleMapClick(25, 25)}
                  ></div>
                  <div 
                    className="absolute top-2/3 left-1/3 w-1/3 h-1/4 border border-green-400 rounded bg-blue-100/50 cursor-pointer hover:bg-blue-200/50"
                    onClick={() => handleMapClick(50, 75)}
                  ></div>
                  <div 
                    className="absolute top-1/3 right-1/4 w-1/4 h-1/3 border border-green-400 rounded bg-emerald-100/50 cursor-pointer hover:bg-emerald-200/50"
                    onClick={() => handleMapClick(75, 50)}
                  ></div>
                  
                  {/* Location markers */}
                  {filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      className={`absolute w-8 h-8 rounded-full border-2 border-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                        location.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                      } ${selectedLocation?.id === location.id ? 'ring-4 ring-green-300 animate-pulse' : ''}`}
                      style={{
                        left: `${location.mapPosition.x}%`,
                        top: `${location.mapPosition.y}%`,
                        transform: `scale(${zoomLevel}) translate(-50%, -50%)`
                      }}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="absolute -top-8 -left-8 bg-white text-gray-900 px-2 py-1 rounded-lg text-xs font-medium shadow-lg whitespace-nowrap">
                        {location.name.split(',')[0]}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Map Controls */}
                <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">Active Locations</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-sm">Planned Locations</span>
                    </div>
                  </div>
                </div>
                
                {/* Scale */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                  <div className="text-sm text-gray-600">Scale: 1:{Math.round(1000000 / zoomLevel).toLocaleString()}</div>
                </div>
              </div>
              
              {/* Map Legend */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>Forest Plantation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span>Urban Green Belt</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
                    <span>Mangrove Restoration</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span>Desert Greening</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location Details */}
            {selectedLocation && (
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedLocation.name}</h3>
                    <div className="flex items-center text-gray-600 mt-2">
                      <MapPin className="h-5 w-5 mr-2" />
                      {selectedLocation.coordinates} • {selectedLocation.province}
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedLocation.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedLocation.status === 'active' ? 'Active Plantation' : 'Planned Project'}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Project Overview</h4>
                    <p className="text-gray-700 mb-6">{selectedLocation.description}</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-700">Completion</div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${selectedLocation.completion}%` }}
                          ></div>
                        </div>
                        <span className="font-bold">{selectedLocation.completion}%</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-lg p-4">
                          <Trees className="h-6 w-6 text-green-600 mb-2" />
                          <div className="text-2xl font-bold text-gray-900">{selectedLocation.trees.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Trees Planted</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <Users className="h-6 w-6 text-blue-600 mb-2" />
                          <div className="text-2xl font-bold text-gray-900">{selectedLocation.volunteers.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Volunteers</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Key Details</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="font-medium text-gray-700 mb-2">Species Planted</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedLocation.species.map((species, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                              {species}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-700 mb-2">Impact Achieved</div>
                        <p className="text-gray-600 text-sm">{selectedLocation.impact}</p>
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-700 mb-2">Main Challenges</div>
                        <ul className="text-gray-600 text-sm space-y-1">
                          {selectedLocation.challenges.map((challenge, idx) => (
                            <li key={idx} className="flex items-center">
                              <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <Link 
                          href={`/trees/planted?location=${selectedLocation.name}`}
                          className="text-green-700 hover:text-green-800 font-medium flex items-center"
                        >
                          <Eye className="h-5 w-5 mr-2" />
                          View Tree Records for This Location
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Locations List */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">All Locations ({filteredLocations.length})</h2>
              
              <div className="space-y-4">
                {filteredLocations.map((location) => (
                  <div 
                    key={location.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:border-green-500 transition-colors ${
                      selectedLocation?.id === location.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-gray-900">{location.name.split(',')[0]}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        location.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {location.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {location.province} • {location.type}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-green-700 font-semibold">
                        {location.trees.toLocaleString()} trees
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {location.volunteers}
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{location.completion}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${location.completion}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Province Statistics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Province Statistics</h2>
              
              <div className="space-y-4">
                {locationsData.provinces.map((province) => (
                  <div key={province.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="font-medium text-gray-900">{province.name}</div>
                      <div className="text-gray-600">{province.count} locations</div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${province.color}`}
                          style={{ width: `${(province.count / 78) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-3 text-sm font-medium">{Math.round((province.count / 78) * 100)}%</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {province.trees.toLocaleString()} trees • {province.active} active • {province.planned} planned
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-6">Location Tools</h2>
              
              <div className="space-y-3">
                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-lg text-left font-medium transition-colors flex items-center">
                  <Navigation className="h-5 w-5 mr-3" />
                  Get Directions
                </button>
                
                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-lg text-left font-medium transition-colors flex items-center">
                  <Target className="h-5 w-5 mr-3" />
                  Set as Destination
                </button>
                
                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-lg text-left font-medium transition-colors flex items-center">
                  <Calendar className="h-5 w-5 mr-3" />
                  Schedule Visit
                </button>
                
                <Link 
                  href="/volunteers"
                  className="block w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-lg text-left font-medium transition-colors flex items-center"
                >
                  <Users className="h-5 w-5 mr-3" />
                  Volunteer at Location
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Locations */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Locations</h2>
            <Link 
              href="/trees/pending" 
              className="text-green-700 hover:text-green-800 font-medium flex items-center"
            >
              View All Pending Projects
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {locationsData.featuredLocations
              .filter(loc => loc.status === 'planned')
              .map((location) => (
                <div key={location.id} className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg mr-4">
                      <Target className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{location.name.split(',')[0]}</h4>
                      <div className="text-sm text-gray-600">{location.province}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Starts: {new Date(location.startDate).toLocaleDateString('en-PK', { dateStyle: 'medium' })}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Trees className="h-4 w-4 mr-2" />
                      Target: {location.trees.toLocaleString()} trees
                    </div>
                    <div className="text-sm text-gray-700">{location.description}</div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link 
                      href={`/trees/pending#${location.id}`}
                      className="text-green-700 hover:text-green-800 font-medium text-sm flex items-center"
                    >
                      View Project Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Download Location Data</h2>
              <p className="text-gray-700 mb-6">
                Access detailed information about all our plantation locations including GPS coordinates, 
                species data, and impact metrics.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-white border border-green-300 text-green-700 hover:bg-green-50 font-medium py-3 px-4 rounded-lg flex items-center justify-center">
                  <Download className="h-5 w-5 mr-2" />
                  CSV Format
                </button>
                <button className="bg-white border border-green-300 text-green-700 hover:bg-green-50 font-medium py-3 px-4 rounded-lg flex items-center justify-center">
                  <Download className="h-5 w-5 mr-2" />
                  KML for Google Earth
                </button>
              </div>
            </div>
            <div className="lg:w-1/3 mt-6 lg:mt-0 lg:text-right">
              <div className="inline-flex flex-col items-center bg-white rounded-lg p-6 shadow">
                <MapPin className="h-12 w-12 text-green-600 mb-4" />
                <div className="text-3xl font-bold text-gray-900">{locationsData.summary.totalLocations}</div>
                <div className="text-gray-600">Locations Mapped</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}