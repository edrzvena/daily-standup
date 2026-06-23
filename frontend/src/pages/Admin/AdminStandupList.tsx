import { useEffect, useState } from 'react';
import { useAdminStore } from '../../store/admin.store';
import { AdminStandupModal } from './AdminStandupModal';
import { formatDate } from '../../utils/formatDate';
import type { Standup } from '../../types';

export function AdminStandupList() {
  const { standups, loadStandups, isLoadingStandups } = useAdminStore();
  const [selected, setSelected] = useState<Standup | null>(null);
  const [filterEmail, setFilterEmail] = useState('');

  useEffect(() => {
    loadStandups();
  }, []);

  const filtered = standups.filter((s) =>
    filterEmail ? s.email?.toLowerCase().includes(filterEmail.toLowerCase()) : true
  );

  if (isLoadingStandups) {
    return (
      <p className="font-mono text-xs text-zinc-600 text-center py-8">
        Loading standups...
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Filter */}
        <div className="flex items-center gap-3">
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest flex-1">
            {filtered.length} standups
          </p>
          <input
            type="text"
            placeholder="Filter by email..."
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
            className="font-mono text-xs bg-zinc-900 border border-zinc-700 text-zinc-300 px-3 py-1.5 outline-none focus:border-lime-400 placeholder:text-zinc-600 w-48"
          />
        </div>

        {/* Table header */}
        <div className="grid grid-cols-12 gap-2 px-3 py-2 border-b border-zinc-800">
          <p className="col-span-1 font-mono text-xs text-zinc-600">#</p>
          <p className="col-span-4 font-mono text-xs text-zinc-600 uppercase tracking-widest">User</p>
          <p className="col-span-4 font-mono text-xs text-zinc-600 uppercase tracking-widest">Preview</p>
          <p className="col-span-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">Date</p>
          <p className="col-span-1 font-mono text-xs text-zinc-600 uppercase tracking-widest">View</p>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <p className="font-mono text-sm text-zinc-600 text-center py-6">
            No standups found.
          </p>
        ) : (
          filtered.map((standup) => (
            <div
              key={standup.id}
              className="grid grid-cols-12 gap-2 px-3 py-3 border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors items-center"
            >
              <p className="col-span-1 font-mono text-xs text-zinc-600">{standup.id}</p>
              <p className="col-span-4 font-mono text-xs text-zinc-400 truncate">{standup.email}</p>
              <p className="col-span-4 font-mono text-xs text-zinc-500 truncate">
                {standup.generated_report.slice(0, 60)}...
              </p>
              <p className="col-span-2 font-mono text-xs text-zinc-500">
                {formatDate(standup.standup_date)}
              </p>
              <button
                className="col-span-1 font-mono text-xs text-lime-400 hover:text-lime-300 transition-colors text-left"
                onClick={() => setSelected(standup)}
              >
                Open ↗
              </button>
            </div>
          ))
        )}
      </div>

      <AdminStandupModal standup={selected} onClose={() => setSelected(null)} />
    </>
  );
}