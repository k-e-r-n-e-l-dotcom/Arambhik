import { BookOpen, Monitor, FlaskConical, Calculator, GraduationCap } from 'lucide-react';

export interface CourseData {
  title: string;
  subtitle: string;
  icon: typeof BookOpen;
  accent: string;
  accentLight: string;
  accentText: string;
  accentBg: string;
  learns: string[];
  method: string;
  outcome: string;
}

export const courses: CourseData[] = [
  {
    title: 'English Mastery Program',
    subtitle: 'Grammar  ·  Writing  ·  Communication',
    icon: BookOpen,
    accent: 'from-primary-500 to-primary-600',
    accentLight: 'bg-primary-50',
    accentText: 'text-primary-600',
    accentBg: 'bg-primary-100',
    learns: [
      'Daily grammar rules made simple',
      'Paragraph & essay writing structure',
      'Reading comprehension techniques',
      'Spoken English confidence',
    ],
    method:
      'Learning by doing through practice sheets, guided speaking sessions, and weekly feedback with hands-on activities.',
    outcome:
      'Students write clearly, speak confidently, and score higher in English exams.',
  },
  {
    title: 'Computer & IT Skills Program',
    subtitle: 'Coding  ·  Digital Skills  ·  Practical Learning',
    icon: Monitor,
    accent: 'from-accent-500 to-accent-600',
    accentLight: 'bg-accent-50',
    accentText: 'text-accent-600',
    accentBg: 'bg-accent-100',
    learns: [
      'Computer fundamentals & typing',
      'Basic coding logic',
      'Internet safety & digital tools',
      'Real-life tech applications',
    ],
    method:
      'Dedicated computer labs with hands-on practice, mini projects, guided exercises, and live demonstrations for practical learning.',
    outcome: 'Students become tech confident and future-ready.',
  },
  {
    title: 'Academic Foundation Program',
    subtitle: 'All Subjects Support (Classes 6–10)',
    icon: GraduationCap,
    accent: 'from-primary-700 to-primary-800',
    accentLight: 'bg-primary-50',
    accentText: 'text-primary-800',
    accentBg: 'bg-primary-100',
    learns: [
      'Homework guidance',
      'Study discipline',
      'Concept revision',
      'Exam preparation habits',
    ],
    method:
      'Learning by doing in small batches with personal attention, dedicated lab facilities, and daily progress tracking.',
    outcome: 'Consistent improvement and strong academic base.',
  },
];
