"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Edit,
  Trash2,
  Target,
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft
} from 'lucide-react';

export default function VolunteerOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/volunteers?type=opportunities');
      if (!response.ok) throw new Error('Failed to fetch opportunities');
      const data = await response.json();
      setOpportunities(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return;

    try {
      const response = await fetch(`/api/admin/volunteers?type=opportunity&id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete opportunity');

      setOpportunities(opportunities.filter(opp => opp._id !== id));
    } catch (err) {
      alert('Error deleting opportunity: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link
            href="/admin/volunteers"
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Volunteer Opportunities</h1>
            <p className="text-gray-600">Manage volunteer opportunities</p>
          </div>
        </div>
        <Link
          href="/admin/volunteers/opportunities/add"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Opportunity
        </Link>
      </div>

      {opportunities.length === 0 ? (
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities yet</h3>
          <p className="text-gray-500 mb-6">Create your first volunteer opportunity to get started.</p>
          <Link
            href="/admin/volunteers/opportunities/add"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add First Opportunity
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <div key={opportunity._id} className="bg-white rounded-lg shadow hover:shadow-md transition p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg text-gray-900">{opportunity.title}</h3>
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/volunteers/opportunities/edit/${opportunity._id}`}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(opportunity._id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-2 text-green-600" />
                  <span>{opportunity.category}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                  <span>{opportunity.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                  <span>{new Date(opportunity.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-orange-600" />
                  <span>{opportunity.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-indigo-600" />
                  <span>{opportunity.volunteersRegistered}/{opportunity.volunteersNeeded} volunteers</span>
                </div>
              </div>

              <div className="mt-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  opportunity.priority === 'High'
                    ? 'bg-red-100 text-red-800'
                    : opportunity.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {opportunity.priority} Priority
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
