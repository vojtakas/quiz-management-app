import { useState } from 'react';
import { supabase } from './supabaseClient';
import { View, Text, TextInput, Button, ActivityIndicator, ScrollView } from 'react-native';

export default function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setMessage('Chyba: Uživatel není přihlášen.');
        return;
      }

      const { error } = await supabase
        .from('teams')
        .insert({ team_name: teamName, captain: user.id });

      if (error) {
        setMessage('Chyba při vytváření týmu: ' + error.message);
      } else {
        setMessage('Tým úspěšně vytvořen!');
      }
    } catch (error) {
      setMessage('Chyba při vytváření týmu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Vytvořit tým</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        placeholder="Název týmu"
        value={teamName}
        onChangeText={setTeamName}
        editable={!loading}
      />
      <Button title={loading ? 'Vytvářím tým...' : 'Vytvořit tým'} onPress={handleSubmit} disabled={loading} />
      {loading && <ActivityIndicator size="small" />}
      {message && <Text style={{ marginTop: 20 }}>{message}</Text>}
    </ScrollView>
  );
}
