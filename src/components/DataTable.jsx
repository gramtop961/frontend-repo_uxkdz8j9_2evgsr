import React, { useMemo, useState } from 'react';
import { Search, Columns3 } from 'lucide-react';

export default function DataTable({ data = [], columns = [] }) {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(() => new Set(columns.map((c) => c.accessor)));

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter((row) => Object.values(row).some((v) => String(v).toLowerCase().includes(q)));
  }, [data, query]);

  const activeCols = columns.filter((c) => visible.has(c.accessor));

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pencarian global..."
            className="w-full pl-9 pr-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
          />
        </div>
        <div className="relative">
          <details className="group">
            <summary className="flex items-center gap-2 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer text-sm">
              <Columns3 size={18} />
              Kolom
            </summary>
            <div className="absolute right-0 mt-2 w-56 p-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg z-10">
              {columns.map((c) => (
                <label key={c.accessor} className="flex items-center gap-2 px-2 py-1 text-sm">
                  <input
                    type="checkbox"
                    checked={visible.has(c.accessor)}
                    onChange={(e) => {
                      const next = new Set(visible);
                      if (e.target.checked) next.add(c.accessor);
                      else next.delete(c.accessor);
                      setVisible(next);
                    }}
                  />
                  <span>{c.header}</span>
                </label>
              ))}
            </div>
          </details>
        </div>
      </div>

      <div className="overflow-auto border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-800/50">
            <tr>
              {activeCols.map((c) => (
                <th key={c.accessor} className="text-left px-3 py-2 font-medium text-zinc-600 dark:text-zinc-300 whitespace-nowrap">
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={idx} className="border-t border-zinc-200 dark:border-zinc-800">
                {activeCols.map((c) => (
                  <td key={c.accessor} className="px-3 py-2 whitespace-nowrap text-zinc-800 dark:text-zinc-100">
                    {row[c.accessor]}
                  </td>
                ))}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={activeCols.length} className="px-3 py-8 text-center text-zinc-500">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
