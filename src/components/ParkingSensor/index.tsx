import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

export function ParkingSensor() {
  const [distancia, setDistancia] = useState<number>(50);

  useEffect(() => {
    console.log("📡 Sistema de Sensores Iniciado");
    
    const interval = setInterval(() => {
      console.log("📡 Sistema vivo...");
    }, 2000);

    return () => {
      clearInterval(interval);
      console.log("📴 Sistema de Sensores Desligado");
    };
  }, []);

  useEffect(() => {
    if (distancia < 20) {
      Alert.alert("⚠️ PERIGO: Muito Próximo!");
    }
  }, [distancia]);

  const aproximar = () => setDistancia(prev => prev - 5);
  const afastar = () => setDistancia(prev => prev + 5);

  return (
    <View style={styles.sensorContainer}>
      <Text style={styles.title}>Sensor Traseiro</Text>
      
      <Text style={[
        styles.distanceText, 
        distancia < 20 ? styles.dangerText : styles.safeText
      ]}>
        {distancia} cm
      </Text>

      <View style={styles.buttonRow}>
        <Button title="- Aproximar" onPress={aproximar} color="#FF9800" />
        <Button title="+ Afastar" onPress={afastar} color="#4CAF50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sensorContainer: {
    marginTop: 40,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  distanceText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  safeText: {
    color: '#333',
  },
  dangerText: {
    color: '#F44336',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
  }
});