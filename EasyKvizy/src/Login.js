import { useState } from 'react';
import { supabase } from './supabaseClient';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error during login:', error.message);
      setLoading(false);
      return;
    }

    const { data: userRoles, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', data.user.id);

    if (roleError || !userRoles.length) {
      console.error('Error fetching user role:', roleError?.message);
      setLoading(false);
      return;
    }

    const role = userRoles[0].role;
    switch (role) {
      case 'captain':
        router.push('/captain-dashboard');
        break;
      case 'user':
        router.push('/user-dashboard');
        break;
      case 'moderator':
        router.push('/moderator-dashboard');
        break;
      case 'admin':
        router.push('/admin-dashboard');
        break;
      default:
        console.error('Unknown role:', role);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Přihlásit se</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Načítání...' : 'Přihlásit se'}
        </button>
      </form>
      <button onClick={() => router.back()}>Zpět</button>
    </div>
  );
}
