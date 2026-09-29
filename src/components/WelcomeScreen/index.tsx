import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface WelcomeScreenProps {
  name: string;
  onLogout: () => void;
}

export function WelcomeScreen({ name, onLogout }: WelcomeScreenProps) {
  return (
    <View style={styles.content}>
      <Text style={styles.welcomeText}>
        Acesso Liberado para: {name}
      </Text>
      
      <Button 
        title="Sair" 
        color="red"
        onPress={onLogout} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: 15,
    width: '100%',
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  }
});