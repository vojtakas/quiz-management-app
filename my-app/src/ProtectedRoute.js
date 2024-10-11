import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();  // Fetch session
      if (error) {
        console.error('Error fetching session:', error.message);
      }
      setSession(data.session);
      setLoading(false);
    };
    fetchSession();
  }, []);

  if (loading) {
    return <div>Načítám...</div>;  // Show loading while fetching session
  }

  if (!session) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>„Nepřekročíš, Frodo!“</h2>
        <p>„Bez přihlášení nemůžeš projít. Zkus to znovu s přihlášením! 🛑“</p>
        <button onClick={() => window.location.href = '/login'} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Přihlásit se
        </button>
      </div>
    );  // Lord of the Rings reference with the "You Shall Not Pass" twist
  }

  return children;  // Render protected content if authenticated
};

export default ProtectedRoute;