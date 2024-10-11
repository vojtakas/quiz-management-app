// SignUpUser.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function SignUpUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage('Error during sign-up: ' + error.message);
    } else {
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{ user_id: data.user.id, role: 'user' }]);

      if (roleError) {
        setMessage('Error assigning role: ' + roleError.message);
      } else {
        setMessage('Registration successful! Redirecting...');
        navigate('/user-dashboard');
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Registrace uživatele</h1>
      <form onSubmit={handleSignUp}>
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
          {loading ? 'Registruji...' : 'Registrovat'}
        </button>
      </form>
      {message && <p>{message}</p>}

      {/* Back Button */}
      <button onClick={() => navigate(-1)}>Zpět</button>
    </div>
  );
}
