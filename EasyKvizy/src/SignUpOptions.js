import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUpOptions() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Vyberte typ registrace</Text>
      <Button
        title="Registrovat jako kapitán"
        onPress={() => router.push('/signup-captain')}
      />
      <Button
        title="Registrovat jako uživatel"
        onPress={() => router.push('/signup-user')}
      />
      {/* Back Button */}
      <Button title="Zpět" onPress={() => router.back()} />
    </View>
  );
}
