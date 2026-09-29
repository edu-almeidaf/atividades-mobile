import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ParkingSensor } from './src/components/ParkingSensor';

export default function App() {
  const [isCarOn, setIsCarOn] = useState<boolean>(false);

  const toggleCar = () => setIsCarOn(!isCarOn);

  return (
    <View style={styles.container}>
      <Button 
        title={isCarOn ? "Desligar Carro" : "Ligar Carro (Ativar Sensor)"} 
        onPress={toggleCar}
        color={isCarOn ? "#F44336" : "#2196F3"}
      />

      {isCarOn && <ParkingSensor />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
});