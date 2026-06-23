import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useAdminStore } from '../../store/admin.store';
import { AdminOverview } from './AdminOverview';
import { AdminUserList } from './AdminUserList';
import { AdminStandupList } from './AdminStandupList';
import { Button } from '../../components/ui/Button';

type Tab = 'overview' | 'users' | 'standups';

export default function AdminPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { loadUsers, loadStandups } = useAdminStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  useEffect(() => {
    if (!isAuthenticated) return navigate('/login');
    if (user?.role !== 'admin') return navigate('/dashboard');

    // Load semua data sekaligus pas pertama masuk
    loadUsers();
    loadStandups();
  }, [isAuthenticated]);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'users', label: 'Users' },
    { key: 'standups', label: 'Standups' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Topbar */}
      <header className="border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="font-mono text-xs text-lime-400 uppercase tracking-widest">
            daily standup
          </p>
          <span className="font-mono text-xs text-zinc-700">/</span>
          <span className="font-mono text-xs bg-lime-400/10 text-lime-400 border border-lime-400/30 px-2 py-0.5">
            admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-zinc-500">{user?.email}</span>
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-xs py-1 px-3"
          >
            ← Dashboard
          </Button>
          <Button variant="ghost" onClick={handleLogout} className="text-xs py-1 px-3">
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">
        {/* Page title */}
        <div>
          <h1 className="font-mono text-xl text-zinc-100 font-bold">Admin Panel</h1>
          <p className="font-mono text-xs text-zinc-500 mt-1">
            Monitor all users and their standup activity.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-0 border-b border-zinc-800">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`font-mono text-xs px-4 py-2 transition-colors border-b-2 -mb-px ${
                activeTab === tab.key
                  ? 'border-lime-400 text-lime-400'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && <AdminOverview />}
        {activeTab === 'users' && <AdminUserList />}
        {activeTab === 'standups' && <AdminStandupList />}
      </main>
    </div>
  );
}