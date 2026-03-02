import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Send, MapPin, Phone, Mail, Navigation, MessageCircle } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Which classes do you teach?',
      answer: 'We provide tuition for students from Class 6th to 12th for both CBSE and ICSE boards. We cover all subjects including Mathematics, Science, English, Social Studies, and languages.'
    },
    {
      question: 'What is the batch size?',
      answer: 'We maintain small batch sizes of 10-15 students to ensure personalized attention and effective learning for each student.'
    },
    {
      question: 'Do you help with school homework?',
      answer: 'Yes, we provide daily homework support and doubt clearing sessions. Students can get help with their school assignments and projects.'
    },
    {
      question: 'Do you provide study material for board exams?',
      answer: 'Yes, we provide comprehensive study materials, practice sheets, previous year board question papers, and sample papers for all subjects.'
    },
    {
      question: 'Do you have dedicated labs?',
      answer: 'Yes, we have dedicated Science and Computer labs, we encourage learning by doing concept which leads better understanding and creates the better foundation.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappMessage = `Hello! I'm ${formData.name}%0A%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0A%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/919557875108?text=${whatsappMessage}`;

    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <section className="relative py-32 px-4 bg-gradient-to-br from-[#1F2937] via-[#2B3445] to-[#1F2937] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl mb-6">Get in Touch</h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto">
              Have questions? We're here to help you on your academic journey
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-primary-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.a
              href="https://www.google.com/maps/search/?api=1&query=House+No.2+Lane+No.+5+Nakronda+Road+Sainik+Colony+Dehradun"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group backdrop-blur-md bg-white/70 border border-white/40 p-8 rounded-3xl hover:shadow-soft-lg hover:-translate-y-1 transition-all"
            >
              <MapPin className="h-12 w-12 text-accent-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl text-gray-900 mb-3">Visit Us</h3>
              <p className="text-slate-600 leading-relaxed">
                House No.2 Lane No. 5, Nakronda Road,<br />
                Sainik Colony, Dehradun,<br />
                Uttarakhand 248001
              </p>
              <div className="mt-4 inline-flex items-center space-x-2 text-accent-600 font-semibold group-hover:text-accent-700">
                <span>Open in Maps</span>
                <Navigation className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>

            <motion.a
              href="tel:+919557875108"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="group backdrop-blur-md bg-white/70 border border-white/40 p-8 rounded-3xl hover:shadow-soft-lg hover:-translate-y-1 transition-all"
            >
              <Phone className="h-12 w-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl text-gray-900 mb-3">Call Us</h3>
              <p className="text-slate-600 leading-relaxed">
                +91 9557875108<br />
                Tuesday - Sunday : 3:00 PM - 8:00 PM<br />
                Monday: OFF
              </p>
              <div className="mt-4 inline-flex items-center space-x-2 text-blue-600 font-semibold group-hover:text-blue-700">
                <span>Call Now</span>
              </div>
            </motion.a>

            <motion.a
              href="mailto:info@arambhikacademy.com"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="group backdrop-blur-md bg-white/70 border border-white/40 p-8 rounded-3xl hover:shadow-soft-lg hover:-translate-y-1 transition-all"
            >
              <Mail className="h-12 w-12 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl text-gray-900 mb-3">Email Us</h3>
              <p className="text-slate-600 leading-relaxed">
                support@arambhikacademy.com<br />
                Quick response within 24 hours
              </p>
              <div className="mt-4 inline-flex items-center space-x-2 text-green-600 font-semibold group-hover:text-green-700">
                <span>Send Email</span>
              </div>
            </motion.a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl text-gray-900 mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="backdrop-blur-md bg-white/70 border border-white/40 p-8 rounded-3xl shadow-soft space-y-6">
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your phone"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Write your message here"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 rounded-full font-semibold hover:bg-green-700 hover:shadow-soft-lg hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Send via WhatsApp</span>
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-md bg-white/70 border border-white/40 rounded-2xl shadow-soft overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                      {openFaqIndex === index ? (
                        <ChevronUp className="h-5 w-5 text-accent-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-accent-600 flex-shrink-0" />
                      )}
                    </button>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-5 text-slate-700 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-gray-900 mb-4">Find Us on Map</h2>
            <p className="text-xl text-slate-600 mb-8">
              Located at Sainik Colony, Dehradun
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="backdrop-blur-md bg-white/70 border border-white/40 p-12 rounded-3xl shadow-soft-lg text-center"
          >
            <MapPin className="h-16 w-16 text-accent-600 mx-auto mb-6" />
            <h3 className="text-2xl text-gray-900 mb-4">Visit Our Academy</h3>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
              We're located in the heart of Sainik Colony, Dehradun. Click the button above to get directions via Google Maps and plan your visit.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
