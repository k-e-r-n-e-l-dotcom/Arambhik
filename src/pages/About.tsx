import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-[#1F2937] to-[#2B3445] text-white py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-slate-200">
            Arambhik Academy - A legacy of academic brilliance
          </p>
        </div>
      </motion.section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-3xl shadow-lg mb-12"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#F4B400] to-[#F37021] bg-clip-text text-transparent mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Arambhik Academy is a concept-driven learning institute designed for CBSE students from Class 6 to 10, where understanding comes before memorisation. We believe education should build clarity, confidence, and curiosity—not pressure.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our teaching follows a unique learning model that blends structured pre-class preparation, engaging offline classroom sessions, and meaningful post-class practice. With small batch sizes (maximum 10 students per class), we ensure personal attention, regular feedback, and strong teacher-student interaction. Our team includes experienced offline subject teachers, an online educator, and dedicated mentors, working together to support both academic growth and disciplined study habits.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Technology supports our learning ecosystem through Google Classroom, Meet, Sheets, presentations, and WhatsApp, making communication, tracking, and revision seamless for students and parents.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our academy is equipped with a dedicated science and computer lab where students learn through experiments, demonstrations, and hands-on activities. The lab environment encourages curiosity, practical understanding, and application-based learning aligned with the CBSE curriculum.
            </p>
            <p className="text-gray-700 leading-relaxed">
              At Arambhik Academy, we don't just prepare students for exams—we help them think scientifically, learn independently, and grow confidently. Every concept is taught with purpose, every student is guided with care, and every step of learning begins with a strong foundation.
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
                To nurture independent thinkers and true leaders through concept-based learning by doing. We are committed to providing experimental education in our dedicated labs where every student—including differently abled learners—gets equal access to quality education. Our mission is to make learning meaningful, inclusive, and transformative, helping students grow into confident individuals who understand the 'why' behind every 'what'.
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
                To become a trusted learning partner where every child discovers their potential through hands-on experimentation and personalized guidance. We envision a future where education is accessible to all, where dedicated lab facilities and experienced mentors work together to build not just academic excellence, but strong character, critical thinking, and lifelong curiosity in every student we teach.
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
                Understanding over memorization. Practice over theory. Inclusion over exclusion. We believe in personal attention, honest feedback, and creating a learning environment where mistakes are stepping stones to mastery. Our commitment to small batch sizes, dedicated lab facilities, and equal opportunities for all students—including those with special needs—reflects our core belief that quality education is a right, not a privilege.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
