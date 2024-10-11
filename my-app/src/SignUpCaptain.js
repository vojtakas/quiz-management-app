import { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SignUpCaptain() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert('Chyba při registraci: ' + error.message);
    } else {
      // Check if email verification is required
      if (data.user?.email_confirmed_at) {
        // If email is already confirmed, go to the dashboard
        alert('Registrace úspěšná! Nyní jste kapitán týmu.');
        navigate('/captain-dashboard');
      } else {
        // If email confirmation is needed, redirect to the login page
        alert('Registrace úspěšná! Potvrďte svou e-mailovou adresu.');
        navigate('/login');
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>{t('signup_heading')}</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder={t('email_placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('password_placeholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? t('loading_button') : t('signup_button')}
        </button>
      </form>
      <button onClick={() => navigate(-1)}>{t('back_button') || 'Zpět'}</button>
    </div>
  );
}
