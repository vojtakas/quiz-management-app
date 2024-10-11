import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { supabase } from '../supabaseClient'; // Updated import for supabase

export default function ManageSeasons() {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchSeasons = async () => {
      const { data, error } = await supabase.from('seasons').select('*');
      if (error) {
        console.error(error.message);
      } else {
        setSeasons(data);
      }
    };
    fetchSeasons();
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Spravovat sezóny</Text>
      <ScrollView>
        {seasons.map((season) => (
          <View key={season.id} style={{ padding: 10, borderBottomColor: '#ddd', borderBottomWidth: 1 }}>
            <Text>{season.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
