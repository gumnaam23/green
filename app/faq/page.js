"use client";

import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Filter,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Shield,
  CheckCircle,
  Users,
  DollarSign,
  Trees,
  MapPin,
  Calendar,
  Award,
  FileText,
  Download,
  Share2,
  Star,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFAQs, setExpandedFAQs] = useState([]);

  const faqData = {
    categories: [
      { id: 'general', name: 'General Questions', icon: HelpCircle, count: 8 },
      { id: 'donation', name: 'Donations & Funding', icon: DollarSign, count: 6 },
      { id: 'volunteer', name: 'Volunteering', icon: Users, count: 7 },
      { id: 'trees', name: 'Tree Plantation', icon: Trees, count: 5 },
      { id: 'transparency', name: 'Transparency', icon: Shield, count: 4 },
      { id: 'technical', name: 'Technical', icon: BookOpen, count: 3 },
    ],
    faqs: {
      general: [
        {
          question: "What is GreenEarth Pakistan and what do you do?",
          answer: "GreenEarth Pakistan is a registered non-profit organization dedicated to environmental conservation through large-scale tree plantation drives across Pakistan. We work with local communities, government bodies, and international partners to combat deforestation and climate change. Our mission is to plant and nurture 10 million trees across Pakistan by 2030.",
          tags: ["about", "mission", "organization"]
        },
        {
          question: "How can I verify that GreenEarth Pakistan is a legitimate organization?",
          answer: "We are registered with SECP Pakistan (Registration No: NGO-12345-2015). You can verify our registration on the SECP website. We also publish annual audit reports conducted by PricewaterhouseCoopers Pakistan. All our financial reports and impact assessments are publicly available on our website.",
          tags: ["verification", "legitimacy", "registration"]
        },
        {
          question: "Where does GreenEarth Pakistan operate?",
          answer: "We operate nationwide across all provinces of Pakistan. We have active plantation sites in 78 locations, including major cities like Islamabad, Karachi, Lahore, Peshawar, and Quetta, as well as rural and remote areas. Our projects span from urban forestry to coastal mangrove restoration and mountain reforestation.",
          tags: ["locations", "operations", "nationwide"]
        },
        {
          question: "How is GreenEarth Pakistan funded?",
          answer: "We are funded through individual donations, corporate partnerships, government grants, and international aid. We maintain complete financial transparency with 65% of funds allocated directly to plantation activities, 15% to community development, 10% to administration, 5% to fundraising, and 5% to research.",
          tags: ["funding", "finance", "transparency"]
        },
        {
          question: "How can I stay updated about your work?",
          answer: "You can stay updated by subscribing to our newsletter, following us on social media (@GreenEarthPK), visiting our website regularly for updates, or downloading our mobile app. We send monthly impact reports and regular project updates to all subscribers.",
          tags: ["updates", "newsletter", "social media"]
        },
        {
          question: "Can I visit your plantation sites?",
          answer: "Yes, we organize regular site visits for donors, partners, and interested individuals. You can schedule a visit through our website or contact our office. We recommend visiting during plantation seasons (monsoon and spring) for the best experience. Safety briefings and guides are provided.",
          tags: ["visits", "sites", "tours"]
        },
        {
          question: "How do you ensure long-term survival of planted trees?",
          answer: "We implement a comprehensive 3-year maintenance program that includes regular watering, weeding, pest control, and protection. Local community members are trained and employed as caretakers. We monitor survival rates through GPS tracking and regular site visits, achieving an average survival rate of 87.5%.",
          tags: ["maintenance", "survival", "monitoring"]
        },
        {
          question: "What species of trees do you plant?",
          answer: "We plant native species suitable for each ecosystem, including Neem, Kikar, Sheesham, Deodar, Mango, and various mangrove species. Species selection is based on scientific research, local conditions, and community needs. We prioritize species that provide maximum environmental benefits and livelihood opportunities.",
          tags: ["species", "native", "ecology"]
        }
      ],
      donation: [
        {
          question: "Are donations to GreenEarth Pakistan tax-deductible?",
          answer: "Yes, all donations to GreenEarth Pakistan are tax-deductible under Section 2(36) of the Income Tax Ordinance, 2001. We provide official tax certificates for all donations above PKR 5,000. The certificates are emailed within 7 working days of the donation.",
          tags: ["tax", "deductible", "certificate"]
        },
        {
          question: "How much does it cost to plant one tree?",
          answer: "It costs PKR 500 to plant and maintain one tree for three years. This includes the sapling, planting labor, regular watering, weeding, pest control, and monitoring. The cost also covers community training and impact reporting.",
          tags: ["cost", "per tree", "pricing"]
        },
        {
          question: "How can I donate to GreenEarth Pakistan?",
          answer: "You can donate through our website using credit/debit cards, bank transfer, JazzCash, EasyPaisa, or by visiting our offices. We also accept checks and cash donations. All payment methods are secure and provide instant confirmation.",
          tags: ["donation methods", "payment", "online"]
        },
        {
          question: "Can I donate in someone's name or as a gift?",
          answer: "Yes, we offer gift tree planting options. You can plant trees in honor of birthdays, anniversaries, weddings, or in memory of loved ones. We provide personalized certificates and regular updates on the gifted trees.",
          tags: ["gift", "memorial", "dedication"]
        },
        {
          question: "How are my donation funds allocated?",
          answer: "65% goes directly to plantation activities, 15% to community development, 10% to administration, 5% to fundraising, and 5% to research. Detailed financial reports are published quarterly on our website. Every rupee is accounted for and audited annually.",
          tags: ["allocation", "funds", "transparency"]
        },
        {
          question: "Can I get a refund for my donation?",
          answer: "Donations are generally non-refundable as they are immediately allocated to ongoing projects. However, if there has been an error in processing or if you have specific concerns, please contact our donations department within 7 days of the transaction.",
          tags: ["refund", "cancellation", "policy"]
        }
      ],
      volunteer: [
        {
          question: "Who can volunteer with GreenEarth Pakistan?",
          answer: "Anyone aged 16 and above can volunteer with us. Volunteers under 18 require guardian consent. We welcome individuals, students, professionals, corporate groups, and international volunteers. No prior experience is needed - we provide all necessary training.",
          tags: ["eligibility", "age", "requirements"]
        },
        {
          question: "What types of volunteer opportunities are available?",
          answer: "We offer various opportunities including tree plantation drives, community outreach, education programs, event management, photography, social media management, data entry, and remote volunteering. Opportunities range from one-day events to long-term commitments.",
          tags: ["opportunities", "roles", "types"]
        },
        {
          question: "Do I need any special skills or equipment to volunteer?",
          answer: "No special skills or equipment are required. We provide all necessary tools, safety gear, and training. However, if you have specific skills (photography, teaching, etc.), we can assign you to suitable roles. Just bring your enthusiasm and willingness to learn!",
          tags: ["skills", "equipment", "training"]
        },
        {
          question: "How do I register as a volunteer?",
          answer: "You can register through our website's volunteer portal, by visiting our offices, or by attending one of our orientation sessions. The registration process includes filling out a form, attending a brief orientation, and receiving volunteer ID. It typically takes 24-48 hours for approval.",
          tags: ["registration", "process", "portal"]
        },
        {
          question: "Are there remote volunteering opportunities?",
          answer: "Yes, we offer remote volunteering in areas like social media management, content writing, graphic design, data analysis, research, and virtual tutoring for environmental education programs. Remote volunteers receive the same recognition and certificates as on-site volunteers.",
          tags: ["remote", "online", "virtual"]
        },
        {
          question: "What benefits do volunteers receive?",
          answer: "Volunteers receive training certificates, skill development opportunities, networking, meals during events, transportation (if needed), and recognition through our volunteer awards program. Long-term volunteers may also receive references and recommendation letters.",
          tags: ["benefits", "recognition", "certificates"]
        },
        {
          question: "Can I volunteer as part of a corporate CSR program?",
          answer: "Absolutely! We have dedicated corporate volunteering programs with flexible scheduling, team-building activities, and comprehensive impact reporting. Contact our corporate partnerships team to design a customized program for your organization.",
          tags: ["corporate", "CSR", "teams"]
        }
      ],
      trees: [
        {
          question: "How do you select plantation locations?",
          answer: "Locations are selected based on scientific criteria including soil analysis, water availability, climate conditions, ecological significance, and community needs. We work with local authorities and environmental experts to identify areas with maximum impact potential.",
          tags: ["location selection", "sites", "criteria"]
        },
        {
          question: "What is the survival rate of your planted trees?",
          answer: "Our average survival rate is 87.5% - one of the highest in Pakistan. We achieve this through careful species selection, community involvement, and a comprehensive 3-year maintenance program that includes regular monitoring and care.",
          tags: ["survival rate", "success", "monitoring"]
        },
        {
          question: "How do you track and monitor planted trees?",
          answer: "Each tree is geotagged with GPS coordinates, photographed at planting, and monitored through regular site visits. We use a mobile app for data collection and maintain a digital database with growth records. Donors receive updates with photos and coordinates.",
          tags: ["tracking", "monitoring", "GPS"]
        },
        {
          question: "What happens if a planted tree dies?",
          answer: "If a tree dies within the 3-year maintenance period, we replace it at no additional cost. Our maintenance teams identify causes of mortality and take corrective measures. Replacement is part of our commitment to ensuring long-term survival.",
          tags: ["replacement", "mortality", "guarantee"]
        },
        {
          question: "How do you involve local communities in tree plantation?",
          answer: "We work closely with local communities from planning to implementation. Community members are involved in site selection, species choice, planting, and maintenance. We provide training and employment opportunities, ensuring long-term ownership and care.",
          tags: ["communities", "involvement", "participation"]
        }
      ],
      transparency: [
        {
          question: "How transparent is GreenEarth Pakistan with its finances?",
          answer: "We maintain complete financial transparency. All our financial reports are published quarterly on our website, including income statements, balance sheets, and audit reports. We undergo annual audits by PricewaterhouseCoopers Pakistan and make all reports publicly available.",
          tags: ["financial transparency", "audits", "reports"]
        },
        {
          question: "Can I see exactly where my donated money is spent?",
          answer: "Yes, donors receive detailed reports showing exactly how their funds were used. For tree donations, you receive GPS coordinates, photos, and regular updates. For larger donations, we provide customized impact reports with specific project details.",
          tags: ["track donations", "impact reports", "accountability"]
        },
        {
          question: "Who audits GreenEarth Pakistan's finances?",
          answer: "Our finances are audited annually by PricewaterhouseCoopers Pakistan, one of the world's leading audit firms. Audit reports are published on our website and submitted to regulatory authorities. We also have internal audit controls and a transparent governance structure.",
          tags: ["auditors", "PwC", "governance"]
        },
        {
          question: "How do you measure and report environmental impact?",
          answer: "We measure impact through scientific methods including carbon sequestration calculations, biodiversity assessments, water conservation metrics, and community surveys. Impact reports are published annually and include third-party verification where applicable.",
          tags: ["impact measurement", "metrics", "reporting"]
        }
      ],
      technical: [
        {
          question: "How do I access my donor portal or volunteer dashboard?",
          answer: "You can access your portal by logging into our website with your registered email and password. If you've forgotten your password, use the 'Forgot Password' link. For technical issues, contact our support team at support@greenearth.pk.",
          tags: ["portal", "login", "technical support"]
        },
        {
          question: "Is the donation payment gateway secure?",
          answer: "Yes, we use industry-standard SSL encryption and PCI-DSS compliant payment processors. All transactions are secure and your financial information is never stored on our servers. We also offer multiple secure payment options for your convenience.",
          tags: ["security", "payment", "encryption"]
        },
        {
          question: "How do I update my contact information or preferences?",
          answer: "Log into your account portal, go to 'My Profile', and update your information. Changes are reflected immediately. For assistance, contact our support team. You can also update communication preferences to control what updates you receive.",
          tags: ["profile", "updates", "preferences"]
        }
      ]
    },
    popularFAQs: [
      {
        question: "How can I verify my trees were actually planted?",
        answer: "We provide GPS coordinates, planting photos, and regular growth updates for every tree. You can also visit the site or request a video verification. All plantation data is publicly verifiable through our online portal.",
        category: "trees"
      },
      {
        question: "What percentage of my donation goes to actual tree plantation?",
        answer: "65% of every donation goes directly to tree plantation activities. The remaining covers maintenance (20%), community development (10%), and operational costs (5%). This allocation ensures sustainable impact.",
        category: "donation"
      },
      {
        question: "Can I choose where my trees are planted?",
        answer: "Yes, you can select from our active plantation sites across Pakistan. During donation, you'll see available locations and can choose based on your preference. We recommend locations based on maximum environmental impact.",
        category: "trees"
      },
      {
        question: "How long does it take to receive tax certificate?",
        answer: "Tax certificates are emailed within 7 working days of donation. For urgent requests, contact our donations team. Certificates are valid for tax filing and include all required details for Pakistani tax authorities.",
        category: "donation"
      }
    ]
  };

  const toggleFAQ = (category, index) => {
    const key = `${category}-${index}`;
    setExpandedFAQs(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const filteredFAQs = faqData.faqs[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const allFAQs = Object.values(faqData.faqs).flat();
  const searchResults = allFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const isSearching = searchQuery.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <HelpCircle className="h-16 w-16 mx-auto mb-8" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Find answers to common questions about our work, donations, volunteering, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for questions, topics, or keywords..."
              className="w-full pl-14 pr-6 py-4 text-lg border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-4 text-sm text-gray-600">
              Found {searchResults.length} results for "{searchQuery}"
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Browse by Category</h2>
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {faqData.categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setSearchQuery('');
                  }}
                  className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all ${
                    activeCategory === category.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`h-8 w-8 mb-3 ${
                    activeCategory === category.id ? 'text-green-600' : 'text-gray-600'
                  }`} />
                  <span className={`font-medium text-sm text-center ${
                    activeCategory === category.id ? 'text-green-700' : 'text-gray-700'
                  }`}>
                    {category.name}
                  </span>
                  <span className="text-xs text-gray-500 mt-2">{category.count} questions</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Popular FAQs */}
        {!isSearching && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Most Popular Questions</h2>
              <div className="flex items-center text-green-600">
                <Star className="h-5 w-5 mr-2" />
                Frequently Asked
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {faqData.popularFAQs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-4">
                    <div className="bg-green-100 text-green-600 p-2 rounded-lg mr-4">
                      <HelpCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{faq.answer.substring(0, 120)}...</p>
                  <button
                    onClick={() => {
                      setActiveCategory(faq.category);
                      // Find the exact FAQ in the category and expand it
                      const faqIndex = faqData.faqs[faq.category].findIndex(f => f.question === faq.question);
                      if (faqIndex !== -1) {
                        toggleFAQ(faq.category, faqIndex);
                      }
                    }}
                    className="mt-4 text-green-700 hover:text-green-800 font-medium text-sm flex items-center"
                  >
                    Read full answer
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {isSearching ? 'Search Results' : `${faqData.categories.find(c => c.id === activeCategory)?.name} Questions`}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Download className="h-5 w-5 mr-2" />
                Download FAQs
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {(isSearching ? searchResults : filteredFAQs).map((faq, index) => {
              const key = isSearching ? `search-${index}` : `${activeCategory}-${index}`;
              const isExpanded = expandedFAQs.includes(key);
              
              return (
                <div key={key} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(isSearching ? 'search' : activeCategory, index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50"
                  >
                    <div className="flex items-start">
                      <div className="bg-green-100 text-green-600 p-2 rounded-lg mr-4">
                        <HelpCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">{faq.question}</h3>
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.map((tag, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="px-8 pb-6">
                      <div className="pl-14">
                        <div className="prose prose-green max-w-none">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="flex flex-wrap gap-4">
                            <button className="flex items-center text-green-700 hover:text-green-800">
                              <MessageCircle className="h-5 w-5 mr-2" />
                              Still have questions?
                            </button>
                            <button className="flex items-center text-gray-600 hover:text-gray-900">
                              <Share2 className="h-5 w-5 mr-2" />
                              Share this answer
                            </button>
                            <button className="flex items-center text-gray-600 hover:text-gray-900">
                              <FileText className="h-5 w-5 mr-2" />
                              Save for later
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            
            {isSearching && searchResults.length === 0 && (
              <div className="px-8 py-12 text-center">
                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  We couldn't find any questions matching "{searchQuery}". Try different keywords or browse by category.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl shadow-lg p-8 text-white">
            <MessageCircle className="h-12 w-12 mb-6" />
            <h3 className="text-xl font-bold mb-3">Contact Support</h3>
            <p className="opacity-90 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <button className="w-full bg-white text-green-700 font-bold py-3 rounded-lg hover:bg-gray-100">
              Contact Us
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg p-8 text-white">
            <Phone className="h-12 w-12 mb-6" />
            <h3 className="text-xl font-bold mb-3">Call Us</h3>
            <p className="opacity-90 mb-6">
              Speak directly with our team for immediate assistance.
            </p>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">+92 51 1234567</div>
              <div className="text-sm opacity-80">Mon-Fri, 9AM-6PM</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-8 text-white">
            <Mail className="h-12 w-12 mb-6" />
            <h3 className="text-xl font-bold mb-3">Email Us</h3>
            <p className="opacity-90 mb-6">
              Send us your questions and we'll respond within 24 hours.
            </p>
            <div className="text-center">
              <div className="text-xl font-bold mb-2">help@greenearth.pk</div>
              <div className="text-sm opacity-80">24/7 Email Support</div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Links</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <a href="/donate" className="group">
              <div className="bg-green-50 rounded-lg p-6 text-center group-hover:bg-green-100 transition-colors">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-4" />
                <div className="font-medium text-gray-900">Donate Now</div>
              </div>
            </a>
            
            <a href="/volunteers" className="group">
              <div className="bg-blue-50 rounded-lg p-6 text-center group-hover:bg-blue-100 transition-colors">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <div className="font-medium text-gray-900">Volunteer</div>
              </div>
            </a>
            
            <a href="/trees" className="group">
              <div className="bg-emerald-50 rounded-lg p-6 text-center group-hover:bg-emerald-100 transition-colors">
                <Trees className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
                <div className="font-medium text-gray-900">View Trees</div>
              </div>
            </a>
            
            <a href="/contact" className="group">
              <div className="bg-purple-50 rounded-lg p-6 text-center group-hover:bg-purple-100 transition-colors">
                <Phone className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                <div className="font-medium text-gray-900">Contact Us</div>
              </div>
            </a>
          </div>
        </div>

        {/* Feedback */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Was this helpful?</h2>
              <p className="text-gray-700 mb-6">
                Help us improve our FAQ section by letting us know if you found what you were looking for.
              </p>
              <div className="flex space-x-4">
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Yes, this helped
                </button>
                <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  No, I need more help
                </button>
              </div>
            </div>
            <div className="lg:w-1/3 mt-6 lg:mt-0 lg:text-right">
              <div className="inline-flex flex-col items-center bg-white rounded-lg p-6 shadow">
                <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                <div className="text-sm text-gray-600">Last updated: January 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}