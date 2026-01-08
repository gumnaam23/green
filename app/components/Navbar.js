"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Trees, 
  Home, 
  Info, 
  Users, 
  Heart, 
  MapPin, 
  DollarSign, 
  MessageCircle, 
  Menu, 
  X, 
  User, 
  ChevronDown,
  Phone,
  Mail
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTreesOpen, setIsTreesOpen] = useState(false);

  const ngoDetails = {
    name: "GreenEarth Pakistan",
    phone: "+92 51 1234567",
    email: "info@greenearth.pk"
  };

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    { 
      href: "/about", 
      label: "About", 
      icon: <Info className="h-4 w-4" />,
      subLinks: [
        { href: "/about#mission", label: "Our Mission" },
        { href: "/about#vision", label: "Our Vision" },
        { href: "/about#team", label: "Our Team" },
        { href: "/about#partners", label: "Partners" },
        { href: "/about#awards", label: "Awards" },
      ]
    },
    { 
      href: "/trees", 
      label: "Our Trees", 
      icon: <Trees className="h-4 w-4" />,
      subLinks: [
        { href: "/trees", label: "Overview" },
        { href: "/trees/planted", label: "Planted Trees" },
        { href: "/trees/pending", label: "Pending Tasks" },
        { href: "/trees/locations", label: "Locations" },
      ]
    },
    { href: "/donate", label: "Donate", icon: <Heart className="h-4 w-4" /> },
    { href: "/volunteers", label: "Volunteer", icon: <Users className="h-4 w-4" /> },
    { href: "/finances", label: "Finances", icon: <DollarSign className="h-4 w-4" /> },
    { href: "/contact", label: "Contact", icon: <MessageCircle className="h-4 w-4" /> },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-2" />
                <span>{ngoDetails.phone}</span>
              </div>
              <div className="hidden md:flex items-center">
                <Mail className="h-3 w-3 mr-2" />
                <span>{ngoDetails.email}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition">
                اردو
              </button>
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-xs">Follow us:</span>
                <div className="flex space-x-2">
                  <a href="#" className="hover:text-green-200">FB</a>
                  <a href="#" className="hover:text-green-200">TW</a>
                  <a href="#" className="hover:text-green-200">IG</a>
                  <a href="#" className="hover:text-green-200">YT</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-2 rounded-lg group-hover:shadow-lg transition-shadow">
              <Trees className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">GreenEarth</span>
              <span className="text-sm text-emerald-600 -mt-1">Pakistan Initiative</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors"
                  onMouseEnter={() => {
                    if (link.subLinks) {
                      link.href === '/about' ? setIsAboutOpen(true) : setIsTreesOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (link.subLinks) {
                      link.href === '/about' ? setIsAboutOpen(false) : setIsTreesOpen(false);
                    }
                  }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  {link.subLinks && <ChevronDown className="h-4 w-4" />}
                </Link>
                
                {/* Dropdown for About */}
                {link.href === '/about' && isAboutOpen && link.subLinks && (
                  <div 
                    className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    onMouseEnter={() => setIsAboutOpen(true)}
                    onMouseLeave={() => setIsAboutOpen(false)}
                  >
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}
                
                {/* Dropdown for Trees */}
                {link.href === '/trees' && isTreesOpen && link.subLinks && (
                  <div 
                    className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    onMouseEnter={() => setIsTreesOpen(true)}
                    onMouseLeave={() => setIsTreesOpen(false)}
                  >
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="ml-4 flex items-center space-x-4">
              <Link
                href="/donate"
                className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center space-x-2"
              >
                <Heart className="h-4 w-4" />
                <span>Plant a Tree</span>
              </Link>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link
              href="/donate"
              className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold text-sm"
            >
              Donate
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    onClick={() => {
                      if (!link.subLinks) setIsMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      {link.icon}
                      <span className="font-medium">{link.label}</span>
                    </div>
                    {link.subLinks && <ChevronDown className="h-4 w-4" />}
                  </Link>
                  
                  {/* Mobile sublinks */}
                  {link.subLinks && (
                    <div className="ml-8 mt-1 space-y-1">
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className="block px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors text-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="px-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex-1 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <User className="h-5 w-5 mx-auto" />
                  </button>
                  <div className="flex-1 flex justify-center space-x-4">
                    <a href="#" className="text-gray-400 hover:text-green-600">FB</a>
                    <a href="#" className="text-gray-400 hover:text-green-600">TW</a>
                    <a href="#" className="text-gray-400 hover:text-green-600">IG</a>
                    <a href="#" className="text-gray-400 hover:text-green-600">YT</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;