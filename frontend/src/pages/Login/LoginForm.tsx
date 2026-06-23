import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { loginUser } from '../../services/standup.service';
import { useAuthStore } from '../../store/auth.store';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!email || !password) {
      setError('Email dan password wajib diisi');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { token, user } = await loginUser(email, password);
      setAuth(user, token);

      // Redirect berdasarkan role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        label="Email"
        type="email"
        placeholder="user@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="font-mono text-xs text-red-400">{error}</p>}
      <Button onClick={handleSubmit} loading={loading} className="w-full mt-2">
        Login
      </Button>
      <p className="font-mono text-xs text-zinc-600 text-center">
        Belum punya akun?{' '}
        <a href="/register" className="text-zinc-400 hover:text-lime-400 transition-colors">
          Register
        </a>
      </p>
    </div>
  );
}