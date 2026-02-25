import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, Award, TrendingUp, ChevronDown, Quote, ArrowRight, Star, Trophy, Microscope, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const Home = () => {
  const [readMore, setReadMore] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentResult, setCurrentResult] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Class 12 CBSE - 96.2%",
      quote: "Arambhik Academy transformed my approach to studying. The teachers focus on concept clarity rather than rote learning. I scored 96.2% in boards!",
      rating: 5
    },
    {
      name: "Mrs. Radhika Bandoliya",
      role: "Parent of Class 5th & 7th Student",
      quote: "Big thanks to the teachers their dedication towards teaching is truly helping. I can see a great improvement in my childerns. KEEP UP THE GREAT WORK. ",
      rating: 5
    },
    {
      name: "Ankit Verma",
      role: "Class 11 Science",
      quote: "The faculty here doesn't just teach subjects, they build confidence. I'm no longer afraid of Math and Physics thanks to their patient teaching.",
      rating: 5
    },
    {
      name: "Mrs. Panchal",
      role: "Parent of Class 9 Student",
      quote: "Best decision we made! Our son now completes homework on time and actually enjoys studying. The teachers are incredibly supportive.",
      rating: 5
    }
  ];

  const [recentResults, setRecentResults] = useState<Array<{ name: string; class: string; score: string; subject: string; year: string }>>([
    { name: "Loading...", class: "", score: "0%", subject: "All Subjects", year: "2024" }
  ]);

  useEffect(() => {
    loadLeaderboard();

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    const resultInterval = setInterval(() => {
      setCurrentResult((prev) => (prev + 1) % (recentResults.length || 1));
    }, 3000);

    return () => {
      clearInterval(testimonialInterval);
      clearInterval(resultInterval);
    };
  }, []);

  const loadLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*, profiles(full_name, class)')
        .order('rank', { ascending: true })
        .limit(3);

      if (error) throw error;

      if (data && data.length > 0) {
        const formattedResults = data.map((entry: any) => ({
          name: entry.profiles?.full_name || 'Student',
          class: entry.profiles?.class || 'N/A',
          score: `${entry.score}%`,
          subject: 'All Subjects',
          year: new Date().getFullYear().toString()
        }));
        setRecentResults(formattedResults);
      }
    } catch {
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center px-4 pt-32 pb-20 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 order-2 lg:order-1"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center space-x-2 backdrop-blur-md bg-white/10 border border-white/20 px-5 py-2.5 rounded-full shadow-soft"
              >
                <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-white">Trusted by 500+ Students</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white text-balance font-bold">
                From Basics to{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-accent-200 via-accent-300 to-accent-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,163,204,0.5)]" style={{ WebkitTextStroke: '0.5px rgba(0,163,204,0.3)' }}>
                    Brilliance
                  </span>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute bottom-2 left-0 h-3 bg-gradient-to-r from-accent-500/40 to-accent-600/40 blur-sm -z-10"
                  ></motion.div>
                </span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                Dedicated Science & Computer Labs where students learn by doing — building real understanding, confidence, and step-by-step academic growth.
              </p>

              <div className="pt-4 space-y-6">
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <h2 className="text-2xl text-white font-bold">Who We Are</h2>
                  <p>
                   Arambhik Academy is a concept-driven learning institute designed for CBSE students from Class 6 to 10, where understanding comes before memorisation. We believe education should build clarity, confidence, and curiosity—not pressure.
                  </p>

                  <motion.div
                    initial={false}
                    animate={{ height: readMore ? 'auto' : 0, opacity: readMore ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden space-y-4"
                  >
                    <p>
                     Our academy is equipped with a dedicated science and computer lab where students learn through experiments, demonstrations, and hands-on activities. The lab environment encourages curiosity, practical understanding, and application-based learning aligned with the CBSE curriculum.
                    </p>
                    <p>
                      At Arambhik Academy, we don’t just prepare students for exams—we help them think scientifically, learn independently, and grow confidently. Every concept is taught with purpose, every student is guided with care, and every step of learning begins with a strong foundation.
                    </p>
                  </motion.div>

                  <button
                    onClick={() => setReadMore(!readMore)}
                    className="inline-flex items-center space-x-2 text-accent-300 hover:text-accent-200 font-semibold group"
                  >
                    <span>{readMore ? 'Read Less' : 'Read More'}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${readMore ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/courses"
                  className="group px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full hover:shadow-brand hover:-translate-y-1 hover:shadow-xl transition-all font-semibold inline-flex items-center justify-center space-x-2"
                >
                  <span>Explore Courses</span>
                  <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-full hover:shadow-soft hover:-translate-y-1 transition-all font-semibold inline-flex items-center justify-center"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center order-1 lg:order-2"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-primary-600/20 rounded-full blur-3xl"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="relative w-full max-w-[500px] aspect-square"
              >
                <img
                  src="https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Teacher instructing students in classroom"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/10"
                />
              </motion.div>

              <motion.div
                initial={{ rotate: 0, opacity: 0 }}
                animate={{
                  rotate: [0, -3, 0],
                  opacity: 1
                }}
                transition={{
                  rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { delay: 0.8, duration: 0.6 }
                }}
                className="absolute top-8 -right-4 backdrop-blur-md bg-gradient-to-br from-accent-500 to-accent-600 text-white px-8 py-4 rounded-3xl shadow-brand border border-white/20"
              >
                <div className="text-sm font-semibold">Classes</div>
                <div className="text-4xl font-bold">6-12</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
              Success Stories & Results
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Real students, real results, real transformation
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-slate-50 to-primary-50/30 rounded-3xl p-8 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-primary-800 flex items-center gap-2">
                    <Quote className="h-6 w-6 text-accent-600" />
                    Student & Parent Reviews
                  </h3>
                  <div className="flex gap-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentTestimonial(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentTestimonial ? 'bg-accent-500 w-6' : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-accent-500 text-accent-500" />
                        ))}
                      </div>
                      <p className="text-lg text-slate-700 leading-relaxed italic">
                        "{testimonials[currentTestimonial].quote}"
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-200">
                      <p className="font-bold text-primary-800">{testimonials[currentTestimonial].name}</p>
                      <p className="text-sm text-slate-600">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-white to-primary-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
              Why Choose Arambhik Academy?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience education excellence with our proven teaching methodology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Learning by Doing',
                description: 'Hands-on practical approach where students learn through experiments, projects, and real-world applications',
                gradient: 'from-primary-500/10 to-primary-600/5',
                iconColor: 'text-primary-600'
              },
              {
                icon: Microscope,
                title: 'Dedicated Science & Computer Labs',
                description: 'State-of-the-art laboratory facilities for science experiments and computer practice sessions',
                gradient: 'from-accent-500/10 to-accent-600/5',
                iconColor: 'text-accent-600'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`group backdrop-blur-md bg-gradient-to-br ${item.gradient} border border-white/40 p-8 rounded-3xl hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-500`}
                >
                  <Icon className={`h-12 w-12 ${item.iconColor} mb-4 group-hover:scale-110 transition-transform duration-500`} />
                  <h3 className="text-2xl font-bold text-primary-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-br from-primary-800 via-primary-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-16"
          >
            Our Track Record
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: '500+', label: 'Students Enrolled', delay: 0 },
              { value: '95%', label: 'Success Rate', delay: 0.1 },
              { value: '15+', label: 'Years of Excellence', delay: 0.2 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay, duration: 0.6 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-all"
              >
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent-200 to-accent-400 bg-clip-text text-transparent mb-4">
                  {stat.value}
                </div>
                <div className="text-xl text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
