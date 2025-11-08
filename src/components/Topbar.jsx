import React from 'react';
import { Moon, Sun, LogOut, User } from 'lucide-react';

export default function Topbar({ theme, onToggleTheme, onLogout, user }) {
  return (
    <header className="h-16 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4">
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <span className="font-medium text-zinc-900 dark:text-zinc-100">SPIDOL</span>
        <span>•</span>
        <span className="hidden sm:block">Sarana Prasarana Online</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex items-center gap-2 px-3 py-2 rounded-md text-zinc-700 dark:text-zinc-200">
          <User size={18} />
          <span className="text-sm">{user?.name || 'Admin'}</span>
        </div>
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
