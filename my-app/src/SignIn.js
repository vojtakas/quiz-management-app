// SignIn.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage('Chyba při přihlašování: ' + error.message);
      setLoading(false);
    } else {
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (roleError || !roleData) {
        setMessage('Error fetching role: ' + (roleError?.message || 'No role found.'));
        setLoading(false);
        return;
      }

      const role = roleData.role;

      if (role === 'user') {
        navigate('/user-dashboard');
      } else if (role === 'captain') {
        navigate('/captain-dashboard');
      } else if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'moderator') {
        navigate('/moderator-dashboard');
      }

      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Přihlásit se</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Zadejte email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Zadejte heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Přihlašuji...' : 'Přihlásit se'}
        </button>
      </form>
      {message && <p>{message}</p>}

      {/* Back Button */}
      <button onClick={() => navigate(-1)}>Zpět</button>
    </div>
  );
}
