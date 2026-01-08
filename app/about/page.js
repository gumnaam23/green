"use client";

import { 
  Target, 
  Eye, 
  Users, 
  Award, 
  Shield, 
  Handshake, 
  Building, 
  Calendar,
  MapPin,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Heart,
  Trees
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const ngoDetails = {
    name: "GreenEarth Pakistan Initiative",
    tagline: "Planting Hope, Growing Futures",
    established: "2015",
    registration: "SECP Registration No: NGO-12345-2015",
    taxStatus: "Tax-exempt under Section 2(36) of Income Tax Ordinance, 2001",
    founder: "Dr. Ahmed Malik",
    executiveDirector: "Ms. Sarah Khan",
    boardMembers: 7,
    employees: 45,
    volunteers: 25000
  };

  const missionVision = {
    mission: {
      title: "Our Mission",
      description: "To combat climate change and environmental degradation in Pakistan through large-scale, scientifically-planned tree plantation drives, while empowering local communities and creating sustainable ecosystems.",
      points: [
        "Plant and nurture 10 million trees across Pakistan by 2030",
        "Create 100,000 green jobs in rural communities",
        "Restore 50,000 hectares of degraded forest land",
        "Reduce carbon emissions by 5 million tons annually",
        "Engage 1 million volunteers in environmental conservation"
      ]
    },
    vision: {
      title: "Our Vision",
      description: "A greener, healthier Pakistan where every citizen has access to clean air, sustainable forests, and a protected natural heritage for future generations.",
      points: [
        "Pakistan among top 10 countries in forest cover by 2050",
        "Carbon-neutral cities with urban forests in every district",
        "Thriving rural communities sustained by agroforestry",
        "Protected natural habitats with increased biodiversity",
        "Nationwide environmental consciousness and action"
      ]
    }
  };

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Integrity & Transparency",
      description: "Every rupee is accounted for, every tree is tracked, and all reports are publicly available."
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "Community First",
      description: "We work with communities, not for them. Local ownership ensures long-term sustainability."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Impact Driven",
      description: "We measure success by environmental impact, not just numbers. Quality over quantity."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Inclusive Partnership",
      description: "Collaborating with government, corporates, NGOs, and citizens for maximum impact."
    }
  ];

  const milestones = [
    { year: "2015", event: "Founded with a vision to green Pakistan", trees: 0 },
    { year: "2016", event: "First plantation drive in Margalla Hills", trees: 10000 },
    { year: "2017", event: "Expanded to 5 cities, reached 100K trees", trees: 100000 },
    { year: "2018", event: "Launched corporate partnership program", trees: 250000 },
    { year: "2019", event: "Reached 500K trees, won first national award", trees: 500000 },
    { year: "2020", event: "Pandemic response: distributed saplings", trees: 750000 },
    { year: "2021", event: "Crossed 1 million trees milestone", trees: 1000000 },
    { year: "2022", event: "Launched coastal mangrove restoration", trees: 1250000 },
    { year: "2023", event: "Expanded nationwide, 78 locations", trees: 1500000 },
    { year: "2024", event: "Target: 2 million trees", trees: 2000000 }
  ];

  const team = [
    { name: "Dr. Ahmed Malik", role: "Founder & Chairman", experience: "25+ years in environmental science", image: "AM" },
    { name: "Ms. Sarah Khan", role: "Executive Director", experience: "15+ years in NGO management", image: "SK" },
    { name: "Mr. Bilal Ahmed", role: "Operations Director", experience: "12+ years in project management", image: "BA" },
    { name: "Dr. Fatima Raza", role: "Chief Environmental Officer", experience: "20+ years in forestry", image: "FR" },
    { name: "Mr. Omar Farooq", role: "Finance Director", experience: "CPA with 18+ years experience", image: "OF" },
    { name: "Ms. Ayesha Noor", role: "Community Relations", experience: "10+ years in rural development", image: "AN" }
  ];

  const partners = [
    { type: "Government", organizations: ["Ministry of Climate Change", "Provincial Forest Departments", "Local Government Bodies"] },
    { type: "International", organizations: ["UN Environment Programme", "WWF Pakistan", "IUCN Pakistan"] },
    { type: "Corporate", organizations: ["Tech Solutions Ltd.", "EcoBank Pakistan", "GreenTech Industries", "20+ Corporate Partners"] },
    { type: "Educational", organizations: ["50+ Universities", "200+ Schools", "HEC Pakistan"] }
  ];

  const awards = [
    { year: "2023", title: "Best Environmental NGO", organization: "Pakistan Environmental Protection Agency" },
    { year: "2022", title: "Climate Action Award", organization: "UN Sustainable Development Goals Awards" },
    { year: "2021", title: "Green Innovation Award", organization: "South Asian Environmental Forum" },
    { year: "2020", title: "Community Impact Award", organization: "Pakistan CSR Awards" },
    { year: "2019", title: "Excellence in Forestry", organization: "Ministry of Climate Change" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-900 to-emerald-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-yellow-300">GreenEarth</span> Pakistan
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Leading Pakistan's largest community-driven tree plantation movement since {ngoDetails.established}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">{ngoDetails.volunteers.toLocaleString()}+</div>
                <div className="text-sm">Volunteers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">1.5M+</div>
                <div className="text-sm">Trees Planted</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">78</div>
                <div className="text-sm">Locations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">8+</div>
                <div className="text-sm">Years of Service</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 bg-white" id="mission">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-green-600 text-white p-3 rounded-lg mr-4">
                  <Target className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                {missionVision.mission.description}
              </p>
              <div className="space-y-4">
                {missionVision.mission.points.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg" id="vision">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
                  <Eye className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                {missionVision.vision.description}
              </p>
              <div className="space-y-4">
                {missionVision.vision.points.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <Star className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every tree we plant
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-green-600 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Journey - Timeline */}
      <div className="py-16 bg-white" id="journey">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to Pakistan's leading environmental NGO
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-500 to-emerald-500 hidden lg:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12'}`}>
                    <div className={`rounded-2xl p-8 shadow-lg ${index % 2 === 0 ? 'bg-green-50' : 'bg-blue-50'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`text-2xl font-bold ${index % 2 === 0 ? 'text-green-700' : 'text-blue-700'}`}>
                          {milestone.year}
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          {milestone.trees > 0 ? `${milestone.trees.toLocaleString()}+ trees` : 'Founded'}
                        </div>
                      </div>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                  
                  {/* Timeline node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-green-500 rounded-full z-10 hidden lg:flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="py-16 bg-gray-50" id="team">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Passionate experts driving Pakistan's environmental transformation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-4">
                      {member.image}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                      <p className="text-green-600 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{member.experience}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Active since {ngoDetails.established}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
            <p className="mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals who want to make a difference. 
              Join us in creating a greener Pakistan.
            </p>
            <Link 
              href="/careers" 
              className="inline-flex items-center bg-white text-green-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Career Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Our Partners */}
      <div className="py-16 bg-white" id="partners">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Collaborating with diverse organizations for maximum impact
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {partners.map((partner, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg mr-4 ${
                    partner.type === 'Government' ? 'bg-blue-100 text-blue-600' :
                    partner.type === 'International' ? 'bg-green-100 text-green-600' :
                    partner.type === 'Corporate' ? 'bg-purple-100 text-purple-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    <Building className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{partner.type} Partners</h3>
                </div>
                <ul className="space-y-3">
                  {partner.organizations.map((org, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <Handshake className="h-4 w-4 mr-3 text-gray-400" />
                      {org}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/partners" 
              className="inline-flex items-center text-green-700 hover:text-green-800 font-semibold text-lg"
            >
              Become a Partner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="py-16 bg-gradient-to-r from-green-50 to-emerald-50" id="awards">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Celebrating excellence in environmental conservation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="text-green-600 mb-4">
                  <Award className="h-12 w-12 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-green-700 mb-2">{award.year}</div>
                <h3 className="font-bold text-gray-900 mb-2">{award.title}</h3>
                <p className="text-gray-600 text-sm">{award.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-green-900 to-emerald-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Pakistanis who are actively creating a greener future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/donate" 
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg transition-colors flex items-center justify-center gap-2"
            >
              <Heart className="h-5 w-5" />
              Donate Now
            </Link>
            <Link 
              href="/volunteers" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors border-2 border-white/30"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}