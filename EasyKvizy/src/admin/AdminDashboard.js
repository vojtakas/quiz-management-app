import { Text, Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AdminDashboard() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Vítejte v administraci</Text>
      <Text>Zde můžeš spravovat všechny aspekty svého pub quizu.</Text>

      <Button title="Spravovat sezóny" onPress={() => navigation.navigate('ManageSeasons')} />
      <Button title="Spravovat lokality a kapacitu" onPress={() => navigation.navigate('ManageLocations')} />
      <Button title="Vytvořit speciální kvízy" onPress={() => navigation.navigate('ManageSpecials')} />
      <Button title="Zobrazit/Upravit výsledky" onPress={() => navigation.navigate('ViewResults')} />
      <Button title="Spravovat týmy" onPress={() => navigation.navigate('ManageTeams')} />

      <Text>"Tady můžeš vládnout jako Brumbál v Bradavicích!"</Text>
    </View>
  );
}
