import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Upload, TrendingUp, Calendar, Edit2, Trash2, Plus, Save, X, Loader2, BookOpen, FileText, Map, ExternalLink } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { supabase } from '../../lib/supabase';
import type { Profile } from '../../contexts/AuthContext';

interface Stats {
  students: number;
  materials: number;
  leaderboardEntries: number;
}

interface Material {
  id: string;
  title: string;
  subject: string;
  class: string;
  file_url: string | null;
  type: 'book' | 'notes' | 'mindmap' | 'link';
  description: string | null;
  created_at: string;
}

interface LeaderboardEntry {
  id: string;
  student_id: string;
  score: number;
  rank: number;
  profiles: Profile;
}

type Tab = 'overview' | 'students' | 'materials' | 'leaderboard';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [stats, setStats] = useState<Stats>({ students: 0, materials: 0, leaderboardEntries: 0 });
  const [students, setStudents] = useState<Profile[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState<Profile | null>(null);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [newMaterial, setNewMaterial] = useState<Partial<Material>>({ type: 'book' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentsRes, materialsRes, leaderboardRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('role', 'student').order('created_at', { ascending: false }),
        supabase.from('materials').select('*').order('created_at', { ascending: false }),
        supabase.from('leaderboard').select('*, profiles(*)').order('rank', { ascending: true }),
      ]);

      setStudents(studentsRes.data ?? []);
      setMaterials(materialsRes.data ?? []);
      setLeaderboard(leaderboardRes.data ?? []);
      setStats({
        students: studentsRes.data?.length ?? 0,
        materials: materialsRes.data?.length ?? 0,
        leaderboardEntries: leaderboardRes.data?.length ?? 0,
      });
    } catch (error) {
      console.error('Error loading data:', error);
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
          marks: student.marks,
          email: student.email,
          phone: student.phone,
        })
        .eq('id', student.id);

      if (error) throw error;
      await loadData();
      setEditingStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Failed to update student');
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    try {
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (error) throw error;
      await loadData();
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student');
    }
  };

  const handleAddMaterial = async () => {
    if (!newMaterial.title || !newMaterial.subject || !newMaterial.class) {
      alert('Please fill all required fields');
      return;
    }

    setUploading(true);
    try {
      const { error } = await supabase.from('materials').insert({
        title: newMaterial.title,
        subject: newMaterial.subject,
        class: newMaterial.class,
        file_url: newMaterial.file_url || null,
        type: newMaterial.type || 'book',
        description: newMaterial.description || null,
      });

      if (error) throw error;
      await loadData();
      setShowAddMaterial(false);
      setNewMaterial({ type: 'book' });
    } catch (error) {
      console.error('Error adding material:', error);
      alert('Failed to add material');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this material?')) return;
    try {
      const { error } = await supabase.from('materials').delete().eq('id', id);
      if (error) throw error;
      await loadData();
    } catch (error) {
      console.error('Error deleting material:', error);
      alert('Failed to delete material');
    }
  };

  const handleUpdateLeaderboard = async (studentId: string, score: number) => {
    try {
      const { error } = await supabase
        .from('leaderboard')
        .upsert({ student_id: studentId, score, rank: 999 })
        .eq('student_id', studentId);

      if (error) throw error;

      await recalculateRanks();
      await loadData();
    } catch (error) {
      console.error('Error updating leaderboard:', error);
      alert('Failed to update leaderboard');
    }
  };

  const recalculateRanks = async () => {
    try {
      const { data } = await supabase.from('leaderboard').select('*').order('score', { ascending: false });
      if (!data) return;

      for (let i = 0; i < data.length; i++) {
        await supabase.from('leaderboard').update({ rank: i + 1 }).eq('id', data[i].id);
      }
    } catch (error) {
      console.error('Error recalculating ranks:', error);
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
          <h1 className="text-3xl font-bold text-slate-900 font-montserrat">Admin Dashboard</h1>
          <p className="text-slate-600 mt-1">Manage students, materials, and leaderboard</p>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-200">
          {(['overview', 'students', 'materials', 'leaderboard'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <p className="text-2xl font-bold text-slate-900">{stats.students}</p>
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
                    <BookOpen className="h-6 w-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Study Materials</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.materials}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary-700" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Leaderboard Entries</p>
                    <p className="text-2xl font-bold text-slate-900">{stats.leaderboardEntries}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Students</h2>
              <div className="space-y-3">
                {students.slice(0, 5).map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-slate-900">{student.full_name}</p>
                      <p className="text-sm text-slate-500">Class {student.class} - {student.username}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary-600">{student.attendance_percentage || 0}% Attendance</p>
                      <p className="text-sm text-slate-500">{student.marks || 0} Marks</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Username</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Class</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Attendance</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Marks</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((student) => (
                      editingStudent?.id === student.id ? (
                        <tr key={student.id} className="bg-primary-50">
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editingStudent.full_name}
                              onChange={(e) => setEditingStudent({ ...editingStudent, full_name: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editingStudent.username}
                              onChange={(e) => setEditingStudent({ ...editingStudent, username: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editingStudent.class || ''}
                              onChange={(e) => setEditingStudent({ ...editingStudent, class: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={editingStudent.attendance_percentage || 0}
                              onChange={(e) => setEditingStudent({ ...editingStudent, attendance_percentage: parseFloat(e.target.value) })}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={editingStudent.marks || 0}
                              onChange={(e) => setEditingStudent({ ...editingStudent, marks: parseFloat(e.target.value) })}
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
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">{student.full_name}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{student.username}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{student.class}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{student.attendance_percentage || 0}%</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{student.marks || 0}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingStudent(student)}
                                className="p-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteStudent(student.id)}
                                className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddMaterial(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <Plus className="h-5 w-5" />
                Add Material
              </button>
            </div>

            {showAddMaterial && (
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Add New Material</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newMaterial.title || ''}
                    onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                    className="px-4 py-3 border border-slate-300 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={newMaterial.subject || ''}
                    onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })}
                    className="px-4 py-3 border border-slate-300 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Class (e.g., 6, 7, 8)"
                    value={newMaterial.class || ''}
                    onChange={(e) => setNewMaterial({ ...newMaterial, class: e.target.value })}
                    className="px-4 py-3 border border-slate-300 rounded-xl"
                  />
                  <select
                    value={newMaterial.type || 'book'}
                    onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value as Material['type'] })}
                    className="px-4 py-3 border border-slate-300 rounded-xl"
                  >
                    <option value="book">Book</option>
                    <option value="notes">Notes</option>
                    <option value="mindmap">Mind Map</option>
                    <option value="link">NCERT Link</option>
                  </select>
                  <input
                    type="url"
                    placeholder="File URL or Link"
                    value={newMaterial.file_url || ''}
                    onChange={(e) => setNewMaterial({ ...newMaterial, file_url: e.target.value })}
                    className="px-4 py-3 border border-slate-300 rounded-xl md:col-span-2"
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={newMaterial.description || ''}
                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                    className="px-4 py-3 border border-slate-300 rounded-xl md:col-span-2 h-24"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleAddMaterial}
                    disabled={uploading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
                    {uploading ? 'Adding...' : 'Add Material'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddMaterial(false);
                      setNewMaterial({ type: 'book' });
                    }}
                    className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {materials.map((material) => (
                <div key={material.id} className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">{material.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs font-semibold bg-primary-100 text-primary-700 px-3 py-1 rounded-lg">
                        {material.subject}
                      </span>
                      <span className="text-xs font-semibold bg-accent-100 text-accent-700 px-3 py-1 rounded-lg">
                        Class {material.class}
                      </span>
                      <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg capitalize">
                        {material.type}
                      </span>
                    </div>
                    {material.description && <p className="text-sm text-slate-600 mt-2">{material.description}</p>}
                  </div>
                  <button
                    onClick={() => handleDeleteMaterial(material.id)}
                    className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex-shrink-0"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Class</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Update Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leaderboard.map((entry) => (
                      <tr key={entry.id} className={`hover:bg-slate-50 ${entry.rank <= 3 ? 'bg-primary-50/30' : ''}`}>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-bold ${entry.rank <= 3 ? 'text-primary-700' : 'text-slate-600'}`}>
                            #{entry.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{entry.profiles.full_name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{entry.profiles.class}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-primary-600">{entry.score}</td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            defaultValue={entry.score}
                            onBlur={(e) => handleUpdateLeaderboard(entry.student_id, parseFloat(e.target.value))}
                            className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Add Student to Leaderboard</h3>
              <div className="flex gap-3">
                <select
                  onChange={(e) => {
                    const studentId = e.target.value;
                    const score = prompt('Enter score for this student:');
                    if (score) handleUpdateLeaderboard(studentId, parseFloat(score));
                  }}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-xl"
                >
                  <option value="">Select a student...</option>
                  {students.filter((s) => !leaderboard.find((l) => l.student_id === s.id)).map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.full_name} - Class {student.class}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
