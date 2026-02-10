import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, ShieldCheck, LogIn, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const API_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-users`;

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const { profile, signIn, loading } = useAuth();
  const navigate = useNavigate();
  const role = searchParams.get('role');

  useEffect(() => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'bootstrap' }),
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!loading && profile) {
      navigate(profile.role === 'admin' ? '/admin' : '/student');
    }
  }, [profile, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signIn(username, password);
    } catch {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center px-4 py-24">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-xl">
                <img
                  src="/logo.png"
                  alt="Arambhik Academy Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 font-montserrat">
              Welcome to Learning Portal
            </h1>
            <p className="text-lg text-slate-500">Select your login type to continue</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.button
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login?role=student')}
              className="group relative bg-white rounded-3xl p-10 shadow-soft border-2 border-transparent hover:border-blue-200 hover:shadow-colored-blue transition-all duration-300 text-left"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-3xl" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <GraduationCap className="h-8 w-8 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2 font-montserrat">Student Login</h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Access your classes, study materials, NCERT resources and more
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                  <span>Continue as Student</span>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </div>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login?role=admin')}
              className="group relative bg-white rounded-3xl p-10 shadow-soft border-2 border-transparent hover:border-amber-200 hover:shadow-colored-amber transition-all duration-300 text-left"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-50 to-transparent rounded-3xl" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2 font-montserrat">Admin Login</h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Manage students, teachers, resources and system settings
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-amber-600 group-hover:gap-3 transition-all">
                  <span>Continue as Admin</span>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login selection
        </button>

        <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-10 border border-slate-100">
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-xl">
              <img
                src="/image copy.png"
                alt="Arambhik Academy Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${isAdmin ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>
              {isAdmin ? 'Admin Portal' : 'Student Portal'}
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-1 font-montserrat">Welcome Back</h2>
            <p className="text-slate-500 text-sm">Enter your credentials to continue</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
                placeholder={isAdmin ? 'admin' : 'e.g. AA001'}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0 ${isAdmin ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-colored-amber' : 'bg-gradient-to-r from-slate-800 to-slate-900 shadow-soft'}`}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Default Credentials</p>
            {isAdmin ? (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Admin</span>
                <span className="font-mono font-semibold text-slate-800">admin / admin123</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Student</span>
                <span className="font-mono font-semibold text-slate-800">AA001 / AA@1234</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
