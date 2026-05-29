'use client';

import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { Course } from '@/lib/types';

interface CourseTileProps {
  course: Course;
  index?: number;
}

export function CourseTile({ course, index = 0 }: CourseTileProps) {
  const IconComponent = (LucideIcons as any)[course.icon_name];
  const Icon = IconComponent || LucideIcons.BookOpen;

  const progressColor = 
    course.progress >= 75 ? 'from-[#16a34a] to-[#22c55e]' :
    course.progress >= 50 ? 'from-[#3b82f6] to-[#06b6d4]' :
    'from-[#f59e0b] to-[#f59e0b]';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#020202] to-[#190a3d] p-6 border border-slate-700/50 hover:border-blue-500/50 transition-colors group cursor-pointer"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-br from-blue-600/10 via-purple-600/5 to-transparent"
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-2 bg-linear-to-br from-[#362d2d] to-[#240d5e] rounded-xl"
          >
            <Icon size={24} className="text-blue-300" />
          </motion.div>
          <span className="text-xs font-bold text-white bg-linear-to-r from-[#f6010e] to-[#954040] px-2 py-1 rounded-full">
            {course.progress}%
          </span>
        </div>

        <div>
          <h3 className="font-bold text-white text-sm leading-tight line-clamp-2">
            {course.title}
          </h3>
        </div>

        <div className="space-y-2">
          <div className="relative h-1.5 bg-[#30353c] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{
                duration: 1.2,
                delay: index * 0.1 + 0.7,
                ease: 'easeOut',
              }}
              className={`h-full bg-linear-to-r ${progressColor} shadow-lg`}
            />
          </div>
          <p className="text-xs text-slate-400 font-medium">{course.progress}% Complete</p>
        </div>
      </div>
    </motion.article>
  );
}
