import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import { supabase } from '../supabaseClient';
import { useNavigation } from '@react-navigation/native';

export default function ManageLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from('locations').select('*');
      if (error) {
        console.error('Error fetching locations:', error.message);
      } else {
        setLocations(data);
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const handleLocationClick = async (locationId) => {
    setSelectedLocation(locationId);
    setQuizLoading(true);

    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('location_id', locationId);

    if (error) {
      console.error('Error fetching quizzes:', error.message);
    } else {
      setQuizzes(data);
    }
    setQuizLoading(false);
  };

  const handleQuizClick = (quizId) => {
    navigation.navigate('ManageSingleQuiz', { quizId });
  };

  if (loading) {
    return <Text>Načítám...</Text>;
  }

  return (
    <View>
      <Text>Spravovat lokality a kvízy</Text>
      <ScrollView>
        {locations.map((location) => (
          <TouchableOpacity key={location.id} onPress={() => handleLocationClick(location.id)}>
            <View style={{ margin: 10, padding: 10, borderColor: 'black', borderWidth: 1 }}>
              <Text>{location.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedLocation && (
        <View>
          <Text>Kvízy pro lokaci: {locations.find((loc) => loc.id === selectedLocation)?.name}</Text>
          {quizLoading ? (
            <Text>Načítám kvízy...</Text>
          ) : (
            <ScrollView style={{ maxHeight: 300 }}>
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <TouchableOpacity key={quiz.id} onPress={() => handleQuizClick(quiz.id)}>
                    <View style={{ padding: 8, borderBottomColor: '#ddd', borderBottomWidth: 1 }}>
                      <Text>{quiz.quiz_name} - {quiz.quiz_date}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>Žádné kvízy nalezeny</Text>
              )}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
}
