"use client";

import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  Building,
  Users,
  Globe,
  Shield,
  CheckCircle,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  MessageSquare,
  Video,
  Mail as MailIcon,
  Calendar,
  User,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: '',
    subscribe: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactData = {
    organization: {
      name: "GreenEarth Pakistan Initiative",
      tagline: "Planting Hope, Growing Futures",
      registration: "SECP Registration No: NGO-12345-2015",
      taxStatus: "Tax-exempt under Section 2(36) of Income Tax Ordinance, 2001"
    },
    headquarters: {
      address: "Plot 123, Green Avenue, Sector G-10/4, Islamabad, Pakistan",
      coordinates: "33.6844° N, 73.0479° E",
      phone: "+92 51 1234567",
      whatsapp: "+92 300 1234567",
      email: "info@greenearth.pk",
      officeHours: "Monday to Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed"
    },
    regionalOffices: [
      {
        city: "Karachi",
        address: "Office 45, Green Tower, Clifton Road, Karachi",
        phone: "+92 21 9876543",
        email: "karachi@greenearth.pk",
        hours: "Mon-Fri: 9AM-5PM"
      },
      {
        city: "Lahore",
        address: "Suite 12, Environment Plaza, Main Boulevard, Lahore",
        phone: "+92 42 8765432",
        email: "lahore@greenearth.pk",
        hours: "Mon-Fri: 9AM-5PM"
      },
      {
        city: "Peshawar",
        address: "Office 8, Green Complex, University Road, Peshawar",
        phone: "+92 91 7654321",
        email: "peshawar@greenearth.pk",
        hours: "Mon-Fri: 9AM-5PM"
      }
    ],
    departments: [
      {
        name: "Donations & Funding",
        email: "donations@greenearth.pk",
        phone: "+92 51 1234567 Ext. 101",
        description: "For donation inquiries, corporate partnerships, and funding opportunities"
      },
      {
        name: "Volunteer Coordination",
        email: "volunteers@greenearth.pk",
        phone: "+92 51 1234567 Ext. 102",
        description: "For volunteer registration, training, and event coordination"
      },
      {
        name: "Media & Communications",
        email: "media@greenearth.pk",
        phone: "+92 51 1234567 Ext. 103",
        description: "For media inquiries, interviews, and press releases"
      },
      {
        name: "Corporate Partnerships",
        email: "partnerships@greenearth.pk",
        phone: "+92 51 1234567 Ext. 104",
        description: "For corporate CSR programs and strategic partnerships"
      }
    ],
    socialMedia: [
      { platform: "Facebook", handle: "@GreenEarthPK", icon: Facebook, url: "#", followers: "25K+" },
      { platform: "Twitter", handle: "@GreenEarth_PK", icon: Twitter, url: "#", followers: "15K+" },
      { platform: "Instagram", handle: "@greenearth.pk", icon: Instagram, url: "#", followers: "35K+" },
      { platform: "YouTube", handle: "GreenEarth Pakistan", icon: Youtube, url: "#", subscribers: "10K+" },
      { platform: "LinkedIn", handle: "GreenEarth Pakistan", icon: Linkedin, url: "#", followers: "5K+" }
    ],
    contactCategories: [
      { id: 'general', label: 'General Inquiry', icon: MessageCircle },
      { id: 'donation', label: 'Donation Related', icon: Users },
      { id: 'volunteer', label: 'Volunteer Inquiry', icon: Users },
      { id: 'corporate', label: 'Corporate Partnership', icon: Building },
      { id: 'media', label: 'Media Inquiry', icon: Globe },
      { id: 'complaint', label: 'Complaint/Suggestion', icon: Shield }
    ],
    faqs: [
      {
        question: "How can I verify the authenticity of GreenEarth Pakistan?",
        answer: "We are registered with SECP Pakistan (Registration No: NGO-12345-2015). You can verify our registration on the SECP website. We also publish annual audit reports conducted by PricewaterhouseCoopers Pakistan."
      },
      {
        question: "Are donations to GreenEarth tax-deductible?",
        answer: "Yes, all donations to GreenEarth Pakistan are tax-deductible under Section 2(36) of the Income Tax Ordinance, 2001. We provide tax certificates for all donations above PKR 5,000."
      },
      {
        question: "How quickly do you respond to inquiries?",
        answer: "We strive to respond to all inquiries within 24-48 hours during business days. Urgent matters are prioritized and typically receive responses within 4-6 hours."
      },
      {
        question: "Can I visit your offices?",
        answer: "Yes, our offices are open to visitors during office hours. We recommend scheduling an appointment in advance to ensure availability of relevant team members."
      }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'general',
        message: '',
        subscribe: true
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <MessageCircle className="h-16 w-16 mx-auto mb-8" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              We'd love to hear from you. Whether you have questions about our work, 
              want to volunteer, or are interested in partnerships, our team is here to help.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            {/* Headquarters */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Headquarters</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Address</div>
                    <div className="text-gray-600 text-sm mt-1">{contactData.headquarters.address}</div>
                    <div className="text-gray-500 text-xs mt-1">{contactData.headquarters.coordinates}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Phone Numbers</div>
                    <div className="text-gray-600 text-sm mt-1">{contactData.headquarters.phone}</div>
                    <div className="text-gray-600 text-sm">WhatsApp: {contactData.headquarters.whatsapp}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-600 text-sm mt-1">{contactData.headquarters.email}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Office Hours</div>
                    <div className="text-gray-600 text-sm mt-1 whitespace-pre-line">{contactData.headquarters.officeHours}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(contactData.headquarters.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-800 font-medium flex items-center"
                >
                  Get Directions
                  <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </div>
            </div>

            {/* Regional Offices */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Regional Offices</h2>
              
              <div className="space-y-6">
                {contactData.regionalOffices.map((office, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                    <div className="font-bold text-gray-900 mb-2">{office.city}</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{office.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{office.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{office.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{office.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Connect With Us</h2>
              
              <div className="space-y-4">
                {contactData.socialMedia.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-lg mr-4 group-hover:bg-green-50">
                          <Icon className="h-5 w-5 text-gray-600 group-hover:text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{social.platform}</div>
                          <div className="text-sm text-gray-500">{social.handle}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{social.followers}</div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Middle Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {/* Success Message */}
              {isSubmitted && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll respond to your inquiry within 24 hours.
                  </p>
                </div>
              )}

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {contactData.contactCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveTab(category.id);
                        setFormData(prev => ({ ...prev, category: category.id }));
                      }}
                      className={`flex items-center px-4 py-3 rounded-lg border transition-colors ${
                        activeTab === category.id
                          ? 'bg-green-100 border-green-300 text-green-700'
                          : 'border-gray-300 text-gray-700 hover:border-green-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {category.label}
                    </button>
                  );
                })}
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+92 XXX XXXXXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="What is this regarding?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="subscribe"
                    name="subscribe"
                    checked={formData.subscribe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 rounded"
                  />
                  <label htmlFor="subscribe" className="ml-3 text-sm text-gray-700">
                    Subscribe to our newsletter for updates on projects, events, and impact reports
                  </label>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-3" />
                        Send Message
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-sm text-gray-500 mt-4">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </form>
            </div>

            {/* Departments */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Specific Departments</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {contactData.departments.map((dept, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
                    <h3 className="font-bold text-gray-900 mb-3">{dept.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{dept.description}</p>
                    <div className="space-y-2">
                      <a 
                        href={`mailto:${dept.email}`}
                        className="flex items-center text-green-700 hover:text-green-800"
                      >
                        <MailIcon className="h-4 w-4 mr-2" />
                        {dept.email}
                      </a>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {dept.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Contact Methods */}
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {/* Live Chat */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl shadow-lg p-8 text-white">
            <MessageSquare className="h-12 w-12 mb-6" />
            <h3 className="text-xl font-bold mb-3">Live Chat Support</h3>
            <p className="opacity-90 mb-6">
              Chat with our support team in real-time for quick answers to your questions.
            </p>
            <button className="w-full bg-white text-green-700 font-bold py-3 rounded-lg hover:bg-gray-100">
              Start Live Chat
            </button>
            <div className="mt-4 text-sm opacity-80">
              Available: Mon-Fri, 9AM-5PM
            </div>
          </div>

          {/* Video Call */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg p-8 text-white">
            <Video className="h-12 w-12 mb-6" />
            <h3 className="text-xl font-bold mb-3">Schedule Video Call</h3>
            <p className="opacity-90 mb-6">
              Book a video meeting with our team for detailed discussions.
            </p>
            <button className="w-full bg-white text-blue-700 font-bold py-3 rounded-lg hover:bg-gray-100">
              <Calendar className="h-5 w-5 inline mr-2" />
              Book Appointment
            </button>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl shadow-lg p-8 text-white">
            <Phone className="h-12 w-12 mb-6" />
            <h3 className="text-xl font-bold mb-3">Emergency Contact</h3>
            <p className="opacity-90 mb-6">
              For urgent matters requiring immediate attention during non-business hours.
            </p>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">+92 300 1234567</div>
              <div className="text-sm opacity-80">24/7 Emergency Line</div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Common Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {contactData.faqs.slice(0, 2).map((faq, index) => (
                <div key={index}>
                  <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              {contactData.faqs.slice(2, 4).map((faq, index) => (
                <div key={index}>
                  <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <a 
              href="/faq"
              className="text-green-700 hover:text-green-800 font-medium flex items-center justify-center"
            >
              Visit FAQ Page for More Questions
              <ChevronRight className="h-5 w-5 ml-2" />
            </a>
          </div>
        </div>

        {/* Verification & Trust */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Verified & Trusted Organization</h2>
              <p className="text-gray-700 mb-6">
                GreenEarth Pakistan is a registered non-profit organization with complete transparency 
                and accountability. All our operations are regularly audited and publicly reported.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-3" />
                  <span>{contactData.organization.registration}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>{contactData.organization.taxStatus}</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 mt-6 lg:mt-0 lg:text-right">
              <button className="bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 font-bold py-3 px-8 rounded-lg">
                View Audit Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}