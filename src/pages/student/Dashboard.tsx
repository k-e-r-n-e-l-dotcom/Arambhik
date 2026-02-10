import { useState, useEffect } from 'react';
import { BookOpen, FileText, Download, ExternalLink, Loader2, GraduationCap, Map, File } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

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

export const StudentDashboard = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMaterials();
  }, [selectedClass]);

  useEffect(() => {
    filterMaterials();
  }, [materials, selectedType, selectedSubject, selectedClass]);

  const loadMaterials = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error loading materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMaterials = () => {
    let filtered = [...materials];

    if (selectedClass !== 'all') {
      filtered = filtered.filter((m) => m.class === selectedClass);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((m) => m.type === selectedType);
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter((m) => m.subject === selectedSubject);
    }

    setFilteredMaterials(filtered);
  };

  const uniqueClasses = Array.from(new Set(materials.map((m) => m.class))).sort();
  const uniqueSubjects = Array.from(new Set(materials.map((m) => m.subject)));

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book':
        return <BookOpen className="h-5 w-5" />;
      case 'notes':
        return <FileText className="h-5 w-5" />;
      case 'mindmap':
        return <Map className="h-5 w-5" />;
      case 'link':
        return <ExternalLink className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'book':
        return 'bg-primary-100 text-primary-700';
      case 'notes':
        return 'bg-accent-100 text-accent-700';
      case 'mindmap':
        return 'bg-primary-100 text-primary-600';
      case 'link':
        return 'bg-accent-100 text-accent-600';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeBadge = (type: string) => {
    const labels = {
      book: 'Book',
      notes: 'Notes',
      mindmap: 'Mind Map',
      link: 'NCERT Link'
    };
    return labels[type as keyof typeof labels] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-montserrat">
                Student Corner
              </h1>
              <p className="text-sm text-slate-500">
                Access all study materials and resources
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mb-3">
              <BookOpen className="h-5 w-5 text-primary-600" />
            </div>
            <p className="text-xs text-slate-500 font-medium">Total Materials</p>
            <p className="text-2xl font-bold text-slate-900">{materials.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100"
          >
            <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center mb-3">
              <FileText className="h-5 w-5 text-accent-600" />
            </div>
            <p className="text-xs text-slate-500 font-medium">Books</p>
            <p className="text-2xl font-bold text-slate-900">
              {materials.filter((m) => m.type === 'book').length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mb-3">
              <Map className="h-5 w-5 text-primary-600" />
            </div>
            <p className="text-xs text-slate-500 font-medium">Mind Maps</p>
            <p className="text-2xl font-bold text-slate-900">
              {materials.filter((m) => m.type === 'mindmap').length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100"
          >
            <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center mb-3">
              <ExternalLink className="h-5 w-5 text-accent-600" />
            </div>
            <p className="text-xs text-slate-500 font-medium">NCERT Links</p>
            <p className="text-2xl font-bold text-slate-900">
              {materials.filter((m) => m.type === 'link').length}
            </p>
          </motion.div>
        </div>

        <div className="mb-6 space-y-4">
          {uniqueClasses.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Filter by Class
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedClass('all')}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    selectedClass === 'all'
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  All Classes
                </button>
                {uniqueClasses.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      selectedClass === cls
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:bg-primary-50'
                    }`}
                  >
                    Class {cls}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Filter by Type
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  selectedType === 'all'
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                All Materials
              </button>
              {['book', 'notes', 'mindmap', 'link'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    selectedType === type
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  {getTypeBadge(type)}
                </button>
              ))}
            </div>
          </div>

          {uniqueSubjects.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Filter by Subject
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubject('all')}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    selectedSubject === 'all'
                      ? 'bg-accent-600 text-white shadow-lg shadow-accent-200'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-accent-300 hover:bg-accent-50'
                  }`}
                >
                  All Subjects
                </button>
                {uniqueSubjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      selectedSubject === subject
                        ? 'bg-accent-600 text-white shadow-lg shadow-accent-200'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-accent-300 hover:bg-accent-50'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {filteredMaterials.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
              <FileText className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-lg font-bold text-slate-500">No materials available</p>
              <p className="text-sm text-slate-400 mt-1">
                Check back soon for study materials
              </p>
            </div>
          ) : (
            filteredMaterials.map((material, idx) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`${getTypeColor(material.type)} w-10 h-10 rounded-xl flex items-center justify-center`}>
                          {getTypeIcon(material.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900">
                            {material.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-1 rounded-lg">
                              {material.subject}
                            </span>
                            <span className="text-xs font-semibold text-accent-700 bg-accent-50 px-2 py-1 rounded-lg">
                              Class {material.class}
                            </span>
                            <span className={`text-xs font-semibold ${getTypeColor(material.type)} px-2 py-1 rounded-lg`}>
                              {getTypeBadge(material.type)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {material.description && (
                        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                          {material.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                        <span>
                          Uploaded on {new Date(material.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {material.type === 'link' ? (
                        <a
                          href={material.file_url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open Link
                        </a>
                      ) : (
                        <a
                          href={material.file_url || '#'}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
