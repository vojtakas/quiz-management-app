import React from 'react';
import { View, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.navigate('SignUpOptions');
  };

  const handleLogIn = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome to Pub Quiz</Text>
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Log In" onPress={handleLogIn} />
    </View>
  );
}
