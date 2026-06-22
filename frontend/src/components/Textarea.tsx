interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          {label}
        </label>
      )}
      <textarea
        className={`
          font-mono text-sm bg-zinc-900 border text-zinc-200
          px-3 py-2 outline-none resize-none
          placeholder:text-zinc-600
          focus:border-lime-400
          ${error ? 'border-red-400' : 'border-zinc-700'}
          ${className}
        `}
        {...props}
      />
      {error && <span className="font-mono text-xs text-red-400">{error}</span>}
    </div>
  );
}