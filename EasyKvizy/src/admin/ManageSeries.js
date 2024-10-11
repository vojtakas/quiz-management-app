import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import { supabase } from '../supabaseClient';  // Adjust to your Supabase client path
import ManageSeries from './ManageSeries';
import ManageSingleQuiz from './ManageSingleQuiz';

const ManageLocations = () => {
  const [locations, setLocations] = useState([]);
  const [currentView, setCurrentView] = useState('locations');  
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from('locations').select('*');
      if (error) {
        console.error('Error fetching locations:', error);
      } else {
        setLocations(data);
      }
    };
    fetchLocations();
  }, []);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setCurrentView('location-detail');
  };

  const handleManageSeries = () => {
    setCurrentView('manage-series');
  };

  const handleManageSingleQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentView('manage-single-quiz');
  };

  return (
    <View>
      {currentView === 'locations' && (
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Spravovat lokality</Text>
          <ScrollView>
            {locations.map((location) => (
              <TouchableOpacity key={location.id} onPress={() => handleLocationClick(location)}>
                <View style={{ padding: 10, borderBottomColor: '#ddd', borderBottomWidth: 1 }}>
                  <Text>{location.name} - Kapacita: {location.capacity} - Kvíz den: {location.quiz_days}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {currentView === 'location-detail' && selectedLocation && (
        <View>
          <Text style={{ fontSize: 18 }}>{selectedLocation.name}</Text>
          <Button title="Zpět k lokalitám" onPress={() => setCurrentView('locations')} />
          <View>
            <Button title="Spravovat sezóny" onPress={handleManageSeries} />
            <Button title="Spravovat jednotlivé kvízy" onPress={() => setCurrentView('single-quiz-select')} />
          </View>
        </View>
      )}

      {currentView === 'manage-series' && (
        <ManageSeries
          location={selectedLocation}
          backToLocationDetail={() => setCurrentView('location-detail')}
        />
      )}

      {currentView === 'single-quiz-select' && (
        <View>
          <Text>Vyberte datum kvízu</Text>
          {['2024-10-10', '2024-10-17', '2024-10-24'].map((date) => (
            <Button key={date} title={date} onPress={() => handleManageSingleQuiz({ date })} />
          ))}
          <Button title="Zpět k lokalitě" onPress={() => setCurrentView('location-detail')} />
        </View>
      )}

      {currentView === 'manage-single-quiz' && selectedQuiz && (
        <ManageSingleQuiz
          quiz={selectedQuiz}
          backToLocationDetail={() => setCurrentView('location-detail')}
        />
      )}
    </View>
  );
};

export default ManageLocations;
