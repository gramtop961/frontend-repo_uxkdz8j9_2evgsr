import React, { useState } from 'react';
import { Home, Building2, FileText, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';

const MENU = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'sarpras', label: 'Sarpras', icon: Building2 },
  { id: 'proposal', label: 'Proposal', icon: FileText },
  { id: 'audit', label: 'Audit Log', icon: ClipboardList },
];

export default function Sidebar({ active, onChange, role = 'Admin' }) {
  const [collapsed, setCollapsed] = useState(false);

  const items = MENU.filter((m) => {
    if (role === 'Sekolah') return ['dashboard', 'sarpras', 'proposal'].includes(m.id);
    if (role === 'Verifikator') return ['dashboard', 'sarpras', 'proposal', 'audit'].includes(m.id);
    return true; // Admin
  });

  return (
    <aside className={`h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between h-16 px-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className={`font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>SPIDOL</div>
        <button
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed((c) => !c)}
          className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              <Icon size={18} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className={`p-3 text-xs text-zinc-500 dark:text-zinc-400 ${collapsed ? 'hidden' : ''}`}>
        © {new Date().getFullYear()} Dinas Pendidikan
      </div>
    </aside>
  );
}
