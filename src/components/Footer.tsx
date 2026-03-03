import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1F2937] to-[#2B3445] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white shadow-md p-1">
                <img
                  src="/updated_Icon.jpeg"
                  alt="Arambhik Academy Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold font-montserrat">
                Arambhik Academy
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Building strong foundations for academic excellence. Specializing in CBSE and ICSE board exam preparation for Classes 1-10 in Dehradun.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold font-montserrat mb-4">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/about" className="block text-slate-300 hover:text-primary-400 transition-colors">
                About Us
              </Link>
              <Link to="/courses" className="block text-slate-300 hover:text-primary-400 transition-colors">
                Our Courses
              </Link>
              <Link to="/centers" className="block text-slate-300 hover:text-primary-400 transition-colors">
                Our Centers
              </Link>
              <Link to="/contact" className="block text-slate-300 hover:text-primary-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold font-montserrat mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=House+No.2+Lane+No.+5+Nakronda+Road+Sainik+Colony+Dehradun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 text-sm hover:text-primary-400 transition-colors underline decoration-dotted underline-offset-2"
                >
                  House No.2 Lane No. 5, Sainik Colony,<br />
                  Nakronda Road, Dehradun, Uttarakhand 248001
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+919557875108" className="text-slate-300 text-sm hover:text-primary-400 transition-colors">
                  +91 9557875108
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@arambhikacademy.com" className="text-slate-300 text-sm hover:text-primary-400 transition-colors">
                  support@arambhikacademy.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-300 text-sm">
              &copy; 2026 Arambhik Academy. All rights reserved.
            </p>
            <p className="text-slate-300 text-sm flex items-center space-x-2">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>in Dehradun</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
