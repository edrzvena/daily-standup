import { useEffect } from 'react';
import { useStandupStore } from '../../store/standup.store';
import { StandupCard } from '../../components/StandupCard';

export function StandupHistory() {
  const { history, loadHistory, isFetchingHistory } = useStandupStore();

  useEffect(() => {
    loadHistory();
  }, []);

  if (isFetchingHistory) {
    return (
      <p className="font-mono text-xs text-zinc-600 text-center py-8">
        Loading history...
      </p>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed border-zinc-800">
        <p className="font-mono text-sm text-zinc-600">No standups yet.</p>
        <p className="font-mono text-xs text-zinc-700 mt-1">
          Generate your first one above.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">
        History
      </p>
      {history.map((standup) => (
        <StandupCard key={standup.id} standup={standup} />
      ))}
    </div>
  );
}