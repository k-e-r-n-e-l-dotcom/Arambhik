import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Class {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  name: string;
  class_id: string;
  display_order: number;
}

interface ManageSubjectsProps {
  addToast: (message: string, type: 'success' | 'error') => void;
}

export default function ManageSubjects({ addToast }: ManageSubjectsProps) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', display_order: 0 });

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      fetchSubjects(selectedClassId);
    } else {
      setSubjects([]);
    }
  }, [selectedClassId]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setClasses(data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
      addToast('Failed to load classes', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async (classId: string) => {
    try {
      setLoadingSubjects(true);
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('class_id', classId)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setSubjects(data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      addToast('Failed to load subjects', 'error');
    } finally {
      setLoadingSubjects(false);
    }
  };

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassId) {
      addToast('Please select a class first', 'error');
      return;
    }
    if (!newSubject.name.trim()) {
      addToast('Please enter a subject name', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const { error } = await supabase.from('subjects').insert([
        {
          name: newSubject.name.trim(),
          class_id: selectedClassId,
          display_order: newSubject.display_order,
        },
      ]);

      if (error) throw error;

      addToast('Subject added successfully', 'success');
      setNewSubject({ name: '', display_order: 0 });
      fetchSubjects(selectedClassId);
    } catch (error) {
      console.error('Error adding subject:', error);
      addToast('Failed to add subject', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSubject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subject? This will also delete all related chapters.')) {
      return;
    }

    try {
      const { error } = await supabase.from('subjects').delete().eq('id', id);

      if (error) throw error;

      addToast('Subject deleted successfully', 'success');
      fetchSubjects(selectedClassId);
    } catch (error) {
      console.error('Error deleting subject:', error);
      addToast('Failed to delete subject', 'error');
    }
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Subjects</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
        <select
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose a class...</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {selectedClassId && (
        <>
          <form onSubmit={handleAddSubject} className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Subject</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Name
                </label>
                <input
                  type="text"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Mathematics"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={newSubject.display_order}
                  onChange={(e) =>
                    setNewSubject({ ...newSubject, display_order: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              <Plus className="h-5 w-5" />
              {submitting ? 'Adding...' : 'Add Subject'}
            </button>
          </form>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Existing Subjects</h3>
            {loadingSubjects ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : subjects.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No subjects found. Add one above.</p>
            ) : (
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                      <p className="text-sm text-gray-600">Display Order: {subject.display_order}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteSubject(subject.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete subject"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
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
