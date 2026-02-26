import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Edit2, Save, X, Loader2 } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { supabase } from '../../lib/supabase';

interface Profile {
  id: string;
  full_name: string;
  username: string;
  class: string;
  email: string;
  phone: string;
  address: string;
  attendance_percentage: number;
  role: string;
}

export const AdminDashboard = () => {
  const [students, setStudents] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState<Profile | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const studentsRes = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student')
        .order('created_at', { ascending: false });

      setStudents(studentsRes.data ?? []);
    } catch {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = async (student: Profile) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: student.full_name,
          class: student.class,
          address: student.address,
          attendance_percentage: student.attendance_percentage,
          email: student.email,
          phone: student.phone,
        })
        .eq('id', student.id);

      if (error) throw error;
      await loadData();
      setEditingStudent(null);
    } catch {
      alert('Failed to update student');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-montserrat">Teachers Corner</h1>
          <p className="text-slate-600 mt-1">Manage student attendance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Total Students</p>
                <p className="text-2xl font-bold text-slate-900">{students.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Average Attendance</p>
                <p className="text-2xl font-bold text-slate-900">
                  {students.length > 0
                    ? Math.round(
                        students.reduce((sum, s) => sum + (s.attendance_percentage || 0), 0) /
                          students.length
                      )
                    : 0}
                  %
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Student Attendance</h2>
            <p className="text-sm text-slate-500 mt-1">Manage and update student attendance records</p>
          </div>

          {students.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500">No students found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Class
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Attendance %
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((student) =>
                    editingStudent?.id === student.id ? (
                      <tr key={student.id} className="bg-primary-50">
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editingStudent.full_name}
                            onChange={(e) =>
                              setEditingStudent({ ...editingStudent, full_name: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editingStudent.username}
                            onChange={(e) =>
                              setEditingStudent({ ...editingStudent, username: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                            disabled
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editingStudent.class || ''}
                            onChange={(e) =>
                              setEditingStudent({ ...editingStudent, class: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={editingStudent.attendance_percentage || 0}
                            onChange={(e) =>
                              setEditingStudent({
                                ...editingStudent,
                                attendance_percentage: parseFloat(e.target.value),
                              })
                            }
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateStudent(editingStudent)}
                              className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                            >
                              <Save className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setEditingStudent(null)}
                              className="p-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr key={student.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          {student.full_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{student.username}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{student.class}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                              <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{
                                  width: `${Math.min(student.attendance_percentage || 0, 100)}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-slate-700">
                              {student.attendance_percentage || 0}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setEditingStudent(student)}
                            className="p-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
