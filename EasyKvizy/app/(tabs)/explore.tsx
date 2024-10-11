import React from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation } from 'expo-router';

export default function ExploreScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Prozkoumat Kvízy</Text>
      <Button
        title="Prozkoumat Nadcházející Kvízy"
        onPress={() => navigation.navigate('UpcomingQuizzes')}
      />
      <Button
        title="Prozkoumat Historii Kvízů"
        onPress={() => navigation.navigate('QuizHistory')}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}