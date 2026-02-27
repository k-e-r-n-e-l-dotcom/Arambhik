import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Users, GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ToastContainer } from '../components/Toast';
import ManageClasses from '../components/admin/ManageClasses';
import ManageSubjects from '../components/admin/ManageSubjects';
import ManageChapters from '../components/admin/ManageChapters';
import ManageStudents from '../components/admin/ManageStudents';

type Section = 'classes' | 'subjects' | 'chapters' | 'students';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export default function TeachersCorner() {
  const { signOut } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('classes');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    { id: 'classes' as Section, label: 'Manage Classes', icon: BookOpen },
    { id: 'subjects' as Section, label: 'Manage Subjects', icon: FileText },
    { id: 'chapters' as Section, label: 'Manage Chapters', icon: GraduationCap },
    { id: 'students' as Section, label: 'Manage Students', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900">Teachers Corner</h1>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-24">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {activeSection === 'classes' && <ManageClasses addToast={addToast} />}
              {activeSection === 'subjects' && <ManageSubjects addToast={addToast} />}
              {activeSection === 'chapters' && <ManageChapters addToast={addToast} />}
              {activeSection === 'students' && <ManageStudents addToast={addToast} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
