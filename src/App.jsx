import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import DataTable from './components/DataTable.jsx';
import SectionHeader from './components/SectionHeader.jsx';

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return { theme, toggle };
}

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [role, setRole] = useState('Admin'); // Admin | Verifikator | Sekolah
  const { theme, toggle } = useTheme();

  // Mock datasets (visual only)
  const sarprasColumns = [
    { header: 'Nama Sekolah', accessor: 'nama' },
    { header: 'NPSN', accessor: 'npsn' },
    { header: 'Kecamatan', accessor: 'kecamatan' },
    { header: 'Jenjang', accessor: 'jenjang' },
    { header: 'Jenis', accessor: 'jenis' },
    { header: 'Luas (m²)', accessor: 'luas' },
    { header: 'Kondisi', accessor: 'kondisi' },
    { header: 'Status', accessor: 'status' },
  ];
  const sarprasData = useMemo(
    () => [
      { nama: 'SDN 01 Harapan', npsn: '1012001', kecamatan: 'Harapan Baru', jenjang: 'SD', jenis: 'Ruang Kelas', luas: 56, kondisi: 'Baik', status: 'Terverifikasi' },
      { nama: 'SMPN 2 Cendana', npsn: '2013002', kecamatan: 'Cendana', jenjang: 'SMP', jenis: 'Toilet', luas: 18, kondisi: 'Rusak Sedang', status: 'Menunggu' },
      { nama: 'SMAN 3 Melati', npsn: '3014003', kecamatan: 'Melati', jenjang: 'SMA', jenis: 'Ruang Ibadah', luas: 72, kondisi: 'Rusak Berat', status: 'Menunggu' },
    ],
    []
  );

  const proposalColumns = [
    { header: 'Sekolah', accessor: 'sekolah' },
    { header: 'No Proposal', accessor: 'no' },
    { header: 'Nilai', accessor: 'nilai' },
    { header: 'Sub Kegiatan', accessor: 'sub' },
    { header: 'Status', accessor: 'status' },
  ];
  const proposalData = useMemo(
    () => [
      { sekolah: 'SDN 01 Harapan', no: 'PR-001/2025', nilai: '120.000.000', sub: 'Rehab Ruang Kelas', status: 'Menunggu' },
      { sekolah: 'SMPN 2 Cendana', no: 'PR-017/2025', nilai: '60.000.000', sub: 'Perbaikan Toilet', status: 'Revisi' },
      { sekolah: 'SMAN 3 Melati', no: 'PR-023/2025', nilai: '200.000.000', sub: 'Renovasi Mushola', status: 'Diterima' },
    ],
    []
  );

  const onLogout = () => {
    alert('Anda telah keluar. (Demo)');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="flex">
        <Sidebar active={active} onChange={setActive} role={role} />
        <div className="flex-1 min-w-0 flex flex-col">
          <Topbar theme={theme} onToggleTheme={toggle} onLogout={onLogout} user={{ name: role }} />

          <main className="flex-1">
            {active === 'dashboard' && <Dashboard />}

            {active === 'sarpras' && (
              <div className="p-6 space-y-4">
                <SectionHeader
                  title="Data Sarana & Prasarana"
                  description="Kelola dan pantau data sarpras sekolah"
                  actions={
                    <div className="flex items-center gap-2">
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm"
                      >
                        <option>Admin</option>
                        <option>Verifikator</option>
                        <option>Sekolah</option>
                      </select>
                      <button className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">Tambah</button>
                    </div>
                  }
                />
                <DataTable data={sarprasData} columns={sarprasColumns} />
              </div>
            )}

            {active === 'proposal' && (
              <div className="p-6 space-y-4">
                <SectionHeader
                  title="Proposal Pengajuan"
                  description="Tracking dan verifikasi proposal hibah"
                  actions={
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800">Export</button>
                      <button className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">Buat Proposal</button>
                    </div>
                  }
                />
                <DataTable data={proposalData} columns={proposalColumns} />
              </div>
            )}

            {active === 'audit' && (
              <div className="p-6 space-y-4">
                <SectionHeader
                  title="Audit Log"
                  description="Monitoring aktivitas akun untuk kebutuhan audit"
                />
                <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-500">
                  Fitur audit akan menampilkan pencatatan login/logout, verifikasi, perubahan status, dan pembaruan data.
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
