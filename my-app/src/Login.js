import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    // Get user role and redirect to relevant dashboard
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

    if (role === 'captain') {
      navigate('/captain-dashboard');
    } else if (role === 'user') {
      navigate('/user-dashboard');
    } else if (role === 'moderator') {
      navigate('/moderator-dashboard');
    } else if (role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      console.error('Unknown role:', role);
    }

    setLoading(false);
  };

  // Handle Back Button click
  const handleBack = () => {
    navigate(-1);  // Navigates back to the previous page
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
      <button onClick={handleBack}>Zpět</button>  {/* Back Button */}
    </div>
  );
}
