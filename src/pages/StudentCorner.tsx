import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, FileText, Brain } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Class {
  id: string;
  name: string;
  display_order: number;
}

interface Subject {
  id: string;
  name: string;
  class_id: string;
}

interface Chapter {
  id: string;
  title: string;
  ncert_link: string;
  notes: string;
  mindmap: string;
  subject_id: string;
  display_order: number;
}

interface StudyLink {
  class: string;
  subject: string;
  notes: string;
  mindmap: string;
  ncert: string;
}

export default function StudentCorner() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');

  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingChapters, setLoadingChapters] = useState(false);

  const [error, setError] = useState<string>('');

  const [studyLinks, setStudyLinks] = useState<StudyLink[]>([]);
  const [currentStudyLink, setCurrentStudyLink] = useState<StudyLink | null>(null);

  useEffect(() => {
    fetchClasses();
    fetchStudyLinks();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      fetchSubjects(selectedClassId);
      setSelectedSubjectId('');
      setChapters([]);
    } else {
      setSubjects([]);
      setChapters([]);
    }
  }, [selectedClassId]);

  useEffect(() => {
    if (selectedSubjectId) {
      fetchChapters(selectedSubjectId);
    } else {
      setChapters([]);
    }
  }, [selectedSubjectId]);

  useEffect(() => {
    if (selectedClassId && selectedSubjectId) {
      const selectedClass = classes.find(c => c.id === selectedClassId);
      const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

      if (selectedClass && selectedSubject) {
        const matchingLink = studyLinks.find(
          link => link.class === selectedClass.name && link.subject === selectedSubject.name
        );
        setCurrentStudyLink(matchingLink || null);
      }
    } else {
      setCurrentStudyLink(null);
    }
  }, [selectedClassId, selectedSubjectId, classes, subjects, studyLinks]);

  const fetchClasses = async () => {
    try {
      setLoadingClasses(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('classes')
        .select('*')
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;

      setClasses(data || []);
    } catch (err) {
      setError('Failed to load classes');
      console.error('Error fetching classes:', err);
    } finally {
      setLoadingClasses(false);
    }
  };

  const fetchSubjects = async (classId: string) => {
    try {
      setLoadingSubjects(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('subjects')
        .select('*')
        .eq('class_id', classId)
        .order('name', { ascending: true });

      if (fetchError) throw fetchError;

      setSubjects(data || []);
    } catch (err) {
      setError('Failed to load subjects');
      console.error('Error fetching subjects:', err);
    } finally {
      setLoadingSubjects(false);
    }
  };

  const fetchChapters = async (subjectId: string) => {
    try {
      setLoadingChapters(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('chapters')
        .select('*')
        .eq('subject_id', subjectId)
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;

      setChapters(data || []);
    } catch (err) {
      setError('Failed to load chapters');
      console.error('Error fetching chapters:', err);
    } finally {
      setLoadingChapters(false);
    }
  };

  const fetchStudyLinks = async () => {
    try {
      const response = await fetch('/data/studyLinks.json');
      if (response.ok) {
        const data = await response.json();
        setStudyLinks(data);
      }
    } catch (err) {
      console.error('Error loading study links:', err);
    }
  };

  const formatMindmap = (mindmap: string) => {
    if (!mindmap) return [];
    return mindmap.split('\n').filter(line => line.trim() !== '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Student Corner
          </h1>
          <p className="text-xl text-gray-600">
            Access study materials, notes, and resources for your learning
          </p>
        </motion.div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Class
              </label>
              {loadingClasses ? (
                <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
              ) : (
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a class...</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Subject
              </label>
              {loadingSubjects ? (
                <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
              ) : (
                <select
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  disabled={!selectedClassId || subjects.length === 0}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {!selectedClassId
                      ? 'Select a class first...'
                      : subjects.length === 0
                      ? 'No subjects available'
                      : 'Choose a subject...'}
                  </option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {currentStudyLink && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Materials</h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {currentStudyLink.notes && (
                <a
                  href={currentStudyLink.notes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  <FileText className="h-5 w-5" />
                  Class Notes
                </a>
              )}
              {currentStudyLink.mindmap && (
                <a
                  href={currentStudyLink.mindmap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                >
                  <Brain className="h-5 w-5" />
                  Mindmap
                </a>
              )}
              {currentStudyLink.ncert && (
                <a
                  href={currentStudyLink.ncert}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  <ExternalLink className="h-5 w-5" />
                  NCERT Link
                </a>
              )}
            </div>
          </div>
        )}

        {loadingChapters ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white rounded-xl shadow-lg animate-pulse"></div>
            ))}
          </div>
        ) : chapters.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {chapter.title}
                      </h3>
                    </div>
                    <a
                      href={chapter.ncert_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      NCERT Link
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <a
                          href="https://drive.google.com/drive/folders/1mVGxBBLDSKYKUB2hI4Uk9qvUGHkaxgLj?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Notes
                        </a>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="h-5 w-5 text-purple-600" />
                        <a
                          href="https://drive.google.com/drive/folders/1_ufjwrsRxYK8ra8eeO18ObRevC8YsWAZ?usp=share_link"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Mindmap
                        </a>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="h-5 w-5 text-purple-600" />
                          <a
                          href={chapter.ncert_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          NCERT Link
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : selectedSubjectId ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No study material available.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
