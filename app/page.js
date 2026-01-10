"use client";

import { 
  Trees, 
  Droplets, 
  Users, 
  MapPin, 
  ArrowRight, 
  CheckCircle,
  Star,
  Leaf,
  Shield,
  Award,
  Heart,
  TrendingUp,
  Calendar,
  Target,
  Clock,
  DollarSign,
  Globe,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Map,
  CloudRain,
  ThermometerSun,
  Wind,
  Sun,
  Moon,
  Cloud,
  Zap,
  ShieldCheck,
  FileText,
  PieChart,
  BarChart3,
  LineChart,
  Download,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Home,
  Info,
  HelpCircle,
  MessageCircle,
  Send,
  ThumbsUp,
  Share,
  Bookmark,
  Camera,
  Video,
  Mic,
  Headphones,
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Grid,
  List,
  Layout,
  Sidebar,
  Columns,
  Rows,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Bluetooth,
  Battery,
  Power,
  Key,
  Fingerprint,
  QrCode,
  CreditCard,
  Wallet,
  Receipt,
  Tag,
  Percent,
  Gift,
  Truck,
  Package,
  ShoppingCart,
  Store,
  Building,
Trophy 
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(500);
  const [treeCount, setTreeCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);



  const data = {
    statistics: {
      totalTrees: 1_254_803,
      totalTreesTarget: 10_000_000,
      treesThisMonth: 45_672,
      treesThisYear: 548_912,
      totalFunds: 452_750_000,
      fundsThisMonth: 12_450_000,
      fundsThisYear: 98_560_000,
      pendingTasks: 42,
      completedProjects: 156,
      activeVolunteers: 15_672,
      totalVolunteers: 25_891,
      waterSaved: 125_480_000,
      co2Absorbed: 62_740_000,
      locationsActive: 78,
      locationsPlanned: 23,
      survivalRate: 87.5,
      communitiesImpacted: 245,
      jobsCreated: 1_234,
      schoolsInvolved: 156,
      corporatePartners: 24,
      governmentProjects: 15
    },
    realTimeUpdates: {
      treesToday: 1_245,
      donationsToday: 67,
      volunteersToday: 89,
      activePlantations: 12
    },
    recentDonations: [
      { id: 1, name: "Ahmed Raza", amount: 5000, date: "2024-01-15T10:30:00Z", trees: 10, type: "individual", city: "Islamabad", anonymous: false },
      { id: 2, name: "Fatima Khan", amount: 1000, date: "2024-01-14T14:20:00Z", trees: 2, type: "individual", city: "Karachi", anonymous: false },
      { id: 3, name: "Karim Ullah", amount: 25000, date: "2024-01-14T09:15:00Z", trees: 50, type: "individual", city: "Lahore", anonymous: false },
      { id: 4, name: "Sana Shah", amount: 500, date: "2024-01-13T16:45:00Z", trees: 1, type: "individual", city: "Rawalpindi", anonymous: false },
      { id: 5, name: "Tech Solutions Ltd.", amount: 1000000, date: "2024-01-12T11:00:00Z", trees: 2000, type: "corporate", city: "Karachi", anonymous: false },
      { id: 6, name: "Anonymous", amount: 50000, date: "2024-01-11T13:30:00Z", trees: 100, type: "individual", city: "Unknown", anonymous: true },
      { id: 7, name: "Pakistan International School", amount: 25000, date: "2024-01-10T15:20:00Z", trees: 50, type: "educational", city: "Dubai", anonymous: false },
      { id: 8, name: "Dr. Ali Hassan", amount: 100000, date: "2024-01-09T09:45:00Z", trees: 200, type: "individual", city: "Islamabad", anonymous: false }
    ],
    featuredLocations: [
      { 
        id: 1, 
        name: "Margalla Hills National Park", 
        trees: 150_000, 
        status: "active", 
        type: "forest", 
        province: "Punjab",
        coordinates: "33.6844° N, 73.0479° E",
        startDate: "2018-03-15",
        completion: 85,
        species: ["Chir Pine", "Kail", "Deodar", "Oak"],
        images: 45,
        volunteers: 2500,
        impact: "Reduced soil erosion by 60%, increased biodiversity by 40%"
      },
      { 
        id: 2, 
        name: "Changa Manga Forest", 
        trees: 250_000, 
        status: "active", 
        type: "forest", 
        province: "Punjab",
        coordinates: "31.0833° N, 73.9167° E",
        startDate: "2017-06-01",
        completion: 92,
        species: ["Sheesham", "Neem", "Kikar", "Bamboo"],
        images: 67,
        volunteers: 3500,
        impact: "Revived one of Asia's largest man-made forests"
      },
      { 
        id: 3, 
        name: "Karachi Coastal Mangroves", 
        trees: 80_000, 
        status: "active", 
        type: "mangrove", 
        province: "Sindh",
        coordinates: "24.8607° N, 67.0011° E",
        startDate: "2019-08-20",
        completion: 75,
        species: ["Avicennia marina", "Rhizophora mucronata"],
        images: 89,
        volunteers: 1800,
        impact: "Protected 15km coastline, increased marine life by 35%"
      },
      { 
        id: 4, 
        name: "Lahore Urban Green Belt", 
        trees: 120_000, 
        status: "active", 
        type: "urban", 
        province: "Punjab",
        coordinates: "31.5497° N, 74.3436° E",
        startDate: "2020-01-10",
        completion: 88,
        species: ["Neem", "Amaltas", "Gulmohar", "Jacaranda"],
        images: 120,
        volunteers: 4200,
        impact: "Reduced urban heat island effect by 2°C"
      },
      { 
        id: 5, 
        name: "Swat Valley Reforestation", 
        trees: 180_000, 
        status: "planned", 
        type: "forest", 
        province: "KPK",
        coordinates: "35.2251° N, 72.4251° E",
        startDate: "2024-03-01",
        completion: 0,
        species: ["Deodar", "Spruce", "Walnut", "Apple"],
        images: 0,
        volunteers: 0,
        impact: "Expected to restore 5000 hectares of degraded forest"
      },
      { 
        id: 6, 
        name: "Thar Desert Greening", 
        trees: 50_000, 
        status: "active", 
        type: "desert", 
        province: "Sindh",
        coordinates: "24.5775° N, 70.8206° E",
        startDate: "2021-07-15",
        completion: 65,
        species: ["Acacia", "Prosopis", "Date Palm", "Neem"],
        images: 56,
        volunteers: 1200,
        impact: "Reduced desertification, provided livelihood to 500 families"
      }
    ],
    testimonials: [
      { 
        id: 1, 
        name: "Ali Hassan", 
        role: "Regular Donor for 3 years", 
        city: "Karachi",
        content: "I've been donating to GreenEarth for 3 years now. The transparency and regular updates are exceptional. I receive monthly reports with photos and GPS coordinates of my trees. This level of accountability is rare and deeply appreciated.", 
        rating: 5,
        donationAmount: 25000,
        treesDonated: 50,
        date: "2024-01-10"
      },
      { 
        id: 2, 
        name: "Dr. Sarah Ahmed", 
        role: "Environmental Scientist", 
        city: "Islamabad",
        content: "As an environmental scientist, I'm particular about where I contribute. GreenEarth's scientific approach to plantation, species selection, and maintenance is impressive. Their urban forestry projects are making a measurable difference in air quality.", 
        rating: 5,
        donationAmount: 50000,
        treesDonated: 100,
        date: "2024-01-05"
      },
      { 
        id: 3, 
        name: "Rizwan Malik", 
        role: "CSR Head - Tech Solutions Ltd.", 
        city: "Lahore",
        content: "Our company partnered with GreenEarth for our CSR initiatives. The professionalism, execution, and reporting exceeded our expectations. We've planted 2000 trees through them and will continue our partnership. Their impact measurement is top-notch.", 
        rating: 4,
        donationAmount: 1000000,
        treesDonated: 2000,
        date: "2024-01-12"
      },
      { 
        id: 4, 
        name: "Ayesha Bibi", 
        role: "Local Volunteer & Community Leader", 
        city: "Swat",
        content: "Volunteering with GreenEarth changed my life and my community. They don't just plant trees; they train locals, provide employment, and ensure long-term sustainability. Our valley is greener, and our children have a better future.", 
        rating: 5,
        donationAmount: 0,
        treesDonated: 500,
        date: "2024-01-08"
      },
      { 
        id: 5, 
        name: "Major (R) Tariq Mahmood", 
        role: "Retired Army Officer", 
        city: "Rawalpindi",
        content: "I've dedicated my retirement to environmental causes. GreenEarth is the most organized NGO I've worked with. Their military-like precision in planning and execution is remarkable. Every rupee is accounted for.", 
        rating: 5,
        donationAmount: 100000,
        treesDonated: 200,
        date: "2024-01-03"
      },
      { 
        id: 6, 
        name: "Maria Khan", 
        role: "University Student", 
        city: "Peshawar",
        content: "As part of my university's environmental club, we volunteer with GreenEarth. Their training programs are excellent, and they make complex environmental concepts accessible. I've learned so much while making a real impact.", 
        rating: 5,
        donationAmount: 5000,
        treesDonated: 10,
        date: "2024-01-15"
      }
    ],
    howItWorks: [
      { 
        step: 1, 
        title: "Select Contribution Method", 
        desc: "Choose between one-time donation, monthly subscription, corporate partnership, or volunteer registration. Select the number of trees or specific amount you wish to contribute.",
        icon: "target",
        details: [
          "PKR 500 per tree (includes 1-year maintenance)",
          "Monthly subscriptions start from PKR 1000/month",
          "Corporate packages available",
          "Gift trees option available"
        ]
      },
      { 
        step: 2, 
        title: "Site Selection & Planning", 
        desc: "Our experts select appropriate locations based on soil analysis, climate conditions, and community needs. We choose native species suitable for each ecosystem.",
        icon: "map",
        details: [
          "GPS coordinates mapping",
          "Soil testing and analysis",
          "Native species selection",
          "Community consultation"
        ]
      },
      { 
        step: 3, 
        title: "Plantation & Documentation", 
        desc: "Trained volunteers and local community members plant trees under expert supervision. Each tree is geotagged and photographed for documentation.",
        icon: "trees",
        details: [
          "Geotagging with GPS coordinates",
          "High-resolution photos",
          "Plantation certificate",
          "Unique tree ID assignment"
        ]
      },
      { 
        step: 4, 
        title: "Nurturing & Maintenance", 
        desc: "Regular watering, weeding, and protection for first 3 years. Local caretakers are trained and employed for ongoing maintenance.",
        icon: "droplets",
        details: [
          "Regular watering schedule",
          "Pest and disease control",
          "Soil nutrient management",
          "Protection from grazing"
        ]
      },
      { 
        step: 5, 
        title: "Monitoring & Reporting", 
        desc: "Monthly progress updates with photos, growth measurements, and impact metrics. Annual comprehensive reports on survival rates and environmental impact.",
        icon: "trending",
        details: [
          "Monthly photo updates",
          "Growth measurement data",
          "Survival rate tracking",
          "Environmental impact metrics"
        ]
      },
      { 
        step: 6, 
        title: "Impact Assessment & Community Development", 
        desc: "Annual assessment of environmental and social impact. Community development programs and livelihood opportunities creation.",
        icon: "report",
        details: [
          "CO2 absorption calculations",
          "Biodiversity impact assessment",
          "Community employment reports",
          "Educational programs"
        ]
      }
    ],
    environmentalImpact: {
      co2AbsorbedPerTree: 20, // kg per year
      oxygenProducedPerTree: 118, // kg per year
      waterFilteredPerTree: 100, // liters per year
      soilErosionPrevention: 95, // percentage
      biodiversityIncrease: 35, // percentage
      temperatureReduction: 2, // degrees Celsius in urban areas
      airPollutionReduction: 15, // percentage
      groundwaterRecharge: 25 // percentage increase
    },
    upcomingEvents: [
      {
        id: 1,
        title: "Mega Plantation Drive - Sindh Coast",
        date: "2024-02-15",
        location: "Karachi Coastal Areas",
        target: 50000,
        volunteersNeeded: 1000,
        status: "registration-open",
        description: "Large-scale mangrove plantation to protect coastal areas from sea intrusion"
      },
      {
        id: 2,
        title: "Urban Forestry Workshop",
        date: "2024-01-25",
        location: "Lahore",
        target: 5000,
        volunteersNeeded: 200,
        status: "upcoming",
        description: "Training session on urban tree plantation and maintenance"
      },
      {
        id: 3,
        title: "Corporate Volunteering Day",
        date: "2024-02-05",
        location: "Islamabad",
        target: 10000,
        volunteersNeeded: 500,
        status: "registration-open",
        description: "Special plantation drive for corporate partners and their employees"
      },
      {
        id: 4,
        title: "School Green Initiative",
        date: "2024-02-20",
        location: "Multiple Cities",
        target: 25000,
        volunteersNeeded: 2000,
        status: "planning",
        description: "Tree plantation in school campuses across Pakistan"
      }
    ],
    financialTransparency: {
      lastAuditDate: "2023-12-31",
      auditFirm: "PricewaterhouseCoopers Pakistan",
      allocation: {
        plantation: 65,
        communityDevelopment: 15,
        administration: 10,
        fundraising: 5,
        research: 5
      },
      documents: [
        "Annual Report 2023",
        "Financial Statements 2023",
        "Audit Report 2023",
        "Tax Returns 2023"
      ]
    },
    speciesPlanted: [
      { name: "Neem", count: 250000, native: true, benefits: ["Air purification", "Medicinal properties"] },
      { name: "Kikar", count: 180000, native: true, benefits: ["Drought resistant", "Soil improvement"] },
      { name: "Sheesham", count: 150000, native: true, benefits: ["Timber quality", "Nitrogen fixation"] },
      { name: "Deodar", count: 120000, native: true, benefits: ["High altitude growth", "Carbon sequestration"] },
      { name: "Mango", count: 80000, native: true, benefits: ["Fruit production", "Livelihood support"] },
      { name: "Avicennia", count: 80000, native: true, benefits: ["Coastal protection", "Marine habitat"] }
    ]
  };






  {/* Hero Banner Component */}
  const HeroBanner = () => (
    <div className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Floating leaves */}
      <div className="absolute top-10 left-10 animate-float">
        <Leaf className="h-8 w-8 text-green-300 opacity-50" />
      </div>
      <div className="absolute top-20 right-20 animate-float animation-delay-1000">
        <Leaf className="h-6 w-6 text-emerald-300 opacity-40" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-float animation-delay-2000">
        <Leaf className="h-10 w-10 text-teal-300 opacity-30" />
      </div>
      
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="text-sm font-medium">Trusted by 25,000+ Pakistanis</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Plant Trees.
              <span className="block text-yellow-300 mt-2">Save Pakistan.</span>
              <span className="block text-green-200 text-3xl md:text-4xl mt-4">One Tree at a Time</span>
            </h1>
            
            <p className="text-xl text-green-100 mb-8 max-w-2xl">
              Join Pakistan's largest community-driven tree plantation movement. 
              Every tree you plant fights climate change, creates jobs, and secures our children's future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                href="/donate" 
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Heart className="h-6 w-6" />
                <span>Plant Your Tree Now</span>
                <ArrowRight className="h-6 w-6" />
              </Link>
              <Link 
                href="/volunteers" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 border-2 border-white/30"
              >
                Join as Volunteer
              </Link>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-green-300" />
                <span>100% Transparency</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Geotagged Trees</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-green-300" />
                <span>Monthly Reports</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Quick Plantation</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Number of Trees</label>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 5, 10, 50, 100, 200].map((count) => (
                    <button
                      key={count}
                      onClick={() => {
                        setTreeCount(count);
                        setDonationAmount(count * 500);
                      }}
                      className={`py-3 rounded-lg border-2 transition-all ${treeCount === count ? 'bg-green-500 border-green-500 text-white' : 'border-white/30 hover:border-green-500'}`}
                    >
                      {count} Tree{count > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Or Enter Custom Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300">PKR</span>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setDonationAmount(value);
                      setTreeCount(Math.floor(value / 500));
                    }}
                    className="w-full pl-16 pr-4 py-3 bg-white/5 border border-white/30 rounded-lg text-white text-lg"
                    min="500"
                    step="500"
                  />
                </div>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span>Trees to Plant:</span>
                  <span className="font-bold">{treeCount}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>CO₂ to Absorb:</span>
                  <span className="font-bold">{treeCount * 20} kg/year</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Impact:</span>
                  <span className="font-bold text-yellow-300">PKR {donationAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Continue to Plant
              </button>
              
              <p className="text-center text-sm text-green-200 mt-4">
                Secure payment • Tax deductible • Certificate provided
              </p>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 rounded-xl p-4 shadow-2xl">
              <div className="text-2xl font-bold text-green-600">1.25M+</div>
              <div className="text-sm">Trees Planted</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white text-gray-900 rounded-xl p-4 shadow-2xl">
              <div className="text-2xl font-bold text-green-600">87.5%</div>
              <div className="text-sm">Survival Rate</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
  );

  {/* Real-time Statistics Component */}
  const RealTimeStats = () => (
    <div className="bg-gradient-to-r from-gray-50 to-white py-12 -mt-1">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Impact in Real-time
              </h2>
              <p className="text-gray-600">
                Live statistics of our ongoing plantation efforts across Pakistan
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Live Updates</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm">Updated every hour</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <Trees className="h-8 w-8 text-green-600" />
                <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Today
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {data.realTimeUpdates.treesToday.toLocaleString()}
              </div>
              <div className="text-gray-600 text-sm">Trees Planted</div>
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <Heart className="h-8 w-8 text-blue-600" />
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Today
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {data.realTimeUpdates.donationsToday}
              </div>
              <div className="text-gray-600 text-sm">Donations Received</div>
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: '60%' }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-orange-600" />
                <span className="text-xs font-medium bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  Today
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {data.realTimeUpdates.volunteersToday}
              </div>
              <div className="text-gray-600 text-sm">Active Volunteers</div>
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <MapPin className="h-8 w-8 text-purple-600" />
                <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {data.realTimeUpdates.activePlantations}
              </div>
              <div className="text-gray-600 text-sm">Ongoing Plantations</div>
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: '90%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Overall Progress */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Overall Progress Towards 10 Million Trees Goal
            </h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{data.statistics.totalTrees.toLocaleString()} trees planted</span>
                <span>{data.statistics.totalTreesTarget.toLocaleString()} target</span>
              </div>
              <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                  style={{ width: `${(data.statistics.totalTrees / data.statistics.totalTreesTarget) * 100}%` }}
                ></div>
              </div>
              <div className="text-right mt-2 text-sm text-gray-600">
                {((data.statistics.totalTrees / data.statistics.totalTreesTarget) * 100).toFixed(1)}% Complete
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{data.statistics.treesThisMonth.toLocaleString()}</div>
                <div className="text-gray-600">Trees This Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{data.statistics.treesThisYear.toLocaleString()}</div>
                <div className="text-gray-600">Trees This Year</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{data.statistics.survivalRate}%</div>
                <div className="text-gray-600">Average Survival Rate</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link 
              href="/trees" 
              className="inline-flex items-center text-green-700 hover:text-green-800 font-semibold text-lg"
            >
              View Detailed Analytics Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  {/* Environmental Impact Calculator Component */}
  const ImpactCalculator = () => {
    const [customTrees, setCustomTrees] = useState(10);
    
    const calculateImpact = (trees) => ({
      co2: trees * data.environmentalImpact.co2AbsorbedPerTree,
      oxygen: trees * data.environmentalImpact.oxygenProducedPerTree,
      water: trees * data.environmentalImpact.waterFilteredPerTree,
      equivalent: (trees * data.environmentalImpact.co2AbsorbedPerTree) / 1000
    });
    
    const impact = calculateImpact(customTrees);
    
    return (
      <div className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Calculate Your Environmental Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See the difference your trees will make in fighting climate change
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Your Impact Calculator
              </h3>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  How many trees would you like to plant?
                </label>
                <div className="flex items-center space-x-4 mb-6">
                  <button 
                    onClick={() => setCustomTrees(Math.max(1, customTrees - 1))}
                    className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="1"
                      max="1000"
                      value={customTrees}
                      onChange={(e) => setCustomTrees(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <button 
                    onClick={() => setCustomTrees(customTrees + 1)}
                    className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-600 mb-2">{customTrees}</div>
                  <div className="text-gray-600">Trees Selected</div>
                  <div className="text-lg font-semibold text-gray-700 mt-2">
                    PKR {(customTrees * 500).toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[1, 5, 10, 50, 100, 500].map((count) => (
                  <button
                    key={count}
                    onClick={() => setCustomTrees(count)}
                    className={`py-3 rounded-lg border-2 transition-all ${customTrees === count ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 hover:border-green-500'}`}
                  >
                    {count} Trees
                  </button>
                ))}
              </div>
              
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Plant {customTrees} Tree{customTrees > 1 ? 's' : ''} Now
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-green-900 to-emerald-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Your Annual Environmental Impact</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <Cloud className="h-10 w-10 text-green-300" />
                    <div>
                      <div className="text-2xl font-bold">{impact.co2.toLocaleString()} kg</div>
                      <div className="text-green-200">CO₂ Absorbed</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg">Equivalent to</div>
                    <div className="text-xl font-bold">{impact.equivalent.toFixed(1)} tons</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <Wind className="h-10 w-10 text-green-300" />
                    <div>
                      <div className="text-2xl font-bold">{impact.oxygen.toLocaleString()} kg</div>
                      <div className="text-green-200">Oxygen Produced</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg">Enough for</div>
                    <div className="text-xl font-bold">{Math.floor(impact.oxygen / 550)} people/year</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <Droplets className="h-10 w-10 text-green-300" />
                    <div>
                      <div className="text-2xl font-bold">{impact.water.toLocaleString()} L</div>
                      <div className="text-green-200">Water Filtered</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg">Equivalent to</div>
                    <div className="text-xl font-bold">{Math.floor(impact.water / 150)} families</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/10 rounded-xl">
                    <ThermometerSun className="h-8 w-8 text-yellow-300 mb-2" />
                    <div className="text-lg font-bold">Temperature</div>
                    <div className="text-green-200">Reduced by 0.{customTrees}°C locally</div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl">
                    <CloudRain className="h-8 w-8 text-blue-300 mb-2" />
                    <div className="text-lg font-bold">Rainfall</div>
                    <div className="text-green-200">Increased by {customTrees * 0.5}% locally</div>
                  </div>
                </div>
                
                <div className="text-center text-green-200">
                  <div className="text-sm">Based on 20-year lifespan of each tree</div>
                  <div className="text-xs opacity-75 mt-1">*Calculations based on scientific research</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full">
              <Info className="h-5 w-5" />
              <span>
                <span className="font-bold">{data.statistics.totalTrees.toLocaleString()}</span> trees already planted are absorbing 
                <span className="font-bold"> {Math.floor(data.statistics.co2Absorbed / 1000).toLocaleString()} tons</span> of CO₂ annually
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  {/* How It Works Process Component */}
  const ProcessSection = () => (
    <div className="py-16 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Proven 6-Step Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From donation to flourishing forest - see how we ensure every tree thrives
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-500 to-emerald-500 hidden lg:block"></div>
          
          <div className="space-y-12 lg:space-y-0">
            {data.howItWorks.map((step, index) => (
              <div 
                key={step.step} 
                className={`relative flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12'}`}>
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        <div className="flex items-center space-x-2 text-green-600">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">Step {step.step} of 6</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{step.desc}</p>
                    
                    <div className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                    
                    {step.step === 3 && (
                      <div className="mt-6 bg-green-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-green-700">
                          <Camera className="h-5 w-5" />
                          <span className="font-medium">Photo Documentation</span>
                        </div>
                        <p className="text-sm text-green-600 mt-1">
                          Each tree receives 3 photos: at planting, 6 months, and 1 year
                        </p>
                      </div>
                    )}
                    
                    {step.step === 6 && (
                      <div className="mt-6 bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-blue-700">
                          <BarChart3 className="h-5 w-5" />
                          <span className="font-medium">Comprehensive Reports</span>
                        </div>
                        <p className="text-sm text-blue-600 mt-1">
                          Annual reports include environmental impact, survival rates, and community benefits
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-4 border-green-500 rounded-full flex items-center justify-center z-10 hidden lg:flex">
                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
                
                {/* Icon on mobile */}
                <div className="lg:hidden mt-6 mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-16 h-16 flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              End-to-End Transparency
            </h3>
            <p className="text-gray-600 mb-6">
              We believe in complete transparency. Every tree you plant comes with:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-green-600 mb-4">
                  <MapPin className="h-12 w-12 mx-auto" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">GPS Tracking</h4>
                <p className="text-sm text-gray-600">Exact location of each tree</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-green-600 mb-4">
                  <Camera className="h-12 w-12 mx-auto" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Photo Updates</h4>
                <p className="text-sm text-gray-600">Regular growth documentation</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-green-600 mb-4">
                  <FileText className="h-12 w-12 mx-auto" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Impact Reports</h4>
                <p className="text-sm text-gray-600">Detailed environmental impact</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  {/* Featured Locations Component */}
  const FeaturedLocations = () => {
    const [selectedLocation, setSelectedLocation] = useState(data.featuredLocations[0]);
    
    return (
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Across Pakistan: Our Plantation Sites
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                From the mountains of the north to the coasts of the south, we're planting trees nationwide
              </p>
            </div>
            <Link 
              href="/trees/locations" 
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 mt-4 lg:mt-0"
            >
              <Map className="h-5 w-5 mr-2" />
              View All 78 Locations
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-green-900 to-emerald-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="h-64 bg-gradient-to-r from-green-400 to-emerald-300 relative">
                  {/* Mock map visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Pakistan map outline */}
                      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-white/30 rounded-lg"></div>
                      {/* Location markers */}
                      {data.featuredLocations.slice(0, 4).map((loc, idx) => (
                        <div 
                          key={loc.id}
                          className={`absolute ${idx === 0 ? 'top-1/3 left-1/3' : idx === 1 ? 'top-2/3 left-1/2' : idx === 2 ? 'top-3/4 left-1/4' : 'top-1/2 left-2/3'} w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse`}
                        >
                          <div className="absolute -top-8 -left-8 bg-white text-gray-900 px-2 py-1 rounded-lg text-xs font-medium shadow-lg">
                            {loc.name.split(',')[0]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{selectedLocation.name}</h3>
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${selectedLocation.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                      {selectedLocation.status === 'active' ? 'Active Plantation' : 'Planned'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-white">{selectedLocation.trees.toLocaleString()}</div>
                      <div className="text-green-200 text-sm">Trees</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-white">{selectedLocation.volunteers.toLocaleString()}</div>
                      <div className="text-green-200 text-sm">Volunteers</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-white">{selectedLocation.completion}%</div>
                      <div className="text-green-200 text-sm">Complete</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-white">{selectedLocation.species.length}</div>
                      <div className="text-green-200 text-sm">Species</div>
                    </div>
                  </div>
                  
                  <div className="text-green-200">
                    <div className="font-medium mb-2">Impact:</div>
                    <p className="text-sm opacity-90">{selectedLocation.impact}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {data.featuredLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all ${selectedLocation.id === location.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900">{location.name.split(',')[0]}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${location.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {location.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{location.province} • {location.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-semibold">{location.trees.toLocaleString()} trees</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${location.completion}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{location.completion}%</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Province-wise Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Province-wise Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { province: 'Punjab', trees: 520000, projects: 32, color: 'bg-green-500' },
                { province: 'Sindh', trees: 130000, projects: 18, color: 'bg-blue-500' },
                { province: 'KPK', trees: 180000, projects: 15, color: 'bg-emerald-500' },
                { province: 'Balochistan', trees: 65000, projects: 8, color: 'bg-teal-500' },
              ].map((province) => (
                <div key={province.province} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{province.trees.toLocaleString()}</div>
                      <div className="text-gray-600">Trees</div>
                    </div>
                    <div className={`w-12 h-12 ${province.color} rounded-lg flex items-center justify-center`}>
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 mb-2">{province.province}</div>
                  <div className="text-sm text-gray-600">{province.projects} active projects</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Species Distribution */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Native Species We Plant</h3>
                <p className="text-gray-600">Carefully selected native species for maximum survival and ecological benefit</p>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="inline-flex items-center space-x-2 text-green-700">
                  <Trees className="h-5 w-5" />
                  <span>{data.speciesPlanted.reduce((sum, sp) => sum + sp.count, 0).toLocaleString()} trees of 6+ species</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.speciesPlanted.map((species) => (
                <div key={species.name} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900 text-lg">{species.name}</h4>
                    <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      {((species.count / data.speciesPlanted.reduce((sum, sp) => sum + sp.count, 0)) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-4">{species.count.toLocaleString()} trees</div>
                  <div className="space-y-2">
                    {species.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  {/* Testimonials Component */}
  const TestimonialsSection = () => (
    <div className="py-16 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stories from donors, volunteers, and partners who are making a difference with us
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {data.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      <p className="text-gray-500 text-xs mt-1">{testimonial.city}</p>
                    </div>
                    {testimonial.donationAmount > 0 && (
                      <div className="text-right">
                        <div className="text-green-600 font-bold">PKR {testimonial.donationAmount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{testimonial.treesDonated} trees</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'fill-yellow-500' : 'fill-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(testimonial.date).toLocaleDateString('en-PK', { dateStyle: 'medium' })}
                </span>
              </div>
              
              <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">Helpful</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                  <Share className="h-4 w-4" />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                  <Bookmark className="h-4 w-4" />
                  <span className="text-sm">Save</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Corporate Testimonials */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Corporate Partners Speak</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4">
                  T
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Tech Solutions Ltd.</h4>
                  <p className="text-gray-600 text-sm">CSR Partner since 2020</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "Our partnership with GreenEarth has been transformative. We've planted 5,000 trees with them, and the impact reporting is exceptional. Their transparency gives us confidence in our CSR investments."
              </p>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">2,000+ trees planted</span> • Annual Reports • Employee Engagement
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4">
                  E
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">EcoBank Pakistan</h4>
                  <p className="text-gray-600 text-sm">Financial Partner since 2019</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "GreenEarth's financial transparency is unmatched. As a bank, we appreciate their meticulous record-keeping and audit trails. They've become our preferred environmental partner."
              </p>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">10,000+ trees funded</span> • Financial Audits • Community Banking
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/about" 
            className="inline-flex items-center bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Share Your Story
          </Link>
        </div>
      </div>
    </div>
  );

  {/* Financial Transparency Component */}
  const FinancialTransparency = () => (
    <div className="py-16 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Financial Transparency
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We believe in complete financial transparency. Every rupee is accounted for and publicly reported.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          <div className="md:col-span-2 lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">Fund Allocation</h3>

              <div className="space-y-4 lg:space-y-6">
                {Object.entries(data.financialTransparency.allocation).map(([category, percentage]) => (
                  <div key={category}>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span className="font-medium capitalize">{category.replace(/([A-Z])/g, ' $1')}</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="h-3 lg:h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          category === 'plantation' ? 'bg-green-500' :
                          category === 'communityDevelopment' ? 'bg-blue-500' :
                          category === 'administration' ? 'bg-yellow-500' :
                          category === 'fundraising' ? 'bg-purple-500' : 'bg-teal-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900">PKR {data.statistics.totalFunds.toLocaleString()}</div>
                    <div className="text-sm lg:text-base text-gray-600">Total Funds Received</div>
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold text-green-600">PKR {(data.statistics.totalFunds * 0.65).toLocaleString()}</div>
                    <div className="text-sm lg:text-base text-gray-600">Directly to Plantation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Audit & Reports</h3>
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Annual Audit</div>
                    <div className="text-sm text-gray-600">{data.financialTransparency.auditFirm}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Last Audit</div>
                    <div className="font-medium">{new Date(data.financialTransparency.lastAuditDate).toLocaleDateString('en-PK', { dateStyle: 'medium' })}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {data.financialTransparency.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-green-300 cursor-pointer">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-700">{doc}</span>
                      </div>
                      <Download className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Cost Breakdown per Tree</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Sapling & Planting</span>
                  <span className="font-bold">PKR 150</span>
                </div>
                <div className="flex justify-between">
                  <span>1-Year Maintenance</span>
                  <span className="font-bold">PKR 250</span>
                </div>
                <div className="flex justify-between">
                  <span>Community Training</span>
                  <span className="font-bold">PKR 50</span>
                </div>
                <div className="flex justify-between">
                  <span>Monitoring & Reporting</span>
                  <span className="font-bold">PKR 50</span>
                </div>
                <div className="border-t border-white/20 pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total Cost per Tree</span>
                    <span>PKR 500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Yearly Financial Performance</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm lg:text-base">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funds Raised</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trees Planted</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Plantation Cost</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Admin Cost</th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Survival Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { year: "2023", funds: 150_450_000, trees: 300_900, plantation: 97_792_500, admin: 15_045_000, survival: 88.2 },
                  { year: "2022", funds: 112_800_000, trees: 225_600, plantation: 73_320_000, admin: 11_280_000, survival: 86.5 },
                  { year: "2021", funds: 85_600_000, trees: 171_200, plantation: 55_640_000, admin: 8_560_000, survival: 85.0 },
                  { year: "2020", funds: 62_300_000, trees: 124_600, plantation: 40_495_000, admin: 6_230_000, survival: 83.8 },
                  { year: "2019", funds: 41_600_000, trees: 83_200, plantation: 27_040_000, admin: 4_160_000, survival: 82.5 },
                ].map((row) => (
                  <tr key={row.year} className="hover:bg-gray-50">
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.year}</td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">PKR {row.funds.toLocaleString()}</td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">{row.trees.toLocaleString()}</td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap hidden md:table-cell">PKR {row.plantation.toLocaleString()}</td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap hidden md:table-cell">PKR {row.admin.toLocaleString()}</td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-20 lg:w-24 h-2 bg-gray-200 rounded-full overflow-hidden mr-2 lg:mr-3">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${row.survival}%` }}
                          ></div>
                        </div>
                        <span className="text-xs lg:text-sm">{row.survival}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-gray-600">
                <FileText className="h-5 w-5 inline mr-2" />
                Detailed financial statements available for download
              </div>
              <button className="flex items-center text-green-700 hover:text-green-800 font-medium">
                <Download className="h-5 w-5 mr-2" />
                Download All Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  {/* Upcoming Events Component */}
  const UpcomingEvents = () => (
    <div className="py-16 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upcoming Plantation Drives
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Join our upcoming events and be part of Pakistan's green transformation
            </p>
          </div>
          <Link 
            href="/volunteers" 
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 mt-4 lg:mt-0"
          >
            <Calendar className="h-5 w-5 mr-2" />
            View Event Calendar
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {data.upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className={`h-2 ${event.status === 'registration-open' ? 'bg-green-500' : event.status === 'upcoming' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'registration-open' ? 'bg-green-100 text-green-800' :
                    event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.status === 'registration-open' ? 'Registration Open' : 
                     event.status === 'upcoming' ? 'Upcoming' : 'Planning'}
                  </span>
                  <div className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="h-4 w-4 mr-2" />
                    <span>{event.target.toLocaleString()} trees target</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.volunteersNeeded.toLocaleString()} volunteers needed</span>
                  </div>
                </div>
                
                <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  event.status === 'registration-open' 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}>
                  {event.status === 'registration-open' ? 'Register Now' : 'Notify Me'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-2/3 lg:pr-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Corporate Volunteering Programs
              </h3>
              <p className="text-gray-600 mb-6">
                Looking for team-building activities with real impact? Our corporate volunteering programs combine environmental action with meaningful engagement.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4">
                  <div className="text-green-600 font-bold text-2xl mb-2">50+</div>
                  <div className="text-gray-700">Corporate Teams</div>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <div className="text-green-600 font-bold text-2xl mb-2">100K+</div>
                  <div className="text-gray-700">Corporate Trees</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-300">
                <Building className="h-5 w-5 inline mr-2" />
                Enquire for Corporate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  {/* Call to Action Component */}
  const CTASection = () => (
    <div className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px'
        }}></div>
      </div>
      
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <Leaf className="h-20 w-20 mx-auto mb-8 text-yellow-300" />
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The Time to Act is
            <span className="block text-yellow-300 mt-2">Now</span>
          </h2>
          
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Pakistan loses 27,000 hectares of forest every year. 
            Your contribution today helps reverse deforestation and create a sustainable future.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">1.25M+</div>
              <div className="opacity-90">Trees Already Planted</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">25K+</div>
              <div className="opacity-90">Pakistanis Involved</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">78</div>
              <div className="opacity-90">Active Locations</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <Link 
              href="/donate" 
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-gray-900 font-bold py-5 px-12 rounded-lg text-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              <Heart className="h-6 w-6" />
              <span>Plant Your Legacy</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
            
            <Link 
              href="/volunteers" 
              className="bg-transparent hover:bg-white/10 text-white font-bold py-5 px-12 rounded-lg text-xl transition-all duration-300 border-2 border-white/30 backdrop-blur-sm"
            >
              Join Our Movement
            </Link>
          </div>
          
          <div className="text-sm opacity-75 space-y-2">
            <div>✓ Registered NGO under SECP Pakistan</div>
            <div>✓ Tax-deductible donations under Section 2(36) of Income Tax Ordinance</div>
            <div>✓ Annual financial audits by PwC Pakistan</div>
          </div>
        </div>
      </div>
    </div>
  );

  {/* Recent Donations Component */}
  const RecentDonations = () => {
    const [donationType, setDonationType] = useState('all');
    
    const filteredDonations = data.recentDonations.filter(donation => {
      if (donationType === 'all') return true;
      if (donationType === 'individual') return donation.type === 'individual';
      if (donationType === 'corporate') return donation.type === 'corporate';
      return true;
    });
    
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Recent Contributions
              </h2>
              <p className="text-gray-600">
                Join thousands of Pakistanis who are making a difference
              </p>
            </div>
            
            <div className="flex space-x-2 mt-4 lg:mt-0">
              <button 
                onClick={() => setDonationType('all')}
                className={`px-4 py-2 rounded-lg ${donationType === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                All
              </button>
              <button 
                onClick={() => setDonationType('individual')}
                className={`px-4 py-2 rounded-lg ${donationType === 'individual' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                Individuals
              </button>
              <button 
                onClick={() => setDonationType('corporate')}
                className={`px-4 py-2 rounded-lg ${donationType === 'corporate' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                Corporate
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contributor</th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Impact</th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date & Time</th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDonations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-green-50 transition-colors">
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4 ${
                            donation.anonymous ? 'bg-gray-200 text-gray-700' :
                            donation.type === 'corporate' ? 'bg-blue-100 text-blue-800' :
                            donation.type === 'educational' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {donation.anonymous ? 'A' : donation.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {donation.anonymous ? 'Anonymous' : donation.name}
                            </div>
                            <div className="text-sm text-gray-500">{donation.city}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="font-bold text-green-700 text-lg">PKR {donation.amount.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{donation.trees} trees</div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {donation.trees * 20} kg CO₂/year
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            <Droplets className="h-4 w-4 mr-1" />
                            {donation.trees * 100}L water
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <div className="text-gray-900 font-medium">
                          {new Date(donation.date).toLocaleDateString('en-PK', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(donation.date).toLocaleTimeString('en-PK', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          donation.type === 'corporate' ? 'bg-blue-100 text-blue-800' :
                          donation.type === 'educational' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {donation.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="text-gray-700">
                  <span className="font-bold">2,500+</span> donors have contributed this month
                </div>
                <Link href="/finances" className="text-green-700 hover:text-green-800 font-semibold">
                  View detailed financial dashboard →
                </Link>
              </div>
            </div>
          </div>
          
          {/* Donation Leaderboard */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Contributors This Month</h3>
            
            <div className="space-y-4">
              {[
                { rank: 1, name: "Tech Solutions Ltd.", amount: 1000000, trees: 2000, type: "corporate" },
                { rank: 2, name: "EcoBank Pakistan", amount: 500000, trees: 1000, type: "corporate" },
                { rank: 3, name: "Dr. Ali Hassan", amount: 250000, trees: 500, type: "individual" },
                { rank: 4, name: "Pakistan International School", amount: 150000, trees: 300, type: "educational" },
                { rank: 5, name: "GreenTech Industries", amount: 100000, trees: 200, type: "corporate" },
              ].map((contributor) => (
                <div key={contributor.rank} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-green-300">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg mr-4 ${
                      contributor.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="font-bold">{contributor.rank}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{contributor.name}</div>
                      <div className="text-sm text-gray-500 capitalize">{contributor.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-700">PKR {contributor.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{contributor.trees} trees</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/donate" className="inline-flex items-center text-green-700 hover:text-green-800 font-semibold">
                <Trophy className="h-5 w-5 mr-2" />
                Be on the Leaderboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  {/* Trust Badges Section */}
  const TrustBadges = () => (
    <div className="py-16 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Trust GreenEarth Pakistan?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our commitment to excellence, transparency, and impact sets us apart
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
              <ShieldCheck className="h-16 w-16 text-green-600 mx-auto" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Verified & Registered</h3>
            <p className="text-gray-600 text-sm">SECP Registered NGO • Tax-exempt status • Annual audits</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
              <Award className="h-16 w-16 text-blue-600 mx-auto" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Award Winning</h3>
            <p className="text-gray-600 text-sm">Multiple national awards • UN recognition • Industry accolades</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
              <BarChart3 className="h-16 w-16 text-purple-600 mx-auto" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">100% Transparency</h3>
            <p className="text-gray-600 text-sm">Real-time tracking • Public financials • GPS verification</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
              <Globe className="h-16 w-16 text-orange-600 mx-auto" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Nationwide Impact</h3>
            <p className="text-gray-600 text-sm">All provinces • Urban & rural • Community-led programs</p>
          </div>
        </div>
        
        {/* Partners Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Trusted Partners</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Ministry of Climate Change", logo: "🏛️" },
              { name: "WWF Pakistan", logo: "🐼" },
              { name: "UN Environment", logo: "🌍" },
              { name: "Pakistan Army", logo: "⚔️" },
              { name: "HEC Pakistan", logo: "🎓" },
              { name: "Corporate Partners", logo: "🏢" },
            ].map((partner) => (
              <div key={partner.name} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-3">{partner.logo}</div>
                <div className="text-sm font-medium text-gray-700">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Certifications */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-6 bg-green-50 rounded-2xl p-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">ISO 14001</div>
              <div className="text-sm text-gray-600">Environmental Management</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">ISO 9001</div>
              <div className="text-sm text-gray-600">Quality Management</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">2023</div>
              <div className="text-sm text-gray-600">Audit Year</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">0</div>
              <div className="text-sm text-gray-600">Complaints Filed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  {/* FAQ Section */}
  const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    
    const faqs = [
      {
        question: "How do I know my trees are actually being planted?",
        answer: "We provide GPS coordinates, photographs at planting, and regular growth updates for every tree. You can track your trees through our online dashboard."
      },
      {
        question: "What is the survival rate of planted trees?",
        answer: "Our average survival rate is 87.5% - one of the highest in Pakistan. We achieve this through careful species selection, community involvement, and 3-year maintenance programs."
      },
      {
        question: "Can I choose where my trees are planted?",
        answer: "Yes! You can select from our active plantation sites across Pakistan. We recommend locations based on maximum environmental impact and community need."
      },
      {
        question: "Are donations tax-deductible?",
        answer: "Yes, all donations to GreenEarth Pakistan are tax-deductible under Section 2(36) of the Income Tax Ordinance, 2001. We provide tax certificates for all donations above PKR 5,000."
      },
      {
        question: "How are funds allocated?",
        answer: "65% goes directly to plantation activities, 15% to community development, 10% to administration, 5% to fundraising, and 5% to research. Detailed financial reports are publicly available."
      },
      {
        question: "Can corporations partner with GreenEarth?",
        answer: "Absolutely! We have customized corporate partnership programs including CSR initiatives, employee volunteering, and large-scale plantation drives. Contact our corporate partnerships team."
      }
    ];
    
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about our work
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 py-4 border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              href="/faq" 
              className="inline-flex items-center text-green-700 hover:text-green-800 font-semibold"
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              View All FAQs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  {/* Newsletter Signup */}
  const NewsletterSignup = () => (
    <div className="py-16 bg-gradient-to-r from-green-600 to-emerald-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <Mail className="h-16 w-16 mx-auto mb-6 text-white" />
        
        <h2 className="text-3xl font-bold mb-4">
          Stay Updated on Our Journey
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join 50,000+ subscribers who receive monthly updates, impact reports, and plantation stories
        </p>
        
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-green-700 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm opacity-75 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Monthly impact reports
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Exclusive plantation stories
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Volunteer opportunities
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <HeroBanner />
      <RealTimeStats />
      <ImpactCalculator />
      <ProcessSection />
      <FeaturedLocations />
      <TestimonialsSection />
      <FinancialTransparency />
      <UpcomingEvents />
      <CTASection />
      <RecentDonations />
      <TrustBadges />
      <FAQSection />
      <NewsletterSignup />
    </div>
  );
}