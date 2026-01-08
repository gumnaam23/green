"use client";

import {
  LayoutDashboard,
  Trees,
  DollarSign,
  MapPin,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  BarChart3,
  Activity,
  CheckSquare
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      title: 'Trees',
      href: '/admin/trees',
      icon: Trees,
      subItems: [
        { title: 'All Trees', href: '/admin/trees' },
        { title: 'Add Tree', href: '/admin/trees/add' },
        { title: 'Update Tree', href: '/admin/trees/update' },
        { title: 'Pending Tasks', href: '/admin/trees/pending' },
      ]
    },
    {
      title: 'Locations',
      href: '/admin/locations',
      icon: MapPin,
      subItems: [
        { title: 'All Locations', href: '/admin/locations' },
        { title: 'Add Location', href: '/admin/locations/add' },
      ]
    },
    {
      title: 'Donations',
      href: '/admin/donations',
      icon: DollarSign,
    },
    {
      title: 'Financials',
      href: '/admin/financials',
      icon: BarChart3,
      subItems: [
        { title: 'Overview', href: '/admin/financials' },
        { title: 'Reports', href: '/admin/reports' },
      ]
    },
    {
      title: 'Volunteers',
      href: '/admin/volunteers',
      icon: Users,
      subItems: [
        { title: 'Overview', href: '/admin/volunteers' },
        { title: 'All Volunteers', href: '/admin/volunteers/list' },
        { title: 'Opportunities', href: '/admin/volunteers/opportunities' },
        { title: 'Testimonials', href: '/admin/volunteers/testimonials' },
        { title: 'Summaries', href: '/admin/volunteers/summaries' },
      ]
    },
    {
      title: 'Activity',
      href: '/admin/activity',
      icon: Activity,
    },
    {
      title: 'Tasks',
      href: '/admin/tasks',
      icon: CheckSquare,
      subItems: [
        { title: 'All Tasks', href: '/admin/tasks' },
        { title: 'Add Task', href: '/admin/tasks/add' },
      ]
    },
    {
      title: 'Reports',
      href: '/admin/reports',
      icon: FileText,
    },
    // {
    //   title: 'Users',
    //   href: '/admin/users',
    //   icon: Users,
    // },
    // {
    //   title: 'Settings',
    //   href: '/admin/settings',
    //   icon: Settings,
    // },
  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-900 mr-4"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <div className="flex items-center">
                <Trees className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h1 className="text-lg font-bold text-gray-900">GreenEarth Admin</h1>
                  <p className="text-xs text-gray-500">Administration Panel</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                />
              </div>
              
              <button className="relative text-gray-600 hover:text-gray-900">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-medium text-gray-900">Admin User</div>
                  <div className="text-sm text-gray-500">Super Admin</div>
                </div>
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out`}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold">Navigation</h2>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <div key={item.title}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${active ? 'bg-green-600 text-white' : 'hover:bg-gray-800'}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                    
                    {item.subItems && active && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
                            onClick={() => setSidebarOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            
            <div className="p-4 border-t border-gray-800">
              <button className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg">
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
