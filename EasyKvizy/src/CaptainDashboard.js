import { Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CaptainDashboard() {
  const navigation = useNavigation();

  return (
    <>
      <Text>Vítejte, Kapitáne!</Text>
      <Button title="Zpět na úvodní obrazovku" onPress={() => navigation.navigate('InitialScreen')} />
      <Text>Možnosti správy týmu a přihlášení na kvíz.</Text>
    </>
  );
}
