import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useRouter } from 'expo-router';

export default function InitialScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleSignUp = () => {
    router.push('/signup-options'); // Navigate to sign-up options
  };

  const handleLogIn = () => {
    router.push('/login'); // Navigate to login screen
  };

  const handleTestLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage('Chyba při odhlášení: ' + error.message);
    } else {
      localStorage.clear();
      sessionStorage.clear();
      setMessage('Úspěšně jste se odhlásili nebo jste již byli odhlášeni.');
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setMessage('Žádný uživatel není přihlášen.');
      }
    };
    checkSession();
  }, []);

  return (
    <div>
      <h1>Vítejte v aplikaci Pub Quiz</h1>
      <div>
        <button onClick={handleSignUp}>Registrovat se</button>
        <button onClick={handleLogIn}>Přihlásit se</button>
      </div>
      <div>
        <button onClick={handleTestLogout}>Test Logout (Clear Cache & Sign Out)</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}
