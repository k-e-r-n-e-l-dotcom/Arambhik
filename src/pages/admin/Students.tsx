import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserPlus, Upload, Trash2, KeyRound, Edit3, X, Loader2, FileSpreadsheet, CheckCircle2, AlertCircle, Users, Download } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';
import { parseExcelFile, ParsedStudent, exportCredentialsToExcel } from '../../utils/excelParser';

interface Profile {
  id: string; full_name: string; role: string; username: string; email: string;
  phone: string | null; class: string | null; father_mobile: string | null;
  mother_mobile: string | null; student_mobile: string | null;
  teacher_subject: string | null; created_at: string; updated_at: string;
}

type View = 'list' | 'add' | 'csv';

const API = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-users`;

const Toast = ({ msg, type, onClose }: { msg: string; type: 'success' | 'error'; onClose: () => void }) => (
  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
    className={`fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
    {type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
    {msg}
    <button onClick={onClose} className="ml-2"><X className="h-3.5 w-3.5" /></button>
  </motion.div>
);

export const AdminStudents = () => {
  const { session } = useAuth();
  const [students, setStudents] = useState<Profile[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [view, setView] = useState<View>('list');
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Profile>>({});
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [csvPreview, setCsvPreview] = useState<ParsedStudent[]>([]);
  const [csvErrors, setCsvErrors] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ full_name: '', username: '', password: 'AA@1234', class: '', email: '', father_mobile: '', mother_mobile: '', student_mobile: '' });

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` };
  const notify = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const apiFetch = useCallback(async (action: string, body: Record<string, unknown>) => {
    const res = await fetch(API, { method: 'POST', headers, body: JSON.stringify({ action, ...body }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }, [session?.access_token]);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch('list-users', { role: 'student' });
      setStudents(data.users || []);
    } catch { notify('Failed to load students', 'error'); }
    setLoading(false);
  }, [apiFetch]);

  useEffect(() => { if (session) fetchStudents(); }, [session, fetchStudents]);

  const filtered = students.filter(s =>
    [s.full_name, s.username, s.class, s.email].some(v => v?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('add');
    try {
      await apiFetch('bulk-create-students', { students: [{ name: form.full_name, username: form.username, password: form.password, class: form.class, email: form.email, father_mobile: form.father_mobile, mother_mobile: form.mother_mobile, student_mobile: form.student_mobile }] });
      notify('Student added successfully');
      setForm({ full_name: '', username: '', password: 'AA@1234', class: '', email: '', father_mobile: '', mother_mobile: '', student_mobile: '' });
      setView('list');
      fetchStudents();
    } catch (err: any) { notify(err.message, 'error'); }
    setActionLoading(null);
  };

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { students: parsed, errors } = await parseExcelFile(file);
      setCsvPreview(parsed);
      setCsvErrors(errors);
    } catch (err: any) {
      notify(err.message, 'error');
      setCsvErrors([err.message]);
    }
  };

  const submitCSV = async () => {
    if (!csvPreview.length) return;
    setActionLoading('csv');
    try {
      await apiFetch('bulk-create-students', { students: csvPreview });
      notify(`${csvPreview.length} students uploaded successfully`);
      setCsvPreview([]);
      setCsvErrors([]);
      setView('list');
      if (fileRef.current) fileRef.current.value = '';
      fetchStudents();
    } catch (err: any) { notify(err.message, 'error'); }
    setActionLoading(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this student permanently?')) return;
    setActionLoading(id);
    try {
      await apiFetch('delete-user', { userId: id });
      notify('Student deleted');
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (err: any) { notify(err.message, 'error'); }
    setActionLoading(null);
  };

  const handleResetPassword = async (id: string) => {
    const pw = prompt('Enter new password:', 'AA@1234');
    if (!pw) return;
    setActionLoading(id);
    try {
      await apiFetch('reset-password', { userId: id, newPassword: pw });
      notify('Password reset successfully');
    } catch (err: any) { notify(err.message, 'error'); }
    setActionLoading(null);
  };

  const startEdit = (s: Profile) => { setEditId(s.id); setEditData({ full_name: s.full_name, class: s.class, email: s.email, father_mobile: s.father_mobile, mother_mobile: s.mother_mobile, student_mobile: s.student_mobile }); };

  const handleExportCredentials = async () => {
    setActionLoading('export');
    try {
      const allUsers = await apiFetch('list-users', {});
      const credentialsData = allUsers.users.map((user: Profile) => ({
        name: user.full_name,
        role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
        username: user.username,
        password: '(Contact Admin)',
        class: user.class || '',
        contact: user.phone || user.student_mobile || '',
      }));
      exportCredentialsToExcel(credentialsData);
      notify('Credentials exported successfully');
    } catch (err: any) {
      notify(err.message, 'error');
    }
    setActionLoading(null);
  };

  const saveEdit = async () => {
    if (!editId) return;
    setActionLoading(editId);
    try {
      await apiFetch('update-profile', { userId: editId, updates: editData });
      notify('Student updated');
      setStudents(prev => prev.map(s => s.id === editId ? { ...s, ...editData } as Profile : s));
      setEditId(null);
    } catch (err: any) { notify(err.message, 'error'); }
    setActionLoading(null);
  };

  const Btn = ({ onClick, children, variant = 'default', disabled = false }: { onClick: () => void; children: React.ReactNode; variant?: string; disabled?: boolean }) => {
    const base = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-50';
    const styles: Record<string, string> = {
      default: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
      danger: 'bg-red-50 text-red-600 hover:bg-red-100',
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
    };
    return <button onClick={onClick} disabled={disabled} className={`${base} ${styles[variant] || styles.default}`}>{children}</button>;
  };

  return (
    <AdminLayout>
      <AnimatePresence>{toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-xl"><Users className="h-6 w-6 text-blue-600" /></div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Students</h1>
              <p className="text-sm text-slate-500">{students.length} total students</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleExportCredentials} disabled={actionLoading === 'export'} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50">
              {actionLoading === 'export' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Export Credentials
            </button>
            <button onClick={() => { setView('csv'); setCsvPreview([]); setCsvErrors([]); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
              <Upload className="h-4 w-4" />Excel Upload
            </button>
            <button onClick={() => setView('add')} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-sm">
              <UserPlus className="h-4 w-4" />Add Student
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'csv' && (
            <motion.div key="csv" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 bg-white rounded-2xl shadow-soft border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><FileSpreadsheet className="h-5 w-5 text-blue-600" /><h2 className="font-semibold text-slate-900">Bulk Upload via Excel</h2></div>
                <button onClick={() => setView('list')}><X className="h-5 w-5 text-slate-400 hover:text-slate-600" /></button>
              </div>
              <p className="text-xs text-slate-500 mb-3">Excel columns: Student Name, Class, Father Mobile, Mother Mobile, Student Mobile</p>
              <p className="text-xs text-slate-400 mb-3">Username format: firstname + class number (e.g., aditya6). Password format: AA@ + last 4 digits of student mobile</p>
              <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              {csvErrors.length > 0 && <div className="mt-3 p-3 bg-red-50 rounded-xl text-xs text-red-600">{csvErrors.map((e, i) => <p key={i}>{e}</p>)}</div>}
              {csvPreview.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">{csvPreview.length} students ready</p>
                  <div className="max-h-40 overflow-auto rounded-xl border border-slate-200">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-50 sticky top-0"><tr>{['Name','Class','Username','Password'].map(h => <th key={h} className="px-3 py-2 text-left text-slate-600 font-medium">{h}</th>)}</tr></thead>
                      <tbody className="divide-y divide-slate-100">{csvPreview.slice(0, 10).map((s, i) => <tr key={i}><td className="px-3 py-2 text-slate-800">{s.name}</td><td className="px-3 py-2 text-slate-600">{s.class}</td><td className="px-3 py-2 text-slate-600 font-mono">{s.username}</td><td className="px-3 py-2 text-slate-600 font-mono">{s.password}</td></tr>)}</tbody>
                    </table>
                  </div>
                  {csvPreview.length > 10 && <p className="text-xs text-slate-400 mt-1">...and {csvPreview.length - 10} more</p>}
                  <button onClick={submitCSV} disabled={actionLoading === 'csv'} className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
                    {actionLoading === 'csv' ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}Upload All
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {view === 'add' && (
            <motion.div key="add" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 bg-white rounded-2xl shadow-soft border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-blue-600" /><h2 className="font-semibold text-slate-900">Add Student</h2></div>
                <button onClick={() => setView('list')}><X className="h-5 w-5 text-slate-400 hover:text-slate-600" /></button>
              </div>
              <form onSubmit={handleAddStudent} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { key: 'full_name', label: 'Full Name', required: true },
                  { key: 'username', label: 'Username (e.g. AA001)', required: true },
                  { key: 'password', label: 'Password' },
                  { key: 'class', label: 'Class' },
                  { key: 'email', label: 'Email' },
                  { key: 'father_mobile', label: 'Father Mobile' },
                  { key: 'mother_mobile', label: 'Mother Mobile' },
                  { key: 'student_mobile', label: 'Student Mobile' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-medium text-slate-600 mb-1">{f.label}</label>
                    <input required={f.required} value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                  </div>
                ))}
                <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-2 mt-2">
                  <button type="button" onClick={() => setView('list')} className="px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">Cancel</button>
                  <button type="submit" disabled={actionLoading === 'add'} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
                    {actionLoading === 'add' && <Loader2 className="h-4 w-4 animate-spin" />}Add Student
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white rounded-2xl shadow-soft border border-slate-100">
          <div className="p-4 border-b border-slate-100">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Users className="h-10 w-10 mb-2" /><p className="text-sm">No students found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-slate-100 bg-slate-50/50">
                  {['Name','Username','Class','Email','Phone','Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>)}
                </tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(s => (
                    <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-slate-50/50 transition-colors">
                      {editId === s.id ? (<>
                        <td className="px-4 py-2.5"><input value={editData.full_name || ''} onChange={e => setEditData(p => ({ ...p, full_name: e.target.value }))} className="w-full px-2 py-1 rounded-lg border border-slate-200 text-sm" /></td>
                        <td className="px-4 py-2.5 text-slate-600">{s.username}</td>
                        <td className="px-4 py-2.5"><input value={editData.class || ''} onChange={e => setEditData(p => ({ ...p, class: e.target.value }))} className="w-full px-2 py-1 rounded-lg border border-slate-200 text-sm" /></td>
                        <td className="px-4 py-2.5"><input value={editData.email || ''} onChange={e => setEditData(p => ({ ...p, email: e.target.value }))} className="w-full px-2 py-1 rounded-lg border border-slate-200 text-sm" /></td>
                        <td className="px-4 py-2.5"><input value={editData.student_mobile || ''} onChange={e => setEditData(p => ({ ...p, student_mobile: e.target.value }))} className="w-full px-2 py-1 rounded-lg border border-slate-200 text-sm" /></td>
                        <td className="px-4 py-2.5"><div className="flex gap-1">
                          <Btn onClick={saveEdit} variant="primary" disabled={actionLoading === s.id}>{actionLoading === s.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle2 className="h-3 w-3" />}Save</Btn>
                          <Btn onClick={() => setEditId(null)}>Cancel</Btn>
                        </div></td>
                      </>) : (<>
                        <td className="px-4 py-2.5 font-medium text-slate-900">{s.full_name}</td>
                        <td className="px-4 py-2.5 text-slate-600 font-mono text-xs">{s.username}</td>
                        <td className="px-4 py-2.5"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs">{s.class || '--'}</span></td>
                        <td className="px-4 py-2.5 text-slate-600">{s.email || '--'}</td>
                        <td className="px-4 py-2.5 text-slate-600">{s.student_mobile || '--'}</td>
                        <td className="px-4 py-2.5"><div className="flex gap-1">
                          <Btn onClick={() => startEdit(s)}><Edit3 className="h-3 w-3" />Edit</Btn>
                          <Btn onClick={() => handleResetPassword(s.id)}><KeyRound className="h-3 w-3" />Reset</Btn>
                          <Btn onClick={() => handleDelete(s.id)} variant="danger" disabled={actionLoading === s.id}>{actionLoading === s.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}Delete</Btn>
                        </div></td>
                      </>)}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </AdminLayout>
  );
};
