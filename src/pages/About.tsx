import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 w-full overflow-x-hidden">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-[#1F2937] to-[#2B3445] text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 w-full max-w-full"
      >
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-slate-200">
            Arambhik Academy - A legacy of academic brilliance
          </p>
        </div>
      </motion.section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 w-full max-w-full">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-3xl shadow-lg mb-12"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#F4B400] to-[#F37021] bg-clip-text text-transparent mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
             At Arambhik Academy, we believe that every student’s journey toward excellence starts with a single spark of interest. Founded by a visionary educator with over 10 years of teaching experience in schools, competitive examination coaching, and official board examination checking, our institute is built on an insider’s understanding of what it takes to succeed.
A Tailored Path to Academic Excellence.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We have evolved traditional studies into a curiosity-driven curriculum designed specifically for students from Class 1 to 10. By prioritizing deep conceptual understanding over rote memorization, we ensure that every child—from the primary years to secondary school—builds a strong, unshakable foundation.
Our unique learning model is built on.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
            Structured Preparation: Blending engaging offline classroom sessions with meaningful post-class practice.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
            Modern Integration: Using tools like Google Classroom, Meet, and WhatsApp for seamless progress tracking.
Personalized Care: We strictly maintain small batch sizes (maximum 15 students) to ensure our Subject Matter Experts focus on individual academic growth.
Learning Through Discovery
            </p>
            <p className="text-gray-700 leading-relaxed">
            We believe real understanding happens when students learn by doing. Our academy features dedicated Science and Computer Labs where students engage in hands-on experiments and demonstrations. This application-based environment encourages students to move beyond the textbook, transforming "how do I solve this?" into "what else can I discover?".
Admission Open | Limited Seats for Session 2026-2027
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg"
            >
              <Target className="h-12 w-12 text-accent-600 mb-4" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-[#F4B400] to-[#F37021] bg-clip-text text-transparent mb-3">Our Mission</h3>
              <p className="text-gray-700">
                To provide high-quality, concept-based education at an affordable rate to nurture independent thinkers
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-lg"
            >
              <Eye className="h-12 w-12 text-accent-600 mb-4" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-[#F4B400] to-[#F37021] bg-clip-text text-transparent mb-3">Our Vision</h3>
              <p className="text-gray-700">
                To build a future where every child discovers their potential, eventually establishing schools that offer free education to underprivileged students.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-lg"
            >
              <Heart className="h-12 w-12 text-accent-600 mb-4" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-[#F4B400] to-[#F37021] bg-clip-text text-transparent mb-3">Our Values</h3>
              <p className="text-gray-700">
                 We prioritize understanding over memorization and personal attention over large crowds, believing that quality education is a right, not a privilege.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
