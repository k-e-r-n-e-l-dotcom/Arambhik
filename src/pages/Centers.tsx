import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';

export const Centers = () => {
  return (
    <div className="min-h-screen">
      <section className="relative py-32 px-4 bg-gradient-to-br from-[#1F2937] via-[#2B3445] to-[#1F2937] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl mb-6">Our Institute</h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto">
              Visit our state-of-the-art facility in Dehradun
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-primary-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-md bg-white/70 border border-white/40 rounded-3xl shadow-soft-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#F37021] to-[#C45512] p-10 text-white">
              <h2 className="text-4xl mb-3"></h2>
              <p className="text-lg text-white/90">Arambhik Academy - Dehradun</p>
            </div>

            <div className="p-10 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <MapPin className="h-7 w-7 text-accent-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Address</h3>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=House+No.2+Lane+No.+5+Nakronda+Road+Sainik+Colony+Dehradun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 hover:text-accent-600 transition-colors leading-relaxed block group"
                  >
                    House No.2 Lane No. 5, Nakronda Road<br />
                    Sainik Colony, Dehradun<br />
                    Uttarakhand 248001
                    <div className="mt-3 inline-flex items-center space-x-2 text-accent-600 font-semibold group-hover:text-accent-700">
                      <Navigation className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      <span>Get Directions</span>
                    </div>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-start space-x-4"
              >
                <Phone className="h-7 w-7 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Phone</h3>
                  <div className="text-slate-700 leading-relaxed">
                    <a href="tel:+919557875108" className="block hover:text-blue-600 transition-colors">
                      +91 9557875108
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start space-x-4"
              >
                <Mail className="h-7 w-7 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Email</h3>
                  <div className="text-slate-700 leading-relaxed">
                    <a href="mailto:info@arambhikacademy.com" className="block hover:text-green-600 transition-colors">
                      support@arambhikacademy.com
                    </a>
                    <a href="mailto:admissions@arambhikacademy.com" className="block hover:text-green-600 transition-colors">
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start space-x-4"
              >
                <Clock className="h-7 w-7 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Working Hours</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Tuesday - Sunday: 3:00 PM - 8:00 PM<br />
                    Monday: OFF
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="border-t border-slate-200 p-10 bg-gradient-to-b from-white/50 to-white/30">
              <h3 className="font-bold text-gray-900 mb-6 text-2xl">Institute Facilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Dedicated Science Lab',
                  'Digital Library',
                  'Computer Lab',
                  'Free Wi-Fi',
                  'Smart Boards',
                  'Power Backup',
                  'Security System'
                ].map((facility, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3 group"
                  >
                    <div className="w-2 h-2 bg-accent-500 rounded-full group-hover:scale-150 transition-transform"></div>
                    <span className="text-slate-700 font-medium group-hover:text-accent-600 transition-colors">
                      {facility}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-10 bg-gradient-to-br from-[#1F2937] to-[#2B3445] text-white">
              <div className="text-center">
                <h3 className="text-2xl mb-4">Ready to Visit?</h3>
                <p className="text-slate-200 mb-6">
                  Come explore our institute and see how we can help your child succeed
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=House+No.2+Lane+No.+5+Nakronda+Road+Sainik+Colony+Dehradun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#F37021] to-[#C45512] text-white rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all font-semibold"
                >
                  <Navigation className="h-5 w-5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
