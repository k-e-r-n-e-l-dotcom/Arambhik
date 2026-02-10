import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-blue-800 text-white py-16 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-blue-100">
            Arambhik Academy - A legacy of academic brilliance
          </p>
        </div>
      </motion.section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-md mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
             Arambhik Academy is a concept-driven learning institute designed for CBSE students from Class 6 to 10, where understanding comes before memorisation. We believe education should build clarity, confidence, and curiosity—not pressure.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              With minimal resources, they taught from a small rented room, reinvesting everything into books, learning material, and better teaching methods. As their students began achieving outstanding results, parents across Dehradun started trusting them. What began as a humble home tuition setup evolved into a growing coaching institute built on honesty, personal attention, and deep commitment to each child's future.
            </p>
            <p className="text-gray-700 leading-relaxed">
             Our teaching follows a unique learning model that blends structured pre-class preparation, engaging offline classroom sessions, and meaningful post-class practice. With small batch sizes (maximum 10 students per class), we ensure personal attention, regular feedback, and strong teacher-student interaction. Our team includes experienced offline subject teachers, an online educator, and dedicated mentors, working together to support both academic growth and disciplined study habits.

Technology supports our learning ecosystem through Google Classroom, Meet, Sheets, presentations, and WhatsApp, making communication, tracking, and revision seamless for students and parents.

Our academy is equipped with a dedicated science and computer lab where students learn through experiments, demonstrations, and hands-on activities. The lab environment encourages curiosity, practical understanding, and application-based learning aligned with the CBSE curriculum.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Target className="h-12 w-12 text-blue-800 mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-3">Our Mission</h3>
              <p className="text-gray-700">
                At Arambhik Academy, we don’t just prepare students for exams—we help them think scientifically, learn independently, and grow confidently. Every concept is taught with purpose, every student is guided with care, and every step of learning begins with a strong foundation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Eye className="h-12 w-12 text-blue-800 mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-3">Our Vision</h3>
              <p className="text-gray-700">
                To be Dehradun's most trusted tuition center, known for building strong fundamentals and consistent board exam results.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <Heart className="h-12 w-12 text-blue-800 mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-3">Our Values</h3>
              <p className="text-gray-700">
                Integrity, excellence, innovation, and a student-first approach guide everything we do.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
