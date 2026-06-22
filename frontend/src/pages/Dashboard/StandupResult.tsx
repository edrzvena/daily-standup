import { useEffect } from 'react';
import { useStandupStore } from '../../store/standup.store';
import { useTypewriter } from '../../hooks/useTypewriter';
import { Button } from '../../components/ui/Button';

export function StandupResult() {
  const { currentReport, clearReport } = useStandupStore();
  const { displayed, isDone } = useTypewriter(currentReport, 10);

  if (!currentReport) return null;

  return (
    <div className="border border-zinc-700 bg-zinc-900 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-xs text-lime-400 uppercase tracking-widest">
          Generated Report
        </p>
        {isDone && (
          <Button variant="ghost" onClick={clearReport} className="text-xs py-1 px-2">
            Clear
          </Button>
        )}
      </div>

      {/* Output Claude */}
      <pre className="font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
        {displayed}
        {/* Blinking cursor selama typewriter jalan */}
        {!isDone && (
          <span className="animate-pulse text-lime-400">▋</span>
        )}
      </pre>
    </div>
  );
}