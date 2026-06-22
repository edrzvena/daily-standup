import type { Standup } from '../types';
import { formatDate } from '../utils/formatDate';

interface StandupCardProps {
  standup: Standup;
  onClick?: () => void;
}

export function StandupCard({ standup, onClick }: StandupCardProps) {
  return (
    <div
      onClick={onClick}
      className="border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-600 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs text-lime-400 uppercase tracking-widest">
          {formatDate(standup.standup_date)}
        </span>
        <span className="font-mono text-xs text-zinc-600">#{standup.id}</span>
      </div>
      <p className="font-mono text-sm text-zinc-400 line-clamp-2">
        {standup.raw_input}
      </p>
    </div>
  );
}