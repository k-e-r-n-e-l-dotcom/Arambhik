import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Faculty } from './pages/Faculty';
import { Courses } from './pages/Courses';
import { Centers } from './pages/Centers';
import { Contact } from './pages/Contact';
import StudentCorner from './pages/StudentCorner';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Navbar />

          <main className="flex-grow w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/centers" element={<Centers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/student-corner" element={<StudentCorner />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
