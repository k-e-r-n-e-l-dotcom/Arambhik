import { useState, useEffect } from 'react';
import { BookOpen, FileText, Target, ChevronDown, ChevronUp, ExternalLink, Loader2, GraduationCap, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase, Class, Subject, Chapter } from '../../lib/supabase';

interface SubjectWithChapters extends Subject {
  chapters: Chapter[];
}

interface ClassWithSubjects extends Class {
  subjects: SubjectWithChapters[];
}

export const StudentDashboard = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [classesData, setClassesData] = useState<ClassWithSubjects[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [currentClassData, setCurrentClassData] = useState<ClassWithSubjects | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    const current = classesData.find((c) => c.name === selectedClass);
    setCurrentClassData(current || null);
    setExpandedChapters(new Set());
  }, [selectedClass, classesData]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const { data: classes } = await supabase.from('classes').select('*').order('display_order');
      const result: ClassWithSubjects[] = [];

      for (const cls of classes || []) {
        const { data: subjects } = await supabase.from('subjects').select('*').eq('class_id', cls.id).order('display_order');
        const subjectsWithChapters: SubjectWithChapters[] = [];

        for (const subject of subjects || []) {
          const { data: chapters } = await supabase.from('chapters').select('*').eq('subject_id', subject.id).order('display_order');
          subjectsWithChapters.push({ ...subject, chapters: chapters || [] });
        }
        result.push({ ...cls, subjects: subjectsWithChapters });
      }

      setClassesData(result);
      const studentClass = profile?.class || '';
      const match = result.find((c) => c.name === studentClass);
      setSelectedClass(match ? match.name : result[0]?.name || '');
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const toggleChapter = (id: string) => {
    const next = new Set(expandedChapters);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpandedChapters(next);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-montserrat">
                  Welcome, {profile?.full_name}
                </h1>
                <p className="text-sm text-slate-500">{profile?.class || 'Student'} - {profile?.username}</p>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xs text-slate-500 font-medium">Chapters</p>
            <p className="text-2xl font-bold text-slate-900">{currentClassData?.subjects.reduce((s, sub) => s + sub.chapters.length, 0) || 0}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
              <BookOpen className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500 font-medium">Subjects</p>
            <p className="text-2xl font-bold text-slate-900">{currentClassData?.subjects.length || 0}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100 col-span-2 md:col-span-1">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
              <FileText className="h-5 w-5 text-amber-600" />
            </div>
            <p className="text-xs text-slate-500 font-medium">Your Class</p>
            <p className="text-2xl font-bold text-slate-900">{selectedClass || '-'}</p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mb-8">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Select Class</h3>
          <div className="flex flex-wrap gap-2">
            {classesData.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls.name)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  selectedClass === cls.name
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                {cls.name}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          {currentClassData?.subjects.map((subject, idx) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`${subject.color || 'bg-blue-500'} w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
                    {subject.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{subject.name}</h3>
                    <p className="text-sm text-slate-500">{subject.chapters.length} chapters available</p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-50">
                {subject.chapters.map((chapter) => {
                  const isExpanded = expandedChapters.has(chapter.id);
                  return (
                    <div key={chapter.id} className="hover:bg-slate-50/50 transition-colors">
                      <div className="p-4 md:p-5 flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 text-sm md:text-base">{chapter.title}</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {chapter.ncert_link && (
                              <a
                                href={chapter.ncert_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                                NCERT Textbook
                              </a>
                            )}
                            {chapter.notes && (
                              <button
                                onClick={() => toggleChapter(chapter.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors"
                              >
                                <FileText className="h-3.5 w-3.5" />
                                Study Notes
                              </button>
                            )}
                          </div>
                        </div>
                        {chapter.notes && (
                          <button onClick={() => toggleChapter(chapter.id)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0">
                            {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                          </button>
                        )}
                      </div>

                      <AnimatePresence>
                        {isExpanded && chapter.notes && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5">
                              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                                <div className="flex items-center gap-2 mb-3">
                                  <FileText className="h-4 w-4 text-emerald-600" />
                                  <h5 className="text-sm font-bold text-slate-900">Study Notes</h5>
                                </div>
                                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{chapter.notes}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {(!currentClassData || currentClassData.subjects.length === 0) && (
          <div className="text-center py-20">
            <FileText className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-lg font-bold text-slate-500">No content available for this class yet</p>
            <p className="text-sm text-slate-400 mt-1">Check back soon for study materials</p>
          </div>
        )}
      </div>
    </div>
  );
};
