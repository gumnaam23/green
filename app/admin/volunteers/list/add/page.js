"use client";

import {
  Save,
  X,
  User,
  MapPin,
  Clock,
  Trees,
  Award,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function AddVolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    hours: '',
    treesPlanted: '',
    role: 'volunteer'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const cities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Hyderabad',
    'Gujranwala',
    'Bahawalpur',
    'Sargodha',
    'Sukkur',
    'Larkana',
    'Sheikhupura',
    'Rahim Yar Khan',
    'Jhang',
    'Dera Ghazi Khan',
    'Sahiwal'
  ];

  const roles = [
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'coordinator', label: 'Coordinator' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'trainer', label: 'Trainer' },
    { value: 'administrator', label: 'Administrator' }
  ];

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
      // Validate required fields
      if (!formData.name || !formData.city) {
        throw new Error('Please fill in all required fields');
      }

      const payload = {
        type: 'volunteer',
        name: formData.name,
        city: formData.city,
        hours: parseInt(formData.hours) || 0,
        treesPlanted: parseInt(formData.treesPlanted) || 0,
        role: formData.role
      };

      const response = await fetch('/api/admin/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create volunteer');
      }

      const result = await response.json();
      console.log('Volunteer created successfully:', result);

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          city: '',
          hours: '',
          treesPlanted: '',
          role: 'volunteer'
        });
      }, 3000);
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'administrator': return 'bg-red-100 border-red-300 text-red-800';
      case 'supervisor': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'coordinator': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'trainer': return 'bg-purple-100 border-purple-300 text-purple-800';
      default: return 'bg-green-100 border-green-300 text-green-800';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link
            href="/admin/volunteers/list"
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Volunteer</h1>
            <p className="text-gray-600">Create a new volunteer record</p>
          </div>
        </div>
        <Link
          href="/admin/volunteers/list"
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
              <h3 className="font-bold text-gray-900">Volunteer Added Successfully!</h3>
              <p className="text-gray-600 mt-1">The new volunteer has been added to the system and is ready to contribute to our plantation efforts.</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <X className="h-8 w-8 text-red-600 mr-4" />
            <div>
              <h3 className="font-bold text-gray-900">Error Adding Volunteer</h3>
              <p className="text-gray-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Volunteer Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Ahmed Khan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours Volunteered
              </label>
              <input
                type="number"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trees Planted
              </label>
              <input
                type="number"
                name="treesPlanted"
                value={formData.treesPlanted}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Volunteer Preview</h2>

          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{formData.name || 'Volunteer Name'}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {formData.city || 'City'}
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRoleColor(formData.role)}`}>
                {roles.find(r => r.value === formData.role)?.label || 'Volunteer'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span className="font-medium">{formData.hours || '0'}</span>
                <span className="ml-1">hours</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Trees className="h-4 w-4 mr-2" />
                <span className="font-medium">{formData.treesPlanted || '0'}</span>
                <span className="ml-1">trees planted</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            href="/admin/volunteers/list"
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
                Creating Volunteer...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-3" />
                Add Volunteer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
