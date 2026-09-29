import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VisitorForm } from './src/components/VisitorForm';
import { WelcomeScreen } from './src/components/WelcomeScreen';

export default function App() {
  const [name, setName] = useState<string>('');
  const [accessAuthorized, setAccessAuthorized] = useState<boolean>(false);

  const handleRequestAccess = () => setAccessAuthorized(true);
  
  const handleLogout = () => {
    setAccessAuthorized(false);
    setName(''); 
  };

  return (
    <View style={styles.container}>
      {!accessAuthorized ? (
        <VisitorForm 
          name={name} 
          onChangeName={setName} 
          onSubmit={handleRequestAccess} 
        />
      ) : (
        <WelcomeScreen 
          name={name} 
          onLogout={handleLogout} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});