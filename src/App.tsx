import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Faculty } from './pages/Faculty';
import { Courses } from './pages/Courses';
import { Centers } from './pages/Centers';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';

import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminStudents } from './pages/admin/Students';
import { AdminTeachers } from './pages/admin/Teachers';
import { AdminResources } from './pages/admin/Resources';

import { StudentDashboard } from './pages/student/Dashboard';
import { WhatsAppButton } from './components/WhatsAppButton';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/centers" element={<Centers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />

              <Route path="/teachers-corner" element={<ErrorBoundary><ProtectedRoute><AdminDashboard /></ProtectedRoute></ErrorBoundary>} />
              <Route path="/teachers-corner/students" element={<ErrorBoundary><ProtectedRoute><AdminStudents /></ProtectedRoute></ErrorBoundary>} />
              <Route path="/teachers-corner/teachers" element={<ErrorBoundary><ProtectedRoute><AdminTeachers /></ProtectedRoute></ErrorBoundary>} />
              <Route path="/teachers-corner/resources" element={<ErrorBoundary><ProtectedRoute><AdminResources /></ProtectedRoute></ErrorBoundary>} />

              <Route path="/student-corner" element={<ErrorBoundary><StudentDashboard /></ErrorBoundary>} />
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
