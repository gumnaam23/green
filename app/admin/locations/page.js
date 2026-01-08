"use client";

import {
  MapPin,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  Download
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LocationsManagement() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [provinceFilter, setProvinceFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState([]);
  const [stats, setStats] = useState({});
  const [provinceDistribution, setProvinceDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLocations();
  }, [statusFilter, provinceFilter, searchTerm]);

  const loadLocations = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (provinceFilter !== 'all') params.append('province', provinceFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/locations?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }

      const data = await response.json();
      setLocations(data.locations || []);
      setStats(data.stats || {});
      setProvinceDistribution(data.provinceDistribution || []);
    } catch (err) {
      console.error('Error loading locations:', err);
      setError(err.message);
      // Fallback to static data if API fails
      setLocations(getStaticLocations());
      setStats(getStaticStats());
      setProvinceDistribution(getStaticProvinceDistribution());
    } finally {
      setLoading(false);
    }
  };

  const getStaticLocations = () => [
    { id: 1, name: 'Margalla Hills', province: 'Islamabad', trees: 150000, status: 'active', volunteers: 2500, progress: 85 },
    { id: 2, name: 'Changa Manga Forest', province: 'Punjab', trees: 250000, status: 'active', volunteers: 3500, progress: 92 },
    { id: 3, name: 'Karachi Coastal Area', province: 'Sindh', trees: 80000, status: 'active', volunteers: 1800, progress: 75 },
    { id: 4, name: 'Lahore Urban Parks', province: 'Punjab', trees: 120000, status: 'active', volunteers: 4200, progress: 88 },
    { id: 5, name: 'Swat Valley', province: 'KPK', trees: 180000, status: 'planned', volunteers: 0, progress: 0 },
    { id: 6, name: 'Thar Desert', province: 'Sindh', trees: 50000, status: 'active', volunteers: 1200, progress: 65 },
    { id: 7, name: 'Hunza Valley', province: 'Gilgit', trees: 30000, status: 'planned', volunteers: 0, progress: 0 },
    { id: 8, name: 'Quetta Green Belt', province: 'Balochistan', trees: 25000, status: 'active', volunteers: 800, progress: 70 },
  ];

  const getStaticStats = () => ({
    totalLocations: 78,
    activeLocations: 65,
    plannedLocations: 13,
    totalTrees: 1200000,
    totalVolunteers: 25000,
    provincesCount: 6
  });

  const getStaticProvinceDistribution = () => [
    { _id: 'Punjab', locations: 32, trees: 520000 },
    { _id: 'Sindh', locations: 18, trees: 130000 },
    { _id: 'KPK', locations: 15, trees: 180000 },
    { _id: 'Islamabad', locations: 5, trees: 359803 },
    { _id: 'Balochistan', locations: 8, trees: 65000 },
  ];

  const provinces = ['All', 'Islamabad', 'Punjab', 'Sindh', 'KPK', 'Gilgit', 'Balochistan'];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'planned': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Locations Management</h1>
          <p className="text-gray-600">Manage plantation locations and sites</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/admin/locations/add"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Link>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search locations by name or province..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="planned">Planned</option>
          </select>
          
          <select 
            value={provinceFilter}
            onChange={(e) => setProvinceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            {provinces.map(province => (
              <option key={province.toLowerCase()} value={province.toLowerCase()}>
                {province}
              </option>
            ))}
          </select>
          
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.totalLocations || 0}</div>
              <div className="text-gray-600">Total Locations</div>
            </div>
            <MapPin className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.activeLocations || 0}</div>
              <div className="text-gray-600">Active Sites</div>
            </div>
            <CheckCircle className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.plannedLocations || 0}</div>
              <div className="text-gray-600">Planned</div>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.provincesCount || 0}</div>
              <div className="text-gray-600">Provinces</div>
            </div>
            <MapPin className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {loading ? (
          <div className="col-span-full flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : locations.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No locations found</h3>
            <p className="text-gray-500">Add your first plantation location to get started.</p>
          </div>
        ) : (
          locations.map((location) => (
            <div key={location.id} className="bg-white rounded-lg border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{location.name}</h3>
                      <div className="text-sm text-gray-500">{location.province}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(location.status)}
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(location.status)}`}>
                      {location.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{location.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${location.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}
                        style={{ width: `${location.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">{location.trees?.toLocaleString() || 0}</div>
                      <div className="text-sm text-gray-600">Trees</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">{location.volunteers?.toLocaleString() || 0}</div>
                      <div className="text-sm text-gray-600">Volunteers</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between">
                    <button className="text-green-600 hover:text-green-700 flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </button>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Map Preview */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Location Map</h2>
          <button className="text-green-600 hover:text-green-700 text-sm">
            View Full Map
          </button>
        </div>
        
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Interactive map showing all plantation locations</p>
            <p className="text-sm text-gray-500 mt-2">Click on markers to view details</p>
          </div>
        </div>
      </div>

      {/* Province Distribution */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Province Distribution</h2>

        <div className="space-y-4">
          {provinceDistribution.length > 0 ? provinceDistribution.map((item, index) => {
            const colors = ['bg-green-500', 'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-teal-500', 'bg-orange-500'];
            const color = colors[index % colors.length];
            const totalLocations = provinceDistribution.reduce((sum, p) => sum + p.locations, 0);
            const percentage = totalLocations > 0 ? Math.round((item.locations / totalLocations) * 100) : 0;

            return (
              <div key={item._id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="font-medium text-gray-900">{item._id}</div>
                  <div className="text-gray-600">{item.locations} locations • {item.trees.toLocaleString()} trees</div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="ml-3 text-sm font-medium">{percentage}%</span>
                </div>
              </div>
            );
          }) : (
            <div className="text-center text-gray-500 py-8">
              <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p>No province data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
