import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogOut, Menu, X, UserCircle, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const dashboardPath = profile?.role === 'admin' ? '/admin' : '/student';

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
            <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
              <div className="bg-gradient-to-br from-primary-900 to-primary-800 p-2 rounded-xl group-hover:scale-110 transition-transform">
                <GraduationCap className="h-6 w-6 text-accent-500" />
              </div>
              <span className="text-base md:text-lg font-bold font-montserrat text-primary-900 whitespace-nowrap">Arambhik Academy</span>
            </Link>

            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {!profile ? (
                <>
                  {publicLinks.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-sm font-semibold text-slate-600 hover:text-primary-900 transition-colors relative group whitespace-nowrap"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  ))}

                  <Link
                    to="/login?role=student"
                    className="flex items-center gap-1.5 bg-slate-900 text-white px-4 py-2 rounded-full font-semibold shadow-lg shadow-blue-900/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/30 transition-all duration-300 border border-white/10 text-sm whitespace-nowrap"
                  >
                    <UserCircle size={18} className="text-blue-400" />
                    <span>Student Login</span>
                  </Link>

                  <Link
                    to="/login?role=admin"
                    className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg shadow-orange-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 text-sm whitespace-nowrap"
                  >
                    <ShieldCheck size={18} className="text-white/90" />
                    <span>Admin Login</span>
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-sm text-slate-600 font-medium whitespace-nowrap">Welcome, {profile.full_name}</span>
                  <Link
                    to={dashboardPath}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
                  >
                    <GraduationCap className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-all font-medium text-sm whitespace-nowrap"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-primary-900" />
              ) : (
                <Menu className="h-6 w-6 text-primary-900" />
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
                {!profile ? (
                  <>
                    {publicLinks.map(link => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="block text-slate-700 hover:text-primary-900 transition-colors py-2 font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      to="/login?role=student"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserCircle size={20} />
                      <span>Student Login</span>
                    </Link>
                    <Link
                      to="/login?role=admin"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ShieldCheck size={20} />
                      <span>Admin Login</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="text-slate-600 py-2 font-medium">Welcome, {profile.full_name}</div>
                    <Link
                      to={dashboardPath}
                      className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <GraduationCap className="h-5 w-5" />
                      <span>Go to Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center space-x-2 w-full px-4 py-2.5 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors font-semibold"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
