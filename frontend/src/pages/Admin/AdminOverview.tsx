import { useAdminStore } from '../../store/admin.store';

export function AdminOverview() {
  const { users, standups } = useAdminStore();

  // Hitung standup hari ini
  const today = new Date().toISOString().split('T')[0];
  const todayCount = standups.filter((s) => s.standup_date === today).length;

  // Unique user yang pernah bikin standup
  const activeUsers = new Set(standups.map((s) => s.user_id)).size;

  const stats = [
    { label: 'Total Users', value: users.length },
    { label: 'Total Standups', value: standups.length },
    { label: 'Standups Today', value: todayCount },
    { label: 'Active Users', value: activeUsers },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border border-zinc-800 bg-zinc-900 px-4 py-4 flex flex-col gap-1"
        >
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            {stat.label}
          </p>
          <p className="font-mono text-2xl text-lime-400 font-bold">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}