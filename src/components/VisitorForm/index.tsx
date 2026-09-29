import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface VisitorFormProps {
  name: string;
  onChangeName: (text: string) => void;
  onSubmit: () => void;
}

export function VisitorForm({ name, onChangeName, onSubmit }: VisitorFormProps) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Identificação de Visitante</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome completo"
        value={name}
        onChangeText={onChangeName}
      />
      
      <Button 
        title="Solicitar Acesso" 
        onPress={onSubmit} 
        disabled={name.trim().length === 0} 
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});