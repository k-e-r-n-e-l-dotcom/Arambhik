import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Student {
  id: string;
  student_name: string;
  class_name: string;
  score: number;
  created_at: string;
}

interface ManageStudentsProps {
  addToast: (message: string, type: 'success' | 'error') => void;
}

export default function ManageStudents({ addToast }: ManageStudentsProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    student_name: '',
    class_name: '',
    score: 0,
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false });

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      addToast('Failed to load students', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.student_name.trim()) {
      addToast('Please enter student name', 'error');
      return;
    }
    if (!formData.class_name.trim()) {
      addToast('Please enter class name', 'error');
      return;
    }

    try {
      setSubmitting(true);

      if (editingStudent) {
        const { error } = await supabase
          .from('leaderboard')
          .update({
            student_name: formData.student_name.trim(),
            class_name: formData.class_name.trim(),
            score: formData.score,
          })
          .eq('id', editingStudent.id);

        if (error) throw error;
        addToast('Student updated successfully', 'success');
      } else {
        const { error } = await supabase.from('leaderboard').insert([
          {
            student_name: formData.student_name.trim(),
            class_name: formData.class_name.trim(),
            score: formData.score,
          },
        ]);

        if (error) throw error;
        addToast('Student added successfully', 'success');
      }

      resetForm();
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
      addToast('Failed to save student', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      student_name: student.student_name,
      class_name: student.class_name,
      score: student.score,
    });
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      const { error } = await supabase.from('leaderboard').delete().eq('id', id);

      if (error) throw error;

      addToast('Student deleted successfully', 'success');
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      addToast('Failed to delete student', 'error');
    }
  };

  const resetForm = () => {
    setEditingStudent(null);
    setFormData({
      student_name: '',
      class_name: '',
      score: 0,
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Students</h2>

      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {editingStudent ? 'Edit Student' : 'Add New Student'}
          </h3>
          {editingStudent && (
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student Name
            </label>
            <input
              type="text"
              value={formData.student_name}
              onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class Name
            </label>
            <input
              type="text"
              value={formData.class_name}
              onChange={(e) => setFormData({ ...formData, class_name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Class 9"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
            <input
              type="number"
              value={formData.score}
              onChange={(e) =>
                setFormData({ ...formData, score: parseInt(e.target.value) || 0 })
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
          {submitting
            ? editingStudent
              ? 'Updating...'
              : 'Adding...'
            : editingStudent
            ? 'Update Student'
            : 'Add Student'}
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Existing Students</h3>
        {students.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No students found. Add one above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Student Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Class
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Score
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{student.student_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{student.class_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{student.score}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(student)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit student"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete student"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
