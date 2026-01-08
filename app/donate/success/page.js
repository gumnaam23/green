"use client";

import { 
  CheckCircle, 
  Download, 
  Share2, 
  Mail, 
  Calendar, 
  MapPin,
  Trees,
  Users,
  CloudRain,
  Wind,
  Leaf,
  ThermometerSun,
  ArrowRight,
  Home,
  Gift,
  FileText,
  Clock,
  Star,
  Award,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DonationSuccessPage() {
  const [donationDetails, setDonationDetails] = useState(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Simulate fetching donation details from URL params or localStorage
    const details = {
      transactionId: `GREEN-${Date.now().toString().slice(-8)}`,
      amount: 5000,
      trees: 10,
      date: new Date().toISOString(),
      donorName: "Ahmed Raza",
      email: "ahmed@example.com",
      location: "Margalla Hills, Islamabad",
      paymentMethod: "Credit Card",
      taxCertificate: true,
      subscription: false,
      impact: {
        co2: 200, // kg/year
        oxygen: 1180, // kg/year
        water: 1000, // liters/year
        jobs: 1,
        biodiversity: 1
      }
    };
    setDonationDetails(details);

    // Countdown for redirect
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // In real app, you might want to redirect
          // window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const shareDonation = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'I just planted trees with GreenEarth Pakistan!',
          text: `I planted ${donationDetails?.trees} trees through GreenEarth Pakistan. Join me in making Pakistan greener!`,
          url: window.location.origin
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.origin);
      alert('Link copied to clipboard!');
    }
  };

  if (!donationDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your donation details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <CheckCircle className="h-12 w-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Thank You for Your Donation!</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Your contribution will plant {donationDetails.trees} trees and create lasting environmental impact.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-lg mr-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Donation Successful</h2>
                    <p className="text-gray-600">Transaction ID: {donationDetails.transactionId}</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-700">
                  PKR {donationDetails.amount.toLocaleString()}
                </div>
                <div className="text-gray-600">
                  {donationDetails.trees} trees • {formatDate(donationDetails.date)}
                </div>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <Award className="h-5 w-5 mr-2" />
                  Eco Warrior Level Unlocked
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <button
                onClick={() => window.print()}
                className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 flex flex-col items-center"
              >
                <Download className="h-8 w-8 text-gray-600 mb-2" />
                <span className="font-medium">Download Receipt</span>
              </button>
              <button
                onClick={shareDonation}
                className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 flex flex-col items-center"
              >
                <Share2 className="h-8 w-8 text-gray-600 mb-2" />
                <span className="font-medium">Share</span>
              </button>
              <Link
                href="/trees"
                className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 flex flex-col items-center"
              >
                <Trees className="h-8 w-8 text-gray-600 mb-2" />
                <span className="font-medium">Track Trees</span>
              </Link>
              <Link
                href="/donate"
                className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 flex flex-col items-center"
              >
                <Gift className="h-8 w-8 text-gray-600 mb-2" />
                <span className="font-medium">Donate Again</span>
              </Link>
            </div>

            {/* What's Next */}
            <div className="bg-green-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gray-900 text-lg mb-4">What Happens Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-green-600 mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Immediate Confirmation</div>
                    <div className="text-gray-600 text-sm">
                      You'll receive an email confirmation within 5 minutes
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-green-600 mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Tree Planting Scheduled</div>
                    <div className="text-gray-600 text-sm">
                      Your trees will be planted in the next plantation drive (within 30 days)
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-green-600 mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">First Update</div>
                    <div className="text-gray-600 text-sm">
                      You'll receive photos and GPS coordinates within 2 weeks of planting
                    </div>
                  </div>
                </div>
                {donationDetails.taxCertificate && (
                  <div className="flex items-start">
                    <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-green-600 mr-4 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Tax Certificate</div>
                      <div className="text-gray-600 text-sm">
                        Tax deduction certificate will be emailed within 7 working days
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Impact Summary */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-4">Donation Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Donor Name:</span>
                    <span className="font-medium">{donationDetails.donorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{donationDetails.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-medium">{donationDetails.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">{donationDetails.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Planting Location:</span>
                    <span className="font-medium">{donationDetails.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-medium">{formatDate(donationDetails.date)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-4">Environmental Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <CloudRain className="h-6 w-6 text-green-600 mr-3" />
                      <span>CO₂ Absorbed/year</span>
                    </div>
                    <span className="font-bold">{donationDetails.impact.co2} kg</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Wind className="h-6 w-6 text-blue-600 mr-3" />
                      <span>Oxygen Produced/year</span>
                    </div>
                    <span className="font-bold">{donationDetails.impact.oxygen} kg</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div className="flex items-center">
                      <Leaf className="h-6 w-6 text-emerald-600 mr-3" />
                      <span>Water Filtered/year</span>
                    </div>
                    <span className="font-bold">{donationDetails.impact.water} L</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-6 w-6 text-orange-600 mr-3" />
                      <span>Jobs Created</span>
                    </div>
                    <span className="font-bold">{donationDetails.impact.jobs}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Preview */}
          <div className="border-t border-gray-200 p-8 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex flex-col lg:flex-row lg:items-center">
              <div className="lg:w-2/3">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Your Planting Certificate</h3>
                <p className="text-gray-600 mb-4">
                  A personalized certificate has been generated for your donation. Download it to share 
                  with friends and family or print for display.
                </p>
                <div className="flex space-x-4">
                  <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg flex items-center">
                    <Download className="h-5 w-5 mr-2" />
                    Download Certificate
                  </button>
                  <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-6 rounded-lg flex items-center">
                    <Share2 className="h-5 w-5 mr-2" />
                    Share Certificate
                  </button>
                </div>
              </div>
              <div className="lg:w-1/3 mt-6 lg:mt-0 lg:text-right">
                <div className="inline-block bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                  <div className="text-center">
                    <Trees className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <div className="text-lg font-bold text-gray-900 mb-2">Tree Planting Certificate</div>
                    <div className="text-sm text-gray-600">Issued to {donationDetails.donorName}</div>
                    <div className="text-2xl font-bold text-green-700 mt-4">{donationDetails.trees} Trees</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <Link href="/trees" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2">Track Your Trees</h3>
              <p className="text-gray-600 text-sm mb-4">
                View GPS coordinates and photos of your planted trees
              </p>
              <span className="text-green-700 font-medium flex items-center justify-center">
                View Dashboard
                <ArrowRight className="h-5 w-5 ml-2" />
              </span>
            </div>
          </Link>

          <Link href="/volunteers" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2">Become a Volunteer</h3>
              <p className="text-gray-600 text-sm mb-4">
                Join our next plantation drive and see your impact first-hand
              </p>
              <span className="text-green-700 font-medium flex items-center justify-center">
                Volunteer Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </span>
            </div>
          </Link>

          <Link href="/finances" className="group">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-gray-900 mb-2">View Impact Reports</h3>
              <p className="text-gray-600 text-sm mb-4">
                See how your contribution helps our environmental mission
              </p>
              <span className="text-green-700 font-medium flex items-center justify-center">
                View Reports
                <ArrowRight className="h-5 w-5 ml-2" />
              </span>
            </div>
          </Link>
        </div>

        {/* Stay Connected */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl shadow-lg p-8 text-white text-center">
          <Heart className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
          <p className="opacity-90 mb-6 max-w-2xl mx-auto">
            Join our community of environmental champions and stay updated on plantation drives, 
            impact stories, and upcoming events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100">
              <Mail className="h-5 w-5 inline mr-2" />
              Subscribe to Newsletter
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg border border-white/30">
              Follow on Social Media
            </button>
          </div>
        </div>

        {/* Redirect Notice */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            You will be redirected to the homepage in <span className="font-bold text-green-700">{countdown}</span> seconds
          </p>
          <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 font-medium mt-4">
            <Home className="h-5 w-5 mr-2" />
            Go to Homepage Now
          </Link>
        </div>
      </div>
    </div>
  );
}