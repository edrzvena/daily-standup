import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';;
import { registerUser } from '../../services/standup.service';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!email || !password) {
      setError('Semua field wajib diisi');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await registerUser(email, password);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Register gagal');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        label="Email"
        type="email"
        placeholder="pedro@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        placeholder="min. 6 karakter"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="font-mono text-xs text-red-400">{error}</p>}
      <Button onClick={handleSubmit} loading={loading} className="w-full mt-2">
        Create Account
      </Button>
      <p className="font-mono text-xs text-zinc-600 text-center">
        Sudah punya akun?{' '}
        <a href="/login" className="text-zinc-400 hover:text-lime-400 transition-colors">
          Login
        </a>
      </p>
    </div>
  );
}