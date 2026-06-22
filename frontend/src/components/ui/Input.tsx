interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          {label}
        </label>
      )}
      <input
        className={`
          font-mono text-sm bg-zinc-900 border text-zinc-200
          px-3 py-2 outline-none
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