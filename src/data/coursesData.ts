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
    accent: 'from-emerald-500 to-teal-600',
    accentLight: 'bg-emerald-50',
    accentText: 'text-emerald-600',
    accentBg: 'bg-emerald-100',
    learns: [
      'Daily grammar rules made simple',
      'Paragraph & essay writing structure',
      'Reading comprehension techniques',
      'Spoken English confidence',
    ],
    method:
      'Step-by-step lessons, practice sheets, guided speaking sessions, and weekly feedback.',
    outcome:
      'Students write clearly, speak confidently, and score higher in English exams.',
  },
  {
    title: 'Computer & IT Skills Program',
    subtitle: 'Coding  ·  Digital Skills  ·  Practical Learning',
    icon: Monitor,
    accent: 'from-sky-500 to-blue-600',
    accentLight: 'bg-sky-50',
    accentText: 'text-sky-600',
    accentBg: 'bg-sky-100',
    learns: [
      'Computer fundamentals & typing',
      'Basic coding logic',
      'Internet safety & digital tools',
      'Real-life tech applications',
    ],
    method:
      'Hands-on lab practice, mini projects, guided exercises, and live demonstrations.',
    outcome: 'Students become tech confident and future-ready.',
  },
  {
    title: 'Science Excellence Program',
    subtitle: 'Physics  ·  Chemistry  ·  Biology',
    icon: FlaskConical,
    accent: 'from-amber-500 to-orange-600',
    accentLight: 'bg-amber-50',
    accentText: 'text-amber-600',
    accentBg: 'bg-amber-100',
    learns: [
      'Core concepts explained simply',
      'Formula understanding & application',
      'Diagrams & numerical solving',
      'Board exam question patterns',
    ],
    method:
      'Visual explanation, experiments, problem-solving sessions, and revision drills.',
    outcome: 'Strong fundamentals + confident exam performance.',
  },
  {
    title: 'Mathematics Advanced Program',
    subtitle: 'Algebra  ·  Calculus  ·  Geometry',
    icon: Calculator,
    accent: 'from-rose-500 to-red-600',
    accentLight: 'bg-rose-50',
    accentText: 'text-rose-600',
    accentBg: 'bg-rose-100',
    learns: [
      'Step-by-step concept clarity',
      'Fast problem-solving methods',
      'Exam-focused question practice',
      'Logical thinking development',
    ],
    method:
      'Guided solving, repeated practice, doubt-clearing sessions, and speed drills.',
    outcome: 'Accuracy, confidence, and higher marks.',
  },
  {
    title: 'Academic Foundation Program',
    subtitle: 'All Subjects Support (Classes 6–10)',
    icon: GraduationCap,
    accent: 'from-blue-600 to-blue-800',
    accentLight: 'bg-blue-50',
    accentText: 'text-blue-600',
    accentBg: 'bg-blue-100',
    learns: [
      'Homework guidance',
      'Study discipline',
      'Concept revision',
      'Exam preparation habits',
    ],
    method:
      'Small batches, personal attention, and daily progress tracking.',
    outcome: 'Consistent improvement and strong academic base.',
  },
];
