"use client";

import { 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  Award,
  CheckCircle,
  Heart,
  TrendingUp,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Plus,
  Download,
  Share2,
  Mail,
  Phone,
  User,
  Users as UsersIcon,
  Target,
  Shield,
  Briefcase,
  GraduationCap,
  Building,
  Car,
  Wifi,
  Coffee,
  Pizza,
  Music,
  Camera,
  Video,
  Gift,
  Trophy,
  Leaf,
  Trees
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VolunteersPage() {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [expandedOpportunity, setExpandedOpportunity] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);




  const volunteerData = {
    summary: {
      totalVolunteers: 25_891,
      activeVolunteers: 15_672,
      volunteerHours: 1_250_000,
      upcomingEvents: 24,
      citiesCovered: 45,
      trainingCompleted: 12_500,
      awardsGiven: 1_250,
      treesPlantedByVolunteers: 850_000,
    },
    categories: [
      { id: 'all', name: 'All Opportunities', icon: Users, count: 24 },
      { id: 'plantation', name: 'Tree Plantation', icon: Trees, count: 12 },
      { id: 'education', name: 'Education & Training', icon: GraduationCap, count: 5 },
      { id: 'community', name: 'Community Outreach', icon: UsersIcon, count: 4 },
      { id: 'technical', name: 'Technical Support', icon: Wifi, count: 3 },
    ],
    locations: [
      { id: 'all', name: 'All Locations' },
      { id: 'islamabad', name: 'Islamabad' },
      { id: 'lahore', name: 'Lahore' },
      { id: 'karachi', name: 'Karachi' },
      { id: 'peshawar', name: 'Peshawar' },
      { id: 'quetta', name: 'Quetta' },
      { id: 'multan', name: 'Multan' },
      { id: 'faisalabad', name: 'Faisalabad' },
      { id: 'hyderabad', name: 'Hyderabad' },
    ],
    opportunities: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: [
        "Margalla Hills Tree Plantation Drive",
        "Karachi Coastal Cleanup & Mangrove Planting",
        "Lahore Urban Forestry Workshop",
        "Swat Valley Reforestation Project",
        "Environmental Awareness Camp for Schools",
        "Tree Monitoring & Data Collection",
        "Community Garden Development",
        "Corporate Volunteering Day",
        "Youth Environmental Leadership Program",
        "Tree Maintenance & Care Training",
        "Photography & Documentation Team",
        "Social Media & Outreach Volunteers"
      ][i],
      category: ["plantation", "plantation", "education", "plantation", "education", "technical", "community", "community", "education", "education", "technical", "community"][i],
      location: ["Islamabad", "Karachi", "Lahore", "Swat", "Islamabad", "Multiple Cities", "Lahore", "Karachi", "Islamabad", "Lahore", "Remote", "Remote"][i],
      date: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      duration: ["Full Day", "Half Day", "3 Days", "Weekend", "2 Hours", "Flexible", "Full Day", "Half Day", "1 Month", "2 Days", "Flexible", "Flexible"][i],
      volunteersNeeded: Math.floor(Math.random() * 200) + 50,
      volunteersRegistered: Math.floor(Math.random() * 150) + 30,
      priority: ["high", "medium", "low"][i % 3],
      description: "Join us in this impactful initiative to plant trees and create sustainable ecosystems. No prior experience needed - we provide all training and equipment.",
      requirements: [
        "Age 16+ (under 18 requires guardian consent)",
        "Basic physical fitness",
        "Willingness to work outdoors",
        "Team player attitude"
      ],
      benefits: [
        "Certificate of Participation",
        "Training & Skill Development",
        "Networking Opportunities",
        "Meals & Refreshments",
        "Transportation (if needed)",
        "Volunteer Recognition"
      ],
      skillsGained: ["Environmental Conservation", "Teamwork", "Leadership", "Project Management"][i % 4],
      impact: {
        trees: Math.floor(Math.random() * 5000) + 1000,
        co2: Math.floor(Math.random() * 10000) + 5000,
        community: Math.floor(Math.random() * 500) + 100,
      }
    })),
    testimonials: [
      {
        name: "Ahmed Raza",
        role: "Student Volunteer",
        city: "Islamabad",
        hours: 250,
        trees: 1500,
        quote: "Volunteering with GreenEarth changed my perspective on environmental conservation. The hands-on experience and training I received were invaluable.",
        avatar: "AR"
      },
      {
        name: "Fatima Khan",
        role: "Corporate Volunteer",
        city: "Karachi",
        hours: 120,
        trees: 800,
        quote: "Our company's partnership with GreenEarth has been transformative. The team-building activities while making a real environmental impact are priceless.",
        avatar: "FK"
      },
      {
        name: "Bilal Ahmed",
        role: "Team Lead",
        city: "Lahore",
        hours: 500,
        trees: 3500,
        quote: "From volunteer to team lead, GreenEarth has provided incredible growth opportunities. The structured programs and recognition keep volunteers motivated.",
        avatar: "BA"
      }
    ],
    volunteerBenefits: [
      {
        icon: Award,
        title: "Certification & Recognition",
        description: "Receive certificates, awards, and public recognition for your contributions"
      },
      {
        icon: GraduationCap,
        title: "Skill Development",
        description: "Gain valuable skills in project management, leadership, and environmental science"
      },
      {
        icon: UsersIcon,
        title: "Networking",
        description: "Connect with like-minded individuals and professionals in environmental conservation"
      },
      {
        icon: Heart,
        title: "Health Benefits",
        description: "Improve physical and mental health through outdoor activities and community service"
      }
    ]
  };

  const filteredOpportunities = volunteerData.opportunities.filter(opp => {
    if (selectedCategory !== 'all' && opp.category !== selectedCategory) return false;
    if (selectedLocation !== 'all' && opp.location.toLowerCase() !== selectedLocation.toLowerCase()) return false;
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateDaysLeft = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const RegistrationForm = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Volunteer Registration</h2>
            <button 
              onClick={() => setShowRegistrationForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === registrationStep ? 'bg-green-600 text-white' :
                  step < registrationStep ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {step < registrationStep ? <CheckCircle className="h-6 w-6" /> : step}
                </div>
                <div className="text-sm mt-2">
                  {step === 1 && 'Personal Info'}
                  {step === 2 && 'Skills & Interests'}
                  {step === 3 && 'Availability'}
                  {step === 4 && 'Review'}
                </div>
              </div>
            ))}
          </div>
          
          {/* Step 1: Personal Information */}
          {registrationStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">Select City</option>
                    {volunteerData.locations.filter(l => l.id !== 'all').map(location => (
                      <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CNIC/B-Form Number</label>
                  <input type="text" placeholder="XXXXX-XXXXXXX-X" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                </div>
              </div>
              
              <div className="flex justify-between pt-6">
                <button 
                  onClick={() => setShowRegistrationForm(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setRegistrationStep(2)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Skills & Interests */}
          {registrationStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Skills & Interests</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">What are your areas of interest?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Tree Plantation', 'Education', 'Community Outreach', 'Photography', 'Social Media', 'Data Entry', 'Event Management', 'First Aid', 'Public Speaking'].map(skill => (
                    <label key={skill} className="flex items-center p-3 border border-gray-300 rounded-lg hover:border-green-500 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 text-green-600 rounded" />
                      <span className="ml-3 text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Previous Volunteer Experience</label>
                <textarea 
                  rows={3}
                  placeholder="Describe any previous volunteer experience..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills & Qualifications</label>
                <textarea 
                  rows={3}
                  placeholder="List any relevant skills, certifications, or qualifications..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex justify-between pt-6">
                <button 
                  onClick={() => setRegistrationStep(1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button 
                  onClick={() => setRegistrationStep(3)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Availability */}
          {registrationStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Availability & Preferences</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">When are you available?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Weekends', 'Weekdays', 'Mornings', 'Afternoons', 'Evenings', 'Full Days', 'Flexible', 'Remote Only'].map(time => (
                    <label key={time} className="flex items-center p-3 border border-gray-300 rounded-lg hover:border-green-500 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 text-green-600 rounded" />
                      <span className="ml-3 text-sm">{time}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Commitment Level</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="occasional">Occasional (1-2 times/month)</option>
                    <option value="regular">Regular (Weekly)</option>
                    <option value="intensive">Intensive (Project-based)</option>
                    <option value="remote">Remote Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transportation</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="own">Own Transportation</option>
                    <option value="need">Need Transportation</option>
                    <option value="public">Public Transport</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements (if any)</label>
                <textarea 
                  rows={2}
                  placeholder="Any medical conditions, dietary restrictions, or special needs..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex justify-between pt-6">
                <button 
                  onClick={() => setRegistrationStep(2)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button 
                  onClick={() => setRegistrationStep(4)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}
          
          {/* Step 4: Review & Submit */}
          {registrationStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Review & Submit</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Registration Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Full Name:</span>
                    <span className="font-medium">Ahmed Raza</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">ahmed@example.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">City:</span>
                    <span className="font-medium">Islamabad</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interests:</span>
                    <span className="font-medium">Tree Plantation, Education</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className="font-medium">Weekends, Full Days</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <Shield className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-yellow-800">Important Information</div>
                    <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                      <li>• You will receive a confirmation email within 24 hours</li>
                      <li>• Training sessions are mandatory for first-time volunteers</li>
                      <li>• Safety briefing will be provided at each event</li>
                      <li>• Please bring your CNIC copy for verification</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="terms" className="h-4 w-4 text-green-600 rounded" />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                  I agree to the Terms & Conditions and understand that participation may involve outdoor physical activity.
                </label>
              </div>
              
              <div className="flex justify-between pt-6">
                <button 
                  onClick={() => setRegistrationStep(3)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button 
                  onClick={() => {
                    setShowRegistrationForm(false);
                    setRegistrationStep(1);
                    // Here you would typically submit the form
                    alert('Registration submitted successfully! You will receive a confirmation email shortly.');
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Submit Registration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {showRegistrationForm && <RegistrationForm />}
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Users className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Volunteer Community</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Become part of Pakistan's largest environmental volunteer network. 
              Make a difference, learn new skills, and connect with like-minded individuals.
            </p>
            <button 
              onClick={() => setShowRegistrationForm(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg flex items-center mx-auto"
            >
              <Plus className="h-5 w-5 mr-2" />
              Register as Volunteer
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Active Volunteers", value: volunteerData.summary.activeVolunteers.toLocaleString(), icon: Users, color: "green", trend: "+15% this month" },
            { label: "Volunteer Hours", value: (volunteerData.summary.volunteerHours / 1000).toFixed(0) + "K", icon: Clock, color: "blue", trend: "250K hours/month" },
            { label: "Upcoming Events", value: volunteerData.summary.upcomingEvents, icon: Calendar, color: "orange", trend: "Join now" },
            { label: "Cities Covered", value: volunteerData.summary.citiesCovered, icon: MapPin, color: "purple", trend: "Nationwide" },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('opportunities')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'opportunities'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Volunteer Opportunities
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'benefits'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Benefits & Rewards
              </button>
              <button
                onClick={() => setActiveTab('stories')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stories'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Volunteer Stories
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'faq'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                FAQs
              </button>
            </nav>
          </div>
        </div>

        {/* Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search volunteer opportunities..."
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
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[180px]"
                  >
                    {volunteerData.categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                  
                  <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white min-w-[150px]"
                  >
                    {volunteerData.locations.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </select>
                  
                  <button className="flex items-center text-green-700 hover:text-green-800">
                    <Download className="h-5 w-5 mr-2" />
                    Download Schedule
                  </button>
                </div>
              </div>
            </div>

            {/* Opportunities Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {filteredOpportunities.map((opportunity) => {
                const daysLeft = calculateDaysLeft(opportunity.date);
                const CategoryIcon = volunteerData.categories.find(c => c.id === opportunity.category)?.icon || Users;
                
                return (
                  <div key={opportunity.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                            <CategoryIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{opportunity.title}</h3>
                            <div className="flex items-center text-gray-600 mt-2">
                              <MapPin className="h-4 w-4 mr-2" />
                              {opportunity.location}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedOpportunity(expandedOpportunity === opportunity.id ? null : opportunity.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedOpportunity === opportunity.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </button>
                      </div>
                      
                      {/* Opportunity Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{formatDate(opportunity.date)}</div>
                          <div className="text-sm text-gray-600">Date</div>
                          {daysLeft > 0 && (
                            <div className="text-xs text-orange-600 mt-1">
                              {daysLeft} days left to register
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{opportunity.duration}</div>
                          <div className="text-sm text-gray-600">Duration</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">
                            {opportunity.volunteersRegistered}/{opportunity.volunteersNeeded}
                          </div>
                          <div className="text-sm text-gray-600">Volunteers</div>
                          <div className="h-1 bg-gray-200 rounded-full overflow-hidden mt-2">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${(opportunity.volunteersRegistered / opportunity.volunteersNeeded) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expanded Content */}
                      {expandedOpportunity === opportunity.id && (
                        <div className="border-t border-gray-200 pt-6 mt-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-bold text-gray-900 mb-4">Description</h4>
                              <p className="text-gray-700 mb-6">{opportunity.description}</p>
                              
                              <div className="space-y-3">
                                <div>
                                  <div className="font-medium text-gray-900 mb-2">Requirements</div>
                                  <ul className="space-y-2">
                                    {opportunity.requirements.map((req, idx) => (
                                      <li key={idx} className="flex items-center text-gray-600">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div>
                                  <div className="font-medium text-gray-900 mb-2">Skills You'll Gain</div>
                                  <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                      {opportunity.skillsGained}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-bold text-gray-900 mb-4">Benefits & Impact</h4>
                              
                              <div className="space-y-4">
                                <div>
                                  <div className="font-medium text-gray-900 mb-2">What You'll Get</div>
                                  <div className="grid grid-cols-2 gap-2">
                                    {opportunity.benefits.slice(0, 4).map((benefit, idx) => (
                                      <div key={idx} className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        {benefit}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="font-medium text-gray-900 mb-2">Expected Impact</div>
                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-green-50 rounded p-3 text-center">
                                      <div className="text-lg font-bold text-green-600">{opportunity.impact.trees}</div>
                                      <div className="text-xs text-gray-600">Trees to Plant</div>
                                    </div>
                                    <div className="bg-blue-50 rounded p-3 text-center">
                                      <div className="text-lg font-bold text-blue-600">{opportunity.impact.co2} kg</div>
                                      <div className="text-xs text-gray-600">CO₂ Reduction</div>
                                    </div>
                                    <div className="bg-orange-50 rounded p-3 text-center">
                                      <div className="text-lg font-bold text-orange-600">{opportunity.impact.community}</div>
                                      <div className="text-xs text-gray-600">People Impacted</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-6 pt-6 border-t border-gray-200">
                                <button 
                                  onClick={() => setShowRegistrationForm(true)}
                                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg"
                                >
                                  Register for This Opportunity
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => setShowRegistrationForm(true)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg"
                        >
                          Register Now
                        </button>
                        <button className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Corporate Volunteering */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg p-8 text-white mb-8">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-2/3">
                  <h2 className="text-2xl font-bold mb-4">Corporate Volunteering Programs</h2>
                  <p className="mb-6 opacity-90">
                    Looking for team-building activities with real impact? Our corporate volunteering 
                    programs combine environmental action with meaningful engagement.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-2xl font-bold">50+</div>
                      <div>Corporate Teams</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-2xl font-bold">100K+</div>
                      <div>Corporate Trees Planted</div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/3 mt-6 lg:mt-0 lg:text-right">
                  <button className="bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100">
                    <Briefcase className="h-5 w-5 inline mr-2" />
                    Enquire for Corporate
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Benefits & Rewards Tab */}
        {activeTab === 'benefits' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Volunteer With Us?</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {volunteerData.volunteerBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="bg-green-100 text-green-600 rounded-2xl p-6 mb-6 inline-flex">
                        <Icon className="h-12 w-12" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recognition Program */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl shadow-lg p-8 text-white">
              <div className="text-center mb-8">
                <Award className="h-16 w-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Volunteer Recognition Program</h2>
                <p className="opacity-90 max-w-2xl mx-auto">
                  We celebrate and reward our volunteers' dedication through our comprehensive recognition program.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl font-bold mb-4">🥇</div>
                  <h3 className="text-xl font-bold mb-3">Gold Tier</h3>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>• 500+ volunteer hours</li>
                    <li>• Exclusive training opportunities</li>
                    <li>• Leadership roles</li>
                    <li>• Annual recognition ceremony</li>
                  </ul>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl font-bold mb-4">🥈</div>
                  <h3 className="text-xl font-bold mb-3">Silver Tier</h3>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>• 250-499 volunteer hours</li>
                    <li>• Advanced skill training</li>
                    <li>• Mentorship opportunities</li>
                    <li>• Quarterly recognition</li>
                  </ul>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl font-bold mb-4">🥉</div>
                  <h3 className="text-xl font-bold mb-3">Bronze Tier</h3>
                  <ul className="space-y-2 text-sm opacity-90">
                    <li>• 100-249 volunteer hours</li>
                    <li>• Basic skill training</li>
                    <li>• Certificate of appreciation</li>
                    <li>• Monthly newsletter feature</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button className="bg-white text-green-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100">
                  View Recognition Criteria
                </button>
              </div>
            </div>

            {/* Training & Development */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Training & Development</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <GraduationCap className="h-8 w-8 text-green-600 mr-4 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Orientation & Basic Training</h3>
                      <p className="text-gray-600">All new volunteers receive comprehensive orientation covering safety procedures, basic skills, and project overview.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Target className="h-8 w-8 text-blue-600 mr-4 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Specialized Workshops</h3>
                      <p className="text-gray-600">Regular workshops on tree care, environmental science, community engagement, and leadership development.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <TrendingUp className="h-8 w-8 text-orange-600 mr-4 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Skill Certification</h3>
                      <p className="text-gray-600">Earn certifications in areas like first aid, environmental monitoring, project management, and public speaking.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <UsersIcon className="h-8 w-8 text-purple-600 mr-4 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Mentorship Program</h3>
                      <p className="text-gray-600">Get paired with experienced volunteers for guidance and support throughout your volunteering journey.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Volunteer Stories Tab */}
        {activeTab === 'stories' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Volunteer Success Stories</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {volunteerData.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center mb-6">
                      <div className="bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        <p className="text-gray-500 text-xs">{testimonial.city}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {testimonial.hours} hours
                      </div>
                      <div className="flex items-center">
                        <Trees className="h-4 w-4 mr-2" />
                        {testimonial.trees} trees
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Volunteers */}
            <div className="bg-gradient-to-r from-green-800 to-emerald-700 rounded-xl shadow-lg p-8 text-white">
              <div className="text-center mb-8">
                <Trophy className="h-16 w-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Volunteer of the Month</h2>
                <p className="opacity-90 max-w-2xl mx-auto">
                  Meet our exceptional volunteers who go above and beyond in serving our mission.
                </p>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/3 text-center mb-8 lg:mb-0">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-48 h-48 flex items-center justify-center mx-auto mb-6">
                    <User className="h-32 w-32 text-white/80" />
                  </div>
                  <h3 className="text-2xl font-bold">Sarah Khan</h3>
                  <p className="text-green-200">Lead Volunteer Coordinator</p>
                </div>
                
                <div className="lg:w-2/3 lg:pl-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold mb-4">Achievements This Month</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold">1,250</div>
                        <div className="text-sm opacity-90">Trees Planted</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">85</div>
                        <div className="text-sm opacity-90">Volunteers Trained</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">4</div>
                        <div className="text-sm opacity-90">Events Organized</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">120</div>
                        <div className="text-sm opacity-90">Volunteer Hours</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="text-xl font-bold mb-4">Sarah's Story</h4>
                    <p className="opacity-90 mb-4">
                      "Starting as a weekend volunteer in 2020, I never imagined I'd be coordinating large-scale 
                      plantation drives. GreenEarth provided the training, support, and opportunities that helped 
                      me grow both personally and professionally. The sense of community and impact keeps me 
                      motivated every day."
                    </p>
                    <div className="flex items-center text-sm opacity-80">
                      <span className="mr-4">Joined: March 2020</span>
                      <span>Total Hours: 2,500+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Your Story */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <Heart className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Volunteer Story</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                We love hearing from our volunteers! Share your experiences, photos, and videos to inspire others.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg">
                <Camera className="h-5 w-5 inline mr-2" />
                Share Your Story
              </button>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {[
                  {
                    question: "Who can volunteer with GreenEarth Pakistan?",
                    answer: "Anyone aged 16 and above can volunteer with us. Volunteers under 18 require guardian consent. We welcome individuals, students, professionals, corporate groups, and international volunteers."
                  },
                  {
                    question: "Do I need prior experience to volunteer?",
                    answer: "No prior experience is necessary! We provide comprehensive training and orientation for all new volunteers. Our programs are designed to accommodate both beginners and experienced individuals."
                  },
                  {
                    question: "What should I bring to a volunteer event?",
                    answer: "We recommend bringing: 1) CNIC/B-Form for registration, 2) Comfortable clothes and shoes for outdoor work, 3) Sun protection (hat, sunscreen), 4) Reusable water bottle, 5) Positive attitude! All tools and equipment are provided."
                  },
                  {
                    question: "Are there remote volunteering opportunities?",
                    answer: "Yes! We offer remote volunteering in areas like social media management, content writing, graphic design, data analysis, and virtual tutoring for environmental education programs."
                  },
                  {
                    question: "How do I track my volunteer hours?",
                    answer: "All registered volunteers receive access to our volunteer portal where you can log hours, track your impact, download certificates, and monitor your progress through our recognition program tiers."
                  },
                  {
                    question: "Can I volunteer as part of a corporate CSR program?",
                    answer: "Absolutely! We have dedicated corporate volunteering programs with flexible scheduling, impact reporting, and team-building activities. Contact our corporate partnerships team for customized programs."
                  },
                  {
                    question: "Is transportation provided for volunteer events?",
                    answer: "Transportation is provided from designated pickup points in major cities. Details are shared in the event briefing. Volunteers with their own transportation are also welcome."
                  },
                  {
                    question: "How often are volunteer events organized?",
                    answer: "We organize events throughout the year. Major plantation drives are typically scheduled during monsoon and spring seasons. Regular maintenance activities happen weekly. Check our calendar for upcoming events."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedOpportunity(expandedOpportunity === `faq-${index}` ? null : `faq-${index}`)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedOpportunity === `faq-${index}` ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedOpportunity === `faq-${index}` && (
                      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Still Have Questions */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl shadow-lg p-8 text-white text-center">
              <Mail className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="opacity-90 max-w-2xl mx-auto mb-8">
                Our volunteer coordination team is here to help. Contact us for any queries about volunteering.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-green-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100">
                  <Phone className="h-5 w-5 inline mr-2" />
                  Call Volunteer Hotline
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg border border-white/30">
                  <Mail className="h-5 w-5 inline mr-2" />
                  Email Our Team
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h2>
            <p className="text-gray-600 mb-8">
              Join thousands of volunteers across Pakistan who are actively creating a greener future. 
              Your time and effort can plant the seeds of change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowRegistrationForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg"
              >
                <Plus className="h-5 w-5 inline mr-2" />
                Register as Volunteer
              </button>
              <Link 
                href="/contact" 
                className="bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 font-bold py-3 px-8 rounded-lg"
              >
                Contact Volunteer Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}