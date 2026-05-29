'use client';

import { motion } from 'motion/react';
import { Home, Book, BarChart3, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
}

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'courses', label: 'Courses', icon: <Book size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  ];

  return (
    <>
      <motion.aside
        initial={{ x: -256, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-20 lg:w-64 bg-linear-to-b from-black via-slate-950 to-slate-900 border-r border-slate-800 z-40"
      >
        <div className="p-4 border-b border-slate-800 flex items-center justify-center lg:justify-start">
          <h1 className="hidden lg:block font-bold text-white text-lg">Learn</h1>
          <h1 className="lg:hidden font-bold text-white text-lg">L</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2 rounded-lg relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeItem === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-linear-to-r from-blue-600/40 to-purple-600/40 rounded-lg"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              <span className="relative z-10 text-slate-400 group-hover:text-slate-200 transition-colors">
                {item.icon}
              </span>
              <span className="hidden lg:block relative z-10 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {item.label}
              </span>
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <motion.button
            className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings size={20} />
            <span className="hidden lg:block text-sm font-medium">Settings</span>
          </motion.button>
          <motion.button
            className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} />
            <span className="hidden lg:block text-sm font-medium">Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-linear-to-t from-black via-slate-950 to-slate-900 border-t border-slate-800 z-40"
      >
        <div className="flex justify-around items-center py-3">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeItem === item.id ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
