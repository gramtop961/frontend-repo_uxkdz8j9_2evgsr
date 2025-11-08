import React from 'react';
import { PieChart, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

function StatCard({ icon: Icon, label, value, tone = 'zinc' }) {
  const tones = {
    zinc: 'bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100',
    green: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300',
    yellow: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
    red: 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300',
  };
  return (
    <div className={`p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 ${tones[tone]}`}>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-white/50 dark:bg-black/20 border border-white/40 dark:border-white/10">
          <Icon size={18} />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide opacity-70">{label}</div>
          <div className="text-2xl font-semibold">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Ringkasan Cepat</h2>
        <p className="text-sm text-zinc-500">Metrik utama untuk monitoring SPIDOL</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={PieChart} label="Total Sarpras" value="1.284" />
        <StatCard icon={CheckCircle2} label="Terverifikasi" value="872" tone="green" />
        <StatCard icon={Clock} label="Menunggu" value="312" tone="yellow" />
        <StatCard icon={AlertTriangle} label="Butuh Perbaikan" value="100" tone="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <h3 className="font-medium mb-4">Status Proposal</h3>
          <div className="h-56 grid grid-cols-4 gap-4">
            {['Menunggu', 'Diterima', 'Revisi', 'Ditolak'].map((s, i) => (
              <div key={s} className="flex flex-col items-center justify-end">
                <div
                  className="w-12 rounded-t-md bg-gradient-to-t from-zinc-200 dark:from-zinc-800 to-zinc-400/60 dark:to-zinc-700"
                  style={{ height: `${40 + i * 15}px` }}
                />
                <div className="mt-2 text-xs text-zinc-500">{s}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <h3 className="font-medium mb-4">Kondisi Sarpras</h3>
          <ul className="space-y-3 text-sm">
            {[
              { k: 'Baik', v: 54, c: 'bg-emerald-500' },
              { k: 'Rusak Ringan', v: 22, c: 'bg-amber-500' },
              { k: 'Rusak Sedang', v: 16, c: 'bg-orange-500' },
              { k: 'Rusak Berat', v: 8, c: 'bg-rose-500' },
            ].map((i) => (
              <li key={i.k} className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${i.c}`} />
                <span className="flex-1">{i.k}</span>
                <span className="text-zinc-500">{i.v}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
