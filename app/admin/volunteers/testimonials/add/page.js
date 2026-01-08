"use client";

import {
  Save,
  X,
  User,
  MapPin,
  Clock,
  Trees,
  MessageSquare,
  Image,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Quote
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function AddTestimonialPage() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    city: '',
    hours: '',
    trees: '',
    quote: '',
    avatar: ''
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
    'Volunteer',
    'Coordinator',
    'Supervisor',
    'Trainer',
    'Administrator',
    'Community Leader',
    'Student',
    'Teacher',
    'Environmental Activist',
    'Local Resident'
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
      if (!formData.name || !formData.city || !formData.quote) {
        throw new Error('Please fill in all required fields');
      }

      const payload = {
        type: 'testimonial',
        name: formData.name,
        role: formData.role,
        city: formData.city,
        hours: parseInt(formData.hours) || 0,
        trees: parseInt(formData.trees) || 0,
        quote: formData.quote,
        avatar: formData.avatar || ''
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
        throw new Error(errorData.message || 'Failed to create testimonial');
      }

      const result = await response.json();
      console.log('Testimonial created successfully:', result);

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          role: '',
          city: '',
          hours: '',
          trees: '',
          quote: '',
          avatar: ''
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
        <div className="flex items-center">
          <Link
            href="/admin/volunteers/testimonials"
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add Testimonial</h1>
            <p className="text-gray-600">Add a volunteer testimonial to showcase their experience</p>
          </div>
        </div>
        <Link
          href="/admin/volunteers/testimonials"
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
              <h3 className="font-bold text-gray-900">Testimonial Added Successfully!</h3>
              <p className="text-gray-600 mt-1">The testimonial has been added and will be displayed on the website to inspire other volunteers.</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <X className="h-8 w-8 text-red-600 mr-4" />
            <div>
              <h3 className="font-bold text-gray-900">Error Adding Testimonial</h3>
              <p className="text-gray-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Volunteer Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
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
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Role</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
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
                Avatar URL
              </label>
              <input
                type="url"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://example.com/avatar.jpg"
              />
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
                name="trees"
                value={formData.trees}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonial Quote *
              </label>
              <textarea
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Share the volunteer's experience and what they loved about volunteering..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Testimonial Preview</h2>

          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt={formData.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-green-600" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Quote className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-medium text-gray-900">{formData.name || 'Volunteer Name'}</h3>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{formData.role || 'Role'}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    {formData.city || 'City'}
                  </div>
                </div>

                <blockquote className="text-gray-700 italic mb-4">
                  "{formData.quote || 'This volunteering experience has been incredible. I learned so much about environmental conservation and made amazing friends along the way.'}"
                </blockquote>

                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{formData.hours || '0'} hours volunteered</span>
                  </div>
                  <div className="flex items-center">
                    <Trees className="h-4 w-4 mr-1" />
                    <span>{formData.trees || '0'} trees planted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            href="/admin/volunteers/testimonials"
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
                Adding Testimonial...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-3" />
                Add Testimonial
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
