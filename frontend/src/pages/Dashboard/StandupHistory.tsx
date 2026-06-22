import { useEffect, useState } from 'react';
import { useStandupStore } from '../../store/standup.store';
import { StandupCard } from '../../components/StandupCard';
import { StandupModal } from '../../components/StandupModal';
import type { Standup } from '../../types';

export function StandupHistory() {
  const { history, loadHistory, isFetchingHistory } = useStandupStore();
  const [selected, setSelected] = useState<Standup | null>(null);

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
    <>
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">
          History
        </p>
        {history.map((standup) => (
          <StandupCard
            key={standup.id}
            standup={standup}
            onClick={() => setSelected(standup)}
          />
        ))}
      </div>

      {/* Modal */}
      <StandupModal standup={selected} onClose={() => setSelected(null)} />
    </>
  );
}