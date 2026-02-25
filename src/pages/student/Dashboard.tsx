import { useState, useEffect } from 'react';
import { BookOpen, FileText, ExternalLink, Loader2, GraduationCap, Map, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';

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

export const StudentDashboard = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [expandedChapter, setExpandedChapter] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      loadSubjects(selectedClassId);
    } else {
      setSubjects([]);
      setSelectedSubjectId('');
    }
  }, [selectedClassId]);

  useEffect(() => {
    if (selectedSubjectId) {
      loadChapters(selectedSubjectId);
    } else {
      setChapters([]);
    }
  }, [selectedSubjectId]);

  const loadClasses = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('classes')
      .select('*')
      .order('display_order');
    setClasses(data || []);
    setLoading(false);
  };

  const loadSubjects = async (classId: string) => {
    const { data } = await supabase
      .from('subjects')
      .select('*')
      .eq('class_id', classId)
      .order('display_order');
    setSubjects(data || []);
  };

  const loadChapters = async (subjectId: string) => {
    const { data } = await supabase
      .from('chapters')
      .select('*')
      .eq('subject_id', subjectId)
      .order('display_order');
    setChapters(data || []);
  };

  const filteredSubjects = selectedClassId
    ? subjects.filter(s => s.class_id === selectedClassId)
    : [];

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
                Access study materials for Classes 6-10
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Select Class
          </h3>
          <div className="flex flex-wrap gap-2">
            {classes.map((cls) => (
              <button
                key={cls.id}
                onClick={() => {
                  setSelectedClassId(cls.id);
                  setSelectedSubjectId('');
                  setExpandedChapter('');
                }}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  selectedClassId === cls.id
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                {cls.name}
              </button>
            ))}
          </div>
        </div>

        {selectedClassId && filteredSubjects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Select Subject
            </h3>
            <div className="flex flex-wrap gap-2">
              {filteredSubjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => {
                    setSelectedSubjectId(subject.id);
                    setExpandedChapter('');
                  }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    selectedSubjectId === subject.id
                      ? 'bg-accent-600 text-white shadow-lg shadow-accent-200'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-accent-300 hover:bg-accent-50'
                  }`}
                >
                  {subject.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {!selectedClassId ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
              <GraduationCap className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-lg font-bold text-slate-500">Select a class to get started</p>
              <p className="text-sm text-slate-400 mt-1">
                Choose your class from the options above
              </p>
            </div>
          ) : !selectedSubjectId ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
              <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-lg font-bold text-slate-500">Select a subject</p>
              <p className="text-sm text-slate-400 mt-1">
                Choose a subject to view chapters
              </p>
            </div>
          ) : chapters.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
              <FileText className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-lg font-bold text-slate-500">No chapters available</p>
              <p className="text-sm text-slate-400 mt-1">
                Chapters will be added soon
              </p>
            </div>
          ) : (
            chapters.map((chapter, idx) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedChapter(expandedChapter === chapter.id ? '' : chapter.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-primary-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {chapter.title}
                      </h3>
                    </div>
                    {expandedChapter === chapter.id ? (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedChapter === chapter.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100 overflow-hidden"
                    >
                      <div className="p-6 space-y-6">
                        {chapter.ncert_link && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <ExternalLink className="h-4 w-4 text-primary-600" />
                              <h4 className="font-semibold text-slate-700">NCERT Link</h4>
                            </div>
                            <a
                              href={chapter.ncert_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Open NCERT Resource
                            </a>
                          </div>
                        )}

                        {chapter.notes && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4 text-accent-600" />
                              <h4 className="font-semibold text-slate-700">Notes</h4>
                            </div>
                            <div className="prose prose-sm max-w-none text-slate-600 bg-slate-50 p-4 rounded-lg">
                              {chapter.notes}
                            </div>
                          </div>
                        )}

                        {chapter.mindmap && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Map className="h-4 w-4 text-primary-600" />
                              <h4 className="font-semibold text-slate-700">Mind Map</h4>
                            </div>
                            <div className="prose prose-sm max-w-none text-slate-600 bg-primary-50 p-4 rounded-lg">
                              {chapter.mindmap}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
