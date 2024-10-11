import { useState } from 'react';
import { Alert, View, TextInput, Button, Text } from 'react-native';
import { supabase } from './supabaseClient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function SignUpCaptain() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert('Chyba při registraci', error.message);
    } else {
      if (data.user?.email_confirmed_at) {
        Alert.alert('Registrace úspěšná', 'Nyní jste kapitán týmu.');
        router.push('/captain-dashboard');
      } else {
        Alert.alert('Registrace úspěšná', 'Potvrďte svou e-mailovou adresu.');
        router.push('/login');
      }
    }

    setLoading(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{t('signup_heading')}</Text>
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
        placeholder={t('email_placeholder')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        required
      />
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
        placeholder={t('password_placeholder')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        required
      />
      <Button
        title={loading ? t('loading_button') : t('signup_button')}
        onPress={handleSignUp}
        disabled={loading}
      />
      <Button title={t('back_button') || 'Zpět'} onPress={() => router.back()} />
    </View>
  );
}
