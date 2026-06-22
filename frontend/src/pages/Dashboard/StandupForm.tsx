import { useState } from 'react';
import { Textarea } from '../../components/Textarea';
import { Button } from '../../components/ui/Button';
import { useStandupStore } from '../../store/standup.store';

export function StandupForm() {
  const [input, setInput] = useState('');
  const { generate, isGenerating, error } = useStandupStore();

  async function handleGenerate() {
    if (!input.trim()) return;
    await generate(input);
    setInput('');
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          What did you work on?
        </p>
        <span className="font-mono text-xs text-zinc-700">
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
      </div>

      <Textarea
        placeholder="Ceritain ngapain aja hari ini, bebas aja. Misalnya: fix bug auth, lanjut integrasi API, stuck di CORS..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
      />

      {error && <p className="font-mono text-xs text-red-400">{error}</p>}

      <Button
        onClick={handleGenerate}
        loading={isGenerating}
        disabled={!input.trim()}
        className="self-end"
      >
        {isGenerating ? 'Generating...' : '→ Generate Standup'}
      </Button>
    </div>
  );
}