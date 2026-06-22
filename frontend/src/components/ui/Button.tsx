interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  loading?: boolean;
}

export function Button({ variant = 'primary', loading, children, className = '', ...props }: ButtonProps) {
  const base = 'font-mono text-sm px-4 py-2 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-lime-400 text-zinc-900 hover:bg-lime-300',
    ghost:   'border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100',
    danger:  'border border-red-400 text-red-400 hover:bg-red-400 hover:text-zinc-900',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}