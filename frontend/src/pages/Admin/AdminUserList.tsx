import { useEffect } from 'react';
import { useAdminStore } from '../../store/admin.store';
import { formatDate } from '../../utils/formatDate';

export function AdminUserList() {
  const { users, standups, loadUsers, isLoadingUsers } = useAdminStore();

  useEffect(() => {
    loadUsers();
  }, []);

  // Hitung jumlah standup per user
  function getStandupCount(userId: number) {
    return standups.filter((s) => s.user_id === userId).length;
  }

  if (isLoadingUsers) {
    return (
      <p className="font-mono text-xs text-zinc-600 text-center py-8">
        Loading users...
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
        {users.length} users registered
      </p>

      {/* Table header */}
      <div className="grid grid-cols-12 gap-2 px-3 py-2 border-b border-zinc-800">
        <p className="col-span-1 font-mono text-xs text-zinc-600">#</p>
        <p className="col-span-5 font-mono text-xs text-zinc-600 uppercase tracking-widest">Email</p>
        <p className="col-span-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">Role</p>
        <p className="col-span-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">Standups</p>
        <p className="col-span-2 font-mono text-xs text-zinc-600 uppercase tracking-widest">Joined</p>
      </div>

      {/* Rows */}
      {users.map((user) => (
        <div
          key={user.id}
          className="grid grid-cols-12 gap-2 px-3 py-3 border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors"
        >
          <p className="col-span-1 font-mono text-xs text-zinc-600">{user.id}</p>
          <p className="col-span-5 font-mono text-sm text-zinc-300 truncate">{user.email}</p>
          <div className="col-span-2">
            <span
              className={`font-mono text-xs px-2 py-0.5 ${
                user.role === 'admin'
                  ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30'
                  : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
              }`}
            >
              {user.role}
            </span>
          </div>
          <p className="col-span-2 font-mono text-sm text-zinc-400">
            {getStandupCount(user.id)}
          </p>
          <p className="col-span-2 font-mono text-xs text-zinc-500">
            {formatDate(user.created_at)}
          </p>
        </div>
      ))}
    </div>
  );
}