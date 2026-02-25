import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { supabase } from '../../lib/supabase';
import { BookOpen, Plus, Edit, Trash2, Save, X, Loader2, FileText, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Class {
  id: string;
  name: string;
  display_order: number;
}

interface Subject {
  id: string;
  class_id: string;
  name: string;
  display_order: number;
}

interface Chapter {
  id: string;
  subject_id: string;
  title: string;
  ncert_link: string;
  notes: string;
  mindmap: string;
  display_order: number;
}

const empty = { title: '', ncert_link: '', notes: '', mindmap: '' };

export const AdminResources = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selClass, setSelClass] = useState<string | null>(null);
  const [selSubject, setSelSubject] = useState<string | null>(null);
  const [editing, setEditing] = useState<Chapter | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('classes').select('*').order('display_order');
      if (data) {
        setClasses(data);
        if (data.length > 0) setSelClass(data[0].id);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!selClass) return;
    setSubjects([]);
    setSelSubject(null);
    setChapters([]);
    supabase.from('subjects').select('*').eq('class_id', selClass).order('display_order')
      .then(({ data }) => {
        if (data) {
          setSubjects(data);
          if (data.length > 0) setSelSubject(data[0].id);
        }
      });
  }, [selClass]);

  useEffect(() => {
    if (!selSubject) { setChapters([]); return; }
    supabase.from('chapters').select('*').eq('subject_id', selSubject).order('display_order')
      .then(({ data }) => { if (data) setChapters(data); });
  }, [selSubject]);

  const openAdd = () => { setForm(empty); setEditing(null); setAdding(true); };
  const openEdit = (ch: Chapter) => {
    setForm({
      title: ch.title,
      ncert_link: ch.ncert_link || '',
      notes: ch.notes || '',
      mindmap: ch.mindmap || ''
    });
    setEditing(ch);
    setAdding(true);
  };
  const closeModal = () => { setAdding(false); setEditing(null); setForm(empty); };

  const handleSave = async () => {
    if (!form.title.trim() || !selSubject) return;
    setSaving(true);
    if (editing) {
      await supabase.from('chapters').update({
        title: form.title,
        ncert_link: form.ncert_link,
        notes: form.notes,
        mindmap: form.mindmap
      }).eq('id', editing.id);
    } else {
      await supabase.from('chapters').insert({
        subject_id: selSubject,
        title: form.title,
        ncert_link: form.ncert_link,
        notes: form.notes,
        mindmap: form.mindmap,
        display_order: chapters.length + 1
      });
    }
    const { data } = await supabase.from('chapters').select('*')
      .eq('subject_id', selSubject).order('display_order');
    if (data) setChapters(data);
    closeModal();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this chapter?')) return;
    await supabase.from('chapters').delete().eq('id', id);
    if (selSubject) {
      const { data } = await supabase.from('chapters').select('*')
        .eq('subject_id', selSubject).order('display_order');
      if (data) setChapters(data);
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-blue-600" /> Study Materials
        </h1>
        <p className="text-sm text-slate-500 mt-1">Manage classes, subjects, and chapters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">Classes</p>
            <div className="space-y-1">
              {classes.map((c) => (
                <button key={c.id} onClick={() => setSelClass(c.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    selClass === c.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}>{c.name}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">Subjects</p>
            <div className="space-y-1">
              {subjects.length === 0 && (
                <p className="text-xs text-slate-400 px-2 py-4 text-center">No subjects found</p>
              )}
              {subjects.map((s) => (
                <button key={s.id} onClick={() => setSelSubject(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    selSubject === s.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}>
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Chapters</p>
              {selSubject && (
                <button onClick={openAdd}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="h-3.5 w-3.5" /> Add Chapter
                </button>
              )}
            </div>
            {chapters.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <FileText className="h-10 w-10 mb-2" />
                <p className="text-sm">{selSubject ? 'No chapters yet' : 'Select a subject'}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {chapters.map((ch, i) => (
                    <motion.div key={ch.id} layout
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors group">
                      <span className="text-xs font-bold text-slate-300 w-6 text-center">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{ch.title}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          {ch.ncert_link && (
                            <span className="text-xs text-blue-500 flex items-center gap-1">
                              <LinkIcon className="h-3 w-3" /> NCERT
                            </span>
                          )}
                          {ch.notes && <span className="text-xs text-slate-400 flex items-center gap-1">
                            <FileText className="h-3 w-3" /> Notes
                          </span>}
                          {ch.mindmap && <span className="text-xs text-slate-400 flex items-center gap-1">
                            <FileText className="h-3 w-3" /> Mindmap
                          </span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(ch)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => handleDelete(ch.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && closeModal()}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  {editing ? 'Edit Chapter' : 'New Chapter'}
                </h3>
                <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input type="text" value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Chapter title" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">NCERT Link</label>
                  <input type="url" value={form.ncert_link}
                    onChange={(e) => setForm({ ...form, ncert_link: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://ncert.nic.in/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notes (300+ words)</label>
                  <textarea value={form.notes} rows={5}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Study notes for this chapter..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mind Map</label>
                  <textarea value={form.mindmap} rows={4}
                    onChange={(e) => setForm({ ...form, mindmap: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Mind map content for this chapter..." />
                </div>
              </div>
              <div className="p-5 border-t border-slate-100 flex items-center gap-3 justify-end">
                <button onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving || !form.title.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};
