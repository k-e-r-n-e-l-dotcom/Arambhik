import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Trash2, GraduationCap, Phone, BookOpen, Loader2, Users, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';

type Profile = {
  id: string; full_name: string; role: string; username: string; email: string;
  phone: string; class: string; father_mobile: string; mother_mobile: string;
  student_mobile: string; teacher_subject: string; created_at: string; updated_at: string;
};

type TeacherForm = { name: string; subject: string; phone: string; username: string; password: string };

const emptyForm: TeacherForm = { name: '', subject: '', phone: '', username: '', password: '' };

const API_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-users`;

export function AdminTeachers() {
  const { session } = useAuth();
  const [teachers, setTeachers] = useState<Profile[]>([]);
  const [form, setForm] = useState<TeacherForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` };

  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        method: 'POST', headers,
        body: JSON.stringify({ action: 'list-users', role: 'teacher' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch teachers');
      setTeachers(data.users || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [session?.access_token]);

  useEffect(() => { fetchTeachers(); }, [fetchTeachers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess(''); setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST', headers,
        body: JSON.stringify({ action: 'create-teacher', teacher: { ...form } }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create teacher');
      setSuccess(`${form.name} added successfully`);
      setForm(emptyForm);
      await fetchTeachers();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (userId: string, name: string) => {
    if (!confirm(`Remove ${name} from the system?`)) return;
    setError(''); setSuccess(''); setDeletingId(userId);
    try {
      const res = await fetch(API_URL, {
        method: 'POST', headers,
        body: JSON.stringify({ action: 'delete-user', userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete teacher');
      setSuccess(`${name} removed successfully`);
      await fetchTeachers();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setDeletingId(null);
    }
  };

  const updateField = (field: keyof TeacherForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const inputClass = 'w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder:text-slate-400';

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 rounded-xl">
            <GraduationCap className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Teachers</h1>
            <p className="text-sm text-slate-500">Manage teaching staff</p>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </motion.div>
          )}
          {success && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> {success}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-soft border border-slate-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-semibold text-slate-700">Add New Teacher</h2>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" placeholder="Full Name" value={form.name} onChange={updateField('name')} required className={inputClass} />
            <input type="text" placeholder="Subject" value={form.subject} onChange={updateField('subject')} required className={inputClass} />
            <input type="tel" placeholder="Phone Number" value={form.phone} onChange={updateField('phone')} required className={inputClass} />
            <input type="text" placeholder="Username" value={form.username} onChange={updateField('username')} required className={inputClass} />
            <input type="password" placeholder="Password" value={form.password} onChange={updateField('password')} required minLength={6} className={inputClass} />
            <button type="submit" disabled={submitting}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              {submitting ? 'Adding...' : 'Add Teacher'}
            </button>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-soft border border-slate-100">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-500" />
              <h2 className="text-sm font-semibold text-slate-700">All Teachers</h2>
            </div>
            <span className="text-xs text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">{teachers.length} total</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
            </div>
          ) : teachers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <GraduationCap className="w-10 h-10 mb-2 opacity-40" />
              <p className="text-sm">No teachers found</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              <AnimatePresence>
                {teachers.map((t, i) => (
                  <motion.div key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{t.full_name}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          {t.teacher_subject && (
                            <span className="flex items-center gap-1 text-xs text-slate-500">
                              <BookOpen className="w-3 h-3" /> {t.teacher_subject}
                            </span>
                          )}
                          {t.phone && (
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                              <Phone className="w-3 h-3" /> {t.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(t.id, t.full_name)} disabled={deletingId === t.id}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-50 transition-all shrink-0">
                      {deletingId === t.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}
