import { BookOpen, Monitor, FlaskConical, Calculator, GraduationCap, Shield, Award } from 'lucide-react';

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
  fees: {
    addon?: string;
    regular?: string;
    weekend?: string;
  };
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
    fees: {
      addon: '₹500',
      regular: '₹2000',
    },
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
    fees: {
      addon: '₹500',
      regular: '₹2000',
    },
  },
  {
    title: 'Academic Foundation Program',
    subtitle: 'Mathematics & Science (Classes 1–10)',
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
    fees: {
      regular: '₹1300-₹2000',
    },
  },
  {
    title: 'RIMC / NDA Preparation Program',
    subtitle: 'Defence Entrance Foundation',
    icon: Shield,
    accent: 'from-green-600 to-green-700',
    accentLight: 'bg-green-50',
    accentText: 'text-green-700',
    accentBg: 'bg-green-100',
    learns: [
      'Mathematics (NDA level)',
      'English & General Ability',
      'Current Affairs',
      'SSB basics & personality skills',
      'Written exam practice',
    ],
    method:
      'Small batches with personal attention, regular mock tests, performance tracking, and defence-style discipline.',
    outcome:
      'Strong written preparation, confident personality, and readiness for RIMC/NDA & SSB.',
    fees: {
      weekend: '₹1000',
    },
  },
  {
    title: 'Exam Preparation Classes',
    subtitle: 'Board & School Exam Support',
    icon: Award,
    accent: 'from-orange-600 to-orange-700',
    accentLight: 'bg-orange-50',
    accentText: 'text-orange-700',
    accentBg: 'bg-orange-100',
    learns: [
      'Complete syllabus coverage',
      'Concept clarity & revision',
      'Important questions practice',
      'Time management skills',
      'Answer writing techniques',
    ],
    method:
      'Structured lessons in small batches with regular tests, doubt-solving sessions, and performance tracking.',
    outcome:
      'Better scores, strong concepts, and confident exam performance.',
    fees: {
      addon: 'Free',
      regular: '₹2500',
    },
  },
];
