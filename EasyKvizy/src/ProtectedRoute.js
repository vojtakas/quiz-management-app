import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { supabase } from './supabaseClient';
import { useRouter } from 'expo-router';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Chyba při získávání sezení:', error.message);
      }
      setSession(data.session);
      setLoading(false);
    };
    fetchSession();
  }, []);

  if (loading) {
    return <Text>Načítám...</Text>; // Display while loading session
  }

  if (!session) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>„Nepřekročíš, Frodo!“</Text>
        <Text>Bez přihlášení nemůžeš projít. Zkus to znovu s přihlášením! 🛑</Text>
        <Button
          title="Přihlásit se"
          onPress={() => router.push('/login')}
        />
      </View>
    );
  }

  return children;
};

export default ProtectedRoute;
