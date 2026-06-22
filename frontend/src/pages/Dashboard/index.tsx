import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { StandupForm } from './StandupForm';
import { StandupResult } from './StandupResult';
import { StandupHistory } from './StandupHistory';
import { Button } from '../../components/ui/Button';

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated]);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Topbar */}
      <header className="border-b border-zinc-800 px-6 py-3 flex items-center justify-between">
        <p className="font-mono text-xs text-lime-400 uppercase tracking-widest">
          daily standup
        </p>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-zinc-500">{user?.email}</span>
          <Button variant="ghost" onClick={handleLogout} className="text-xs py-1 px-3">
            Logout
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-6 py-8 flex flex-col gap-6">
        {/* Input section */}
        <StandupForm />

        {/* Result section */}
        <StandupResult />

        {/* Divider */}
        <div className="border-t border-zinc-800" />

        {/* History section */}
        <StandupHistory />
      </main>
    </div>
  );
}