"use client";

import Link from "next/link";
import { Users, Plus, Edit, MessageSquare, Target, BarChart3 } from "lucide-react";

export default function VolunteersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Volunteers Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/volunteers/opportunities"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <Target className="h-8 w-8 text-green-600 mb-3" />
          <h2 className="font-semibold text-lg">Manage Opportunities</h2>
          <p className="text-sm text-gray-500">Create and manage volunteer opportunities</p>
        </Link>

        <Link
          href="/admin/volunteers/testimonials"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <MessageSquare className="h-8 w-8 text-blue-600 mb-3" />
          <h2 className="font-semibold text-lg">Manage Testimonials</h2>
          <p className="text-sm text-gray-500">Add and edit volunteer testimonials</p>
        </Link>

        <Link
          href="/admin/volunteers/list"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <Users className="h-8 w-8 text-purple-600 mb-3" />
          <h2 className="font-semibold text-lg">Volunteer List</h2>
          <p className="text-sm text-gray-500">View and manage volunteer records</p>
        </Link>

        <Link
          href="/admin/volunteers/summaries"
          className="p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <BarChart3 className="h-8 w-8 text-green-600 mb-3" />
          <h2 className="font-semibold text-lg">Program Summary</h2>
          <p className="text-sm text-gray-500">View volunteer program analytics</p>
        </Link>
      </div>
    </div>
  );
}
