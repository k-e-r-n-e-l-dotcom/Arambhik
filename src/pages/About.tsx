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
              Two young founders from Dehradun began their journey while preparing for civil services. To support their studies, they started home tuition for neighborhood students in Sainik Colony. Teaching soon became more than income — it became a purpose. They believed students deserve mentorship, discipline, and clarity of thinking, not just exam marks.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              With minimal resources, they taught from a small rented room, reinvesting everything into books, learning material, and better teaching methods. As their students began achieving outstanding results, parents across Dehradun started trusting them. What began as a humble home tuition setup evolved into a growing coaching institute built on honesty, personal attention, and deep commitment to each child's future.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, the institute continues to expand with the same civil services discipline that shaped its foundation. The founders still teach personally, treating students like family and guiding them beyond textbooks. Their dream is to build confident learners in Dehradun who carry strong values, ambition, and academic excellence into the future.
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
                To provide quality tuition that helps students excel in their school studies and achieve top marks in board examinations.
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
