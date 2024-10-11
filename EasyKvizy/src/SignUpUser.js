import { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { supabase } from './supabaseClient';
import { useRouter } from 'expo-router';

export default function SignUpUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage('Chyba při registraci: ' + error.message);
    } else {
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([{ user_id: data.user.id, role: 'user' }]);

      if (roleError) {
        setMessage('Chyba přiřazení role: ' + roleError.message);
      } else {
        setMessage('Registrace byla úspěšná! Přesměrování...');
        router.push('/user-dashboard');
      }
    }

    setLoading(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Registrace uživatele</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        placeholder="Zadejte email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
        placeholder="Zadejte heslo"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={loading ? 'Registruji...' : 'Registrovat'}
        onPress={handleSignUp}
        disabled={loading}
      />
      {loading && <ActivityIndicator size="large" />}
      {message && <Text style={{ marginTop: 20 }}>{message}</Text>}
      <Button title="Zpět" onPress={() => router.back()} />
    </View>
  );
}
