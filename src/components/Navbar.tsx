import { Link } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/courses', label: 'Courses' },
    { to: '/centers', label: 'Centers' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="backdrop-blur-md bg-white/80 border border-white/20 shadow-soft-lg rounded-2xl max-w-7xl mx-auto"
      >
        <div className="px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            <Link to="/" className="flex items-center space-x-2 md:space-x-3 group flex-shrink-0">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300 bg-white shadow-sm">
                <img
                  src="/logo.png"
                  alt="Arambhik Academy Logo"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <span className="text-base md:text-lg font-bold font-montserrat text-primary-800 whitespace-nowrap">Arambhik Academy</span>
            </Link>

            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {publicLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-semibold text-slate-600 hover:text-primary-700 transition-colors relative group whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F4B400] to-[#F37021] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}

              <Link
                to="/student-corner"
                className="flex items-center gap-1.5 bg-gradient-to-r from-[#F37021] to-[#C45512] text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-sm whitespace-nowrap"
              >
                <BookOpen size={18} className="text-white/90" />
                <span>Student Corner</span>
              </Link>
            </div>

            <button
              className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-primary-700" />
              ) : (
                <Menu className="h-6 w-6 text-primary-700" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-200 overflow-hidden"
            >
              <div className="px-4 md:px-6 py-4 space-y-3">
                {publicLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block text-slate-700 hover:text-primary-700 transition-colors py-2 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/student-corner"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-[#F37021] to-[#C45512] text-white rounded-full hover:shadow-lg transition-all font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen size={20} />
                  <span>Student Corner</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
