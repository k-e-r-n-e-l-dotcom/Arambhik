import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { courses } from '../data/coursesData';
import { CourseCard } from '../components/CourseCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const Courses = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-[#1F2937] via-[#2B3445] to-[#1F2937] text-white pt-32 pb-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium text-primary-200 mb-6 backdrop-blur-sm border border-white/10"
          >
            Designed for real learning
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight"
          >
            Programs That Build
            <span className="block mt-1 bg-gradient-to-r from-[#F4B400] to-[#F37021] bg-clip-text text-transparent">
              Confident Learners
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Simple, structured, and stress-free learning programs crafted with personal attention and a focus on strong fundamentals.
          </motion.p>
        </div>
      </motion.section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {courses.map((course) => (
              <motion.div
                key={course.title}
                variants={cardVariants}
                className={courses.indexOf(course) === courses.length - 1 ? 'lg:col-span-2 lg:max-w-[calc(50%-1rem)] lg:mx-auto' : ''}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-20 text-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-10 md:p-14 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Not sure which program is right?
              </h2>
              <p className="text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
                Speak with our founders directly. They will understand your child's needs and recommend the best path forward — no pressure, just honest guidance.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-7 py-3.5 bg-white text-slate-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Talk to Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
