'use client';

import { motion } from 'motion/react';
import { Suspense } from 'react';
import { HeroTile } from './HeroTile';
import { CourseTile } from './CourseTile';
import { ActivityTile } from './ActivityTile';
import { Course } from '@/lib/types';

interface DashboardGridProps {
  courses: Course[];
}

function DashboardGridContent({ courses }: DashboardGridProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max"
      aria-label="Dashboard tiles"
    >
      <HeroTile name="Anuj" streak={12} index={0} />

      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: (index + 1) * 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 25,
          }}
        >
          <CourseTile course={course} index={index + 1} />
        </motion.div>
      ))}

      <ActivityTile index={courses.length + 1} />
    </motion.section>
  );
}

function DashboardSkeleton() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max" aria-hidden="true">
      <div className="md:col-span-2 h-48 rounded-3xl bg-slate-800/50 animate-pulse" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-32 rounded-2xl bg-slate-800/50 animate-pulse" />
      ))}
      <div className="md:col-span-2 h-40 rounded-2xl bg-slate-800/50 animate-pulse" />
    </section>
  );
}

export function DashboardGrid({ courses }: DashboardGridProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardGridContent courses={courses} />
    </Suspense>
  );
}
