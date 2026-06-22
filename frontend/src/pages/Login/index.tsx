import { LoginForm } from './LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8">
          <p className="font-mono text-xs text-lime-400 uppercase tracking-widest mb-2">
            daily standup
          </p>
          <h1 className="font-mono text-2xl text-zinc-100 font-bold">
            Welcome back.
          </h1>
          <p className="font-mono text-sm text-zinc-500 mt-1">
            Log in to continue your standup history.
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}