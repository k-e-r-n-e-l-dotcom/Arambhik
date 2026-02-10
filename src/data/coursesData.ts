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
      'Step-by-step lessons, practice sheets, guided speaking sessions, and weekly feedback.',
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
      'Hands-on lab practice, mini projects, guided exercises, and live demonstrations.',
    outcome: 'Students become tech confident and future-ready.',
  },
  {
    title: 'Science Excellence Program',
    subtitle: 'Physics  ·  Chemistry  ·  Biology',
    icon: FlaskConical,
    accent: 'from-primary-600 to-primary-700',
    accentLight: 'bg-primary-50',
    accentText: 'text-primary-700',
    accentBg: 'bg-primary-100',
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
    accent: 'from-accent-600 to-accent-700',
    accentLight: 'bg-accent-50',
    accentText: 'text-accent-700',
    accentBg: 'bg-accent-100',
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
      'Small batches, personal attention, and daily progress tracking.',
    outcome: 'Consistent improvement and strong academic base.',
  },
];
