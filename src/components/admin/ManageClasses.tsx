import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Class {
  id: string;
  name: string;
  display_order: number;
}

interface ManageClassesProps {
  addToast: (message: string, type: 'success' | 'error') => void;
}

export default function ManageClasses({ addToast }: ManageClassesProps) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', display_order: 0 });

  useEffect(() => {
    fetchClasses();
  }, []);

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

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.name.trim()) {
      addToast('Please enter a class name', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const { error } = await supabase.from('classes').insert([
        {
          name: newClass.name.trim(),
          display_order: newClass.display_order,
        },
      ]);

      if (error) throw error;

      addToast('Class added successfully', 'success');
      setNewClass({ name: '', display_order: 0 });
      fetchClasses();
    } catch (error) {
      console.error('Error adding class:', error);
      addToast('Failed to add class', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClass = async (id: string) => {
    if (!confirm('Are you sure you want to delete this class? This will also delete all related subjects and chapters.')) {
      return;
    }

    try {
      const { error } = await supabase.from('classes').delete().eq('id', id);

      if (error) throw error;

      addToast('Class deleted successfully', 'success');
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
      addToast('Failed to delete class', 'error');
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Classes</h2>

      <form onSubmit={handleAddClass} className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Class</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class Name
            </label>
            <input
              type="text"
              value={newClass.name}
              onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Class 9"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={newClass.display_order}
              onChange={(e) =>
                setNewClass({ ...newClass, display_order: parseInt(e.target.value) || 0 })
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
          {submitting ? 'Adding...' : 'Add Class'}
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Existing Classes</h3>
        {classes.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No classes found. Add one above.</p>
        ) : (
          <div className="space-y-3">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div>
                  <h4 className="font-semibold text-gray-900">{cls.name}</h4>
                  <p className="text-sm text-gray-600">Display Order: {cls.display_order}</p>
                </div>
                <button
                  onClick={() => handleDeleteClass(cls.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete class"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
