import { View, Text } from 'react-native';

export default function UserDashboard() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Panel Uživatele</Text>
      <Text style={{ marginTop: 10 }}>
        Zde můžete prohlížet nadcházející kvízy a výsledky.
      </Text>
      {/* Add more user functionalities here */}
    </View>
  );
}
