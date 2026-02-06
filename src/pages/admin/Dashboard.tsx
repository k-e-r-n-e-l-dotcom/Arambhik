import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, BookOpen, Layers, UserPlus, Settings, Loader2 } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { supabase } from '../../lib/supabase';
import type { Profile } from '../../contexts/AuthContext';

interface Stats {
  students: number;
  teachers: number;
  classes: number;
  chapters: number;
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ students: 0, teachers: 0, classes: 0, chapters: 0 });
  const [recentStudents, setRecentStudents] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [studentsRes, teachersRes, classesRes, chaptersRes, recentRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'student'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'teacher'),
        supabase.from('classes').select('id', { count: 'exact', head: true }),
        supabase.from('chapters').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('*').eq('role', 'student').order('created_at', { ascending: false }).limit(5),
      ]);

      setStats({
        students: studentsRes.count ?? 0,
        teachers: teachersRes.count ?? 0,
        classes: classesRes.count ?? 0,
        chapters: chaptersRes.count ?? 0,
      });
      setRecentStudents(recentRes.data ?? []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Students', value: stats.students, icon: Users, color: 'bg-blue-500', link: '/admin/students' },
    { label: 'Teachers', value: stats.teachers, icon: GraduationCap, color: 'bg-emerald-500', link: '/admin/teachers' },
    { label: 'Classes', value: stats.classes, icon: Layers, color: 'bg-amber-500', link: '/admin/resources' },
    { label: 'Chapters', value: stats.chapters, icon: BookOpen, color: 'bg-rose-500', link: '/admin/resources' },
  ];

  const quickActions = [
    { label: 'Manage Students', desc: 'Add, edit, or remove student accounts', to: '/admin/students', icon: Users, color: 'text-blue-600 bg-blue-50 hover:bg-blue-100' },
    { label: 'Manage Teachers', desc: 'Add or remove teacher records', to: '/admin/teachers', icon: GraduationCap, color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' },
    { label: 'Study Materials', desc: 'Upload and organize learning resources', to: '/admin/resources', icon: BookOpen, color: 'text-amber-600 bg-amber-50 hover:bg-amber-100' },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 font-montserrat">Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of your learning management system</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statCards.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={card.link} className="block bg-white rounded-2xl p-6 shadow-soft border border-slate-100 hover:shadow-soft-lg hover:-translate-y-0.5 transition-all">
                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-4`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm text-slate-500 font-medium">{card.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{card.value}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-soft border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <Settings className="h-5 w-5 text-slate-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
            </div>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link key={action.to} to={action.to} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-colors ${action.color}`}>
                  <action.icon className="h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">{action.label}</p>
                    <p className="text-xs opacity-70">{action.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-soft border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Recent Students</h2>
              </div>
              <Link to="/admin/students" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</Link>
            </div>
            <div className="space-y-2">
              {recentStudents.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">No students yet</p>
              ) : (
                recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-sm text-slate-900">{student.full_name}</p>
                      <p className="text-xs text-slate-500">{student.username} - {student.class || 'No class'}</p>
                    </div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                      {student.class || '-'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};
