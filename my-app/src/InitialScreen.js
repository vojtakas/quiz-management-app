import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function InitialScreen() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSignUp = () => {
    navigate('/signup-options');  // Redirects to sign-up options
  };

  const handleLogIn = () => {
    navigate('/login');  // Redirects to the login screen
  };

  const handleTestLogout = async () => {
    // Log out the current user
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage('Chyba při odhlášení: ' + error.message);
    } else {
      // Clear local storage and session storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Set message indicating the logout was successful or no user was logged in
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

      {/* Add the testing log out button */}
      <div>
        <button onClick={handleTestLogout}>Test Logout (Clear Cache & Sign Out)</button>
      </div>

      {/* Display confirmation or error message */}
      {message && <p>{message}</p>}
    </div>
  );
}
