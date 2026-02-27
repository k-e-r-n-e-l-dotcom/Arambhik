import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Subject {
  id: string;
  name: string;
  class_id: string;
  classes: { name: string };
}

interface Chapter {
  id: string;
  title: string;
  display_order: number;
  ncert_link: string;
  notes: string;
  mindmap: string;
  subject_id: string;
}

interface ManageChaptersProps {
  addToast: (message: string, type: 'success' | 'error') => void;
}

export default function ManageChapters({ addToast }: ManageChaptersProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    display_order: 0,
    ncert_link: '',
    notes: '',
    mindmap: '',
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubjectId) {
      fetchChapters(selectedSubjectId);
    } else {
      setChapters([]);
    }
  }, [selectedSubjectId]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('subjects')
        .select('*, classes(name)')
        .order('name', { ascending: true });

      if (error) throw error;
      setSubjects(data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      addToast('Failed to load subjects', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchChapters = async (subjectId: string) => {
    try {
      setLoadingChapters(true);
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .eq('subject_id', subjectId)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setChapters(data || []);
    } catch (error) {
      console.error('Error fetching chapters:', error);
      addToast('Failed to load chapters', 'error');
    } finally {
      setLoadingChapters(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubjectId) {
      addToast('Please select a subject first', 'error');
      return;
    }
    if (!formData.title.trim()) {
      addToast('Please enter a chapter title', 'error');
      return;
    }

    try {
      setSubmitting(true);

      if (editingChapter) {
        const { error } = await supabase
          .from('chapters')
          .update({
            title: formData.title.trim(),
            display_order: formData.display_order,
            ncert_link: formData.ncert_link.trim(),
            notes: formData.notes.trim(),
            mindmap: formData.mindmap.trim(),
          })
          .eq('id', editingChapter.id);

        if (error) throw error;
        addToast('Chapter updated successfully', 'success');
      } else {
        const { error } = await supabase.from('chapters').insert([
          {
            title: formData.title.trim(),
            display_order: formData.display_order,
            ncert_link: formData.ncert_link.trim(),
            notes: formData.notes.trim(),
            mindmap: formData.mindmap.trim(),
            subject_id: selectedSubjectId,
          },
        ]);

        if (error) throw error;
        addToast('Chapter added successfully', 'success');
      }

      resetForm();
      fetchChapters(selectedSubjectId);
    } catch (error) {
      console.error('Error saving chapter:', error);
      addToast('Failed to save chapter', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (chapter: Chapter) => {
    setEditingChapter(chapter);
    setFormData({
      title: chapter.title,
      display_order: chapter.display_order,
      ncert_link: chapter.ncert_link,
      notes: chapter.notes,
      mindmap: chapter.mindmap,
    });
  };

  const handleDeleteChapter = async (id: string) => {
    if (!confirm('Are you sure you want to delete this chapter?')) {
      return;
    }

    try {
      const { error } = await supabase.from('chapters').delete().eq('id', id);

      if (error) throw error;

      addToast('Chapter deleted successfully', 'success');
      fetchChapters(selectedSubjectId);
    } catch (error) {
      console.error('Error deleting chapter:', error);
      addToast('Failed to delete chapter', 'error');
    }
  };

  const resetForm = () => {
    setEditingChapter(null);
    setFormData({
      title: '',
      display_order: 0,
      ncert_link: '',
      notes: '',
      mindmap: '',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Chapters</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Subject</label>
        <select
          value={selectedSubjectId}
          onChange={(e) => {
            setSelectedSubjectId(e.target.value);
            resetForm();
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose a subject...</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.classes.name} - {subject.name}
            </option>
          ))}
        </select>
      </div>

      {selectedSubjectId && (
        <>
          <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingChapter ? 'Edit Chapter' : 'Add New Chapter'}
              </h3>
              {editingChapter && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chapter Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Introduction to Algebra"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NCERT Link
                </label>
                <input
                  type="url"
                  value={formData.ncert_link}
                  onChange={(e) => setFormData({ ...formData, ncert_link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://ncert.nic.in/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Enter chapter notes..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mindmap (separate points by new lines)
                </label>
                <textarea
                  value={formData.mindmap}
                  onChange={(e) => setFormData({ ...formData, mindmap: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Point 1&#10;Point 2&#10;Point 3"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              <Plus className="h-5 w-5" />
              {submitting
                ? editingChapter
                  ? 'Updating...'
                  : 'Adding...'
                : editingChapter
                ? 'Update Chapter'
                : 'Add Chapter'}
            </button>
          </form>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Existing Chapters</h3>
            {loadingChapters ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : chapters.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No chapters found. Add one above.</p>
            ) : (
              <div className="space-y-3">
                {chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{chapter.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Display Order: {chapter.display_order}
                        </p>
                        {chapter.ncert_link && (
                          <a
                            href={chapter.ncert_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                          >
                            View NCERT Link
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(chapter)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit chapter"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteChapter(chapter.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete chapter"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
