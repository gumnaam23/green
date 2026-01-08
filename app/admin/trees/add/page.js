"use client";

import {
  Save,
  X,
  MapPin,
  Calendar,
  Users,
  Upload,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function AddTreesPage() {
  const [formData, setFormData] = useState({
    location: '',
    province: '',
    coordinates: '',
    plantingDate: '',
    treeCount: '',
    species: '',
    volunteers: '',
    projectLead: '',
    notes: '',
    photos: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad', 'Gilgit-Baltistan', 'Azad Kashmir'];
  const speciesList = ['Neem', 'Kikar', 'Sheesham', 'Deodar', 'Mango', 'Avicennia', 'Chir Pine', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        location: formData.location,
        coordinates: formData.coordinates,
        species: formData.species,
        count: parseInt(formData.treeCount),
        plantingDate: new Date(formData.plantingDate),
        status: 'planted',
        survivalRate: 85,
        volunteers: formData.volunteers ? parseInt(formData.volunteers) : 0,
        projectLead: formData.projectLead,
        photos: 0 // Will be updated when photo upload is implemented
      };

      const response = await fetch('/api/admin/trees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create tree record');
      }

      const result = await response.json();

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          location: '',
          province: '',
          coordinates: '',
          plantingDate: '',
          treeCount: '',
          species: '',
          volunteers: '',
          projectLead: '',
          notes: '',
          photos: []
        });
      }, 3000);
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Tree Plantation</h1>
          <p className="text-gray-600">Add new tree plantation record to the system</p>
        </div>
        <Link 
          href="/admin/trees"
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Link>
      </div>

      {isSubmitted && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <h3 className="font-bold text-gray-900">Plantation Record Added Successfully!</h3>
              <p className="text-gray-600 mt-1">The new tree plantation has been added to the system.</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <X className="h-8 w-8 text-red-600 mr-4" />
            <div>
              <h3 className="font-bold text-gray-900">Error Adding Plantation Record</h3>
              <p className="text-gray-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Plantation Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location Name *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Margalla Hills, Islamabad"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province *
              </label>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Province</option>
                {provinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPS Coordinates
              </label>
              <input
                type="text"
                name="coordinates"
                value={formData.coordinates}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 33.6844° N, 73.0479° E"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Planting Date *
              </label>
              <input
                type="date"
                name="plantingDate"
                value={formData.plantingDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Trees *
              </label>
              <input
                type="number"
                name="treeCount"
                value={formData.treeCount}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Species *
              </label>
              <select
                name="species"
                value={formData.species}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Species</option>
                {speciesList.map(species => (
                  <option key={species} value={species}>{species}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Volunteers
              </label>
              <input
                type="number"
                name="volunteers"
                value={formData.volunteers}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Lead
              </label>
              <input
                type="text"
                name="projectLead"
                value={formData.projectLead}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Name of project lead"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Additional notes about this plantation..."
            />
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag & drop photos here or click to browse</p>
              <p className="text-sm text-gray-500">Supports JPG, PNG up to 5MB each</p>
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Browse Files
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Environmental Impact</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {formData.treeCount ? (parseInt(formData.treeCount) * 20).toLocaleString() : '0'}
              </div>
              <div className="text-sm text-gray-600">CO₂ Absorbed (kg/year)</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {formData.treeCount ? (parseInt(formData.treeCount) * 118).toLocaleString() : '0'}
              </div>
              <div className="text-sm text-gray-600">Oxygen Produced (kg/year)</div>
            </div>
            
            <div className="text-center p-4 bg-cyan-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {formData.treeCount ? (parseInt(formData.treeCount) * 100).toLocaleString() : '0'}
              </div>
              <div className="text-sm text-gray-600">Water Filtered (L/year)</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                PKR {formData.treeCount ? (parseInt(formData.treeCount) * 500).toLocaleString() : '0'}
              </div>
              <div className="text-sm text-gray-600">Estimated Cost</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Link 
            href="/admin/trees"
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Adding...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-3" />
                Add Plantation
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
