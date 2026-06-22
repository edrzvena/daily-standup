import type { Standup } from '../types';
import { formatDate } from '../utils/formatDate';
import { Button } from './ui/Button';

interface StandupModalProps {
  standup: Standup | null;
  onClose: () => void;
}

export function StandupModal({ standup, onClose }: StandupModalProps) {
  if (!standup) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Modal box — stop propagation biar klik dalem gk nutup */}
      <div
        className="bg-zinc-900 border border-zinc-700 w-full max-w-xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
          <div>
            <p className="font-mono text-xs text-lime-400 uppercase tracking-widest">
              {formatDate(standup.standup_date)}
            </p>
            <p className="font-mono text-xs text-zinc-600 mt-0.5">#{standup.id}</p>
          </div>
          <Button variant="ghost" onClick={onClose} className="text-xs py-1 px-3">
            ✕ Close
          </Button>
        </div>

        {/* Content — scrollable */}
        <div className="overflow-y-auto px-5 py-4 flex flex-col gap-4">
          <div>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
              Generated Report
            </p>
            <pre className="font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
              {standup.generated_report}
            </pre>
          </div>

          <div className="border-t border-zinc-800 pt-4">
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
              Original Input
            </p>
            <p className="font-mono text-sm text-zinc-500 leading-relaxed">
              {standup.raw_input}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}