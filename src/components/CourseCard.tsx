import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lightbulb, Trophy, ChevronDown } from 'lucide-react';
import type { CourseData } from '../data/coursesData';

interface CourseCardProps {
  course: CourseData;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = course.icon;

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-500 overflow-hidden flex flex-col"
    >
      <div className={`relative p-7 pb-6 ${course.accentLight}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div
              className={`inline-flex items-center justify-center w-13 h-13 rounded-xl bg-gradient-to-br ${course.accent} shadow-lg mb-4 p-3`}
            >
              <Icon className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1.5">
              {course.title}
            </h3>
            <p className={`text-sm font-medium ${course.accentText} tracking-wide`}>
              {course.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="p-7 pt-6 flex flex-col flex-1">
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-1 rounded-md ${course.accentBg}`}>
              <Check className={`h-3.5 w-3.5 ${course.accentText}`} />
            </div>
            <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
              What students learn
            </h4>
          </div>
          <ul className="space-y-2.5">
            {course.learns.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-br ${course.accent}`}
                />
                <span className="text-gray-600 text-[15px] leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className={`rounded-xl p-4 mb-5 ${course.accentLight} border ${course.accentText.replace('text-', 'border-').replace('600', '200')}`}>
                <div className="flex items-center gap-2 mb-2.5">
                  <Lightbulb className={`h-4 w-4 ${course.accentText}`} />
                  <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
                    How we teach
                  </h4>
                </div>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {course.method}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 mb-2">
                <div className="flex items-center gap-2 mb-2.5">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <h4 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
                    Outcome
                  </h4>
                </div>
                <p className="text-slate-700 text-[15px] leading-relaxed font-medium">
                  {course.outcome}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-5 border-t border-gray-100">
          <button
            onClick={() => setExpanded(!expanded)}
            className={`inline-flex items-center text-sm font-semibold ${course.accentText} group/btn transition-colors`}
          >
            <span>{expanded ? 'Show less' : 'See full roadmap'}</span>
            <ChevronDown
              className={`ml-1.5 h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
