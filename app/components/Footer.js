import Link from 'next/link';
import { 
  Trees, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Shield,
  FileText,
  Heart
} from 'lucide-react';

const Footer = () => {
  const ngoDetails = {
    name: "GreenEarth Pakistan Initiative",
    tagline: "Planting Hope, Growing Futures",
    description: "A registered non-profit organization dedicated to environmental conservation through large-scale tree plantation drives across Pakistan.",
    contact: {
      phone: "+92 51 1234567",
      whatsapp: "+92 300 1234567",
      email: "info@greenearth.pk",
      address: "Plot 123, Green Avenue, Sector G-10/4, Islamabad, Pakistan",
      officeHours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM"
    },
    registration: {
      secp: "SECP Registration No: NGO-12345-2015",
      tax: "Tax-exempt under Section 2(36) of Income Tax Ordinance, 2001"
    }
  };

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/trees", label: "Our Trees" },
    { href: "/trees/planted", label: "Planted Trees" },
    { href: "/trees/locations", label: "Locations" },
    { href: "/donate", label: "Donate Now" },
    { href: "/volunteers", label: "Become Volunteer" },
    { href: "/contact", label: "Contact Us" },
  ];

  const resources = [
    { href: "/finances", label: "Financial Reports" },
    { href: "/finances/reports", label: "Annual Reports" },
    { href: "/faq", label: "FAQ" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/transparency", label: "Transparency" },
    { href: "/careers", label: "Careers" },
    { href: "/media", label: "Media Kit" },
  ];

  const socialLinks = [
    { platform: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "#" },
    { platform: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "#" },
    { platform: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "#" },
    { platform: "YouTube", icon: <Youtube className="h-5 w-5" />, href: "#" },
    { platform: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-2 rounded-lg group-hover:shadow-lg transition-shadow">
                <Trees className="h-10 w-10 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">GreenEarth</span>
                <span className="text-sm text-emerald-400 -mt-1">Pakistan Initiative</span>
              </div>
            </Link>
            
            <p className="text-gray-300">
              {ngoDetails.description}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm">{ngoDetails.registration.secp}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-green-400" />
                <span className="text-sm">{ngoDetails.registration.tax}</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  className="bg-gray-800 hover:bg-green-600 p-2 rounded-lg transition-colors"
                  aria-label={social.platform}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-green-600 p-2 rounded-lg mr-3">
                <Heart className="h-5 w-5" />
              </span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-green-600 p-2 rounded-lg mr-3">
                <FileText className="h-5 w-5" />
              </span>
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Newsletter Signup */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
                />
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-lg font-medium transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-green-600 p-2 rounded-lg mr-3">
                <Phone className="h-5 w-5" />
              </span>
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <div className="font-medium">{ngoDetails.contact.phone}</div>
                  <div className="text-sm text-gray-300">Phone</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <div className="font-medium">{ngoDetails.contact.whatsapp}</div>
                  <div className="text-sm text-gray-300">WhatsApp</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <div className="font-medium">{ngoDetails.contact.email}</div>
                  <div className="text-sm text-gray-300">Email</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <div className="font-medium">Islamabad Office</div>
                  <div className="text-sm text-gray-300">{ngoDetails.contact.address}</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <div className="font-medium">Office Hours</div>
                  <div className="text-sm text-gray-300">{ngoDetails.contact.officeHours}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h4 className="text-center text-lg font-semibold mb-6">Our Trusted Partners</h4>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {[
              "Ministry of Climate Change",
              "WWF Pakistan",
              "UN Environment",
              "Pakistan Army",
              "HEC Pakistan",
              "Corporate Partners"
            ].map((partner) => (
              <div key={partner} className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors">
                <div className="font-medium text-sm">{partner}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-6">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} GreenEarth Pakistan Initiative. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
            
            <div className="text-gray-400 text-sm">
              Made with <Heart className="h-4 w-4 inline text-red-500" /> for Pakistan
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-gray-900 text-center text-xs text-gray-500">
            <p>
              GreenEarth Pakistan Initiative is a registered non-profit organization under SECP Pakistan. 
              All donations are tax-deductible. Registration No: NGO-12345-2015. 
              Audited by PricewaterhouseCoopers Pakistan.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;