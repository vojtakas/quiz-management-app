import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function SignInCaptain() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // Sign the user in
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setErrorMessage('Chyba při přihlašování: ' + error.message);
        setLoading(false);
        return;
      }

      // Fetch the user's role from the user_roles table
      const { data: roles, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (roleError || roles.length === 0) {
        setErrorMessage('Nelze načíst role uživatele.');
        setLoading(false);
        return;
      }

      // Role-based routing
      const userRole = roles[0].role;
      if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else if (userRole === 'captain') {
        navigate('/captain-dashboard');
      } else if (userRole === 'moderator') {
        navigate('/moderator-dashboard');
      } else {
        navigate('/user-dashboard');  // Default to user dashboard
      }
    } catch (error) {
      setErrorMessage('Chyba při přihlašování.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Přihlášení Kapitána</h2>
      <form onSubmit={handleSignIn}>
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
          {loading ? 'Přihlašuji...' : 'Přihlásit se'}
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
