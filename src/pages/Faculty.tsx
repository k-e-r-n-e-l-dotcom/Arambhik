import { motion } from 'framer-motion';

const facultyData = [
  {
    id: '1',
    name: 'Mr. Rajesh Kumar',
    subject: 'Science (Classes 9-10)',
    photo: 'https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=400',
    qualification: 'M.Sc. Physics, 12+ years teaching experience',
  },
  {
    id: '2',
    name: 'Mrs. Anita Desai',
    subject: 'Mathematics (Classes 6-12)',
    photo: 'https://images.pexels.com/photos/3184613/pexels-photo-3184613.jpeg?auto=compress&cs=tinysrgb&w=400',
    qualification: 'M.Sc. Mathematics, CBSE Board Expert',
  },
  {
    id: '3',
    name: 'Ms. Priya Sharma',
    subject: 'English & Social Studies',
    photo: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
    qualification: 'M.A. English, 10+ years board exam coaching',
  },
];

export const Faculty = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-blue-800 text-white py-16 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Faculty</h1>
          <p className="text-xl text-blue-100">
            Learn from the best minds in education
          </p>
        </div>
      </motion.section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyData.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.subject}</p>
                  <p className="text-gray-700">{member.qualification}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
