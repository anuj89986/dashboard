'use client';

import { motion } from 'motion/react';
import { Flame } from 'lucide-react';

interface HeroTileProps {
  name?: string;
  streak?: number;
  index?: number;
}

export function HeroTile({ name = 'Unknown', streak = 7 , index }: HeroTileProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        type: 'spring',
        delay: index ? index * 0.1 : 0,
        stiffness: 300,
        damping: 25,
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', duration: 1, stiffness: 300 },
      }}
      className="group relative overflow-hidden rounded-4xl border border-[#1d062e] bg-linear-to-br from-[#000000] via-[#210735] to-[#000000] p-8 col-span-1 md:col-span-2 shadow-2xl cursor-pointer"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-br from-[#050005] via-[#2a0a45] to-[#050005]" />

      <div className="relative z-10 flex flex-col justify-between h-48">
        <div>
          <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">
            Welcome back,
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 ">
            {name}
          </h2>
        </div>

        {/* Streak Indicator */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-center gap-3 bg-linear-to-r from-[#3b2804] to-[#870505] w-fit px-4 py-3 rounded-xl border border-orange-500"
        >
          <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 1, repeat: Infinity }}>
            <Flame size={24} className="text-orange-400" />
          </motion.div>
          <div>
            <p className="text-sm text-slate-300 font-medium">{streak} Day Streak</p>
            <p className="text-xs text-slate-400">Keep it up!</p>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
