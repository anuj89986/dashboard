'use client';

import { motion } from 'motion/react';
import { BarChart3 } from 'lucide-react';

interface ActivityTileProps {
  index?: number;
}

export function ActivityTile({ index = 0 }: ActivityTileProps) {
  // mock data
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activities = [4, 8, 6, 9, 7, 10, 5];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20, scale: 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.1 },
        y: { duration: 0.6, delay: index * 0.1 },
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 20},
      }}
      className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#2c063a] to-[#130268] p-6 col-span-1 md:col-span-2 border border-[#2c063a] hover:border-[#8b5cf6] transition-colors group cursor-pointer"
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-linear-to-r from-[#8b5cf6] to-[#ec4899]"
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
              Activity
            </p>
            <h3 className="text-xl font-bold text-white mt-1">This Week</h3>
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="p-3 bg-linear-to-br from-[#8b5cf6] to-[#ec4899] rounded-xl"
          >
            <BarChart3 size={24} className="text-white" />
          </motion.div>
        </div>

        <div className="flex items-end justify-between h-32 gap-2">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              className="flex-1 h-full flex flex-col items-center gap-2 group/bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.1 }}
            >
              <div className="flex-1 w-full flex items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(activity / 10) * 100}%` }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.1 + 0.2,
                    ease: 'easeOut',
                  }}
                  className="w-full bg-linear-to-t from-[#9067f0] to-[#a3366d] rounded-t-md group-hover/bar:from-[#8b5cf6] group-hover/bar:to-[#ec4899] transition-all shadow-lg"
                />
              </div>
              <span className="text-xs text-slate-400 font-medium">{weekDays[index]}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 , y: 20 }}
          animate={{ opacity: 1 , y: 0 }}
          transition={{ delay: index * 0.1 + 1.5 }}
          className="flex justify-between items-center mt-6 pt-4 border-t border-slate-700/50"
        >
          <div>
            <p className="text-sm text-slate-400">Average</p>
            <p className="text-lg font-bold text-white">7.1 hours</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Total</p>
            <p className="text-lg font-bold text-white">49.7 hours</p>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
