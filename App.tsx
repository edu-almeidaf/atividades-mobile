import React from 'react';
import { ScrollView, Alert, StyleSheet } from 'react-native';
import { UserProfileCard } from './src/components/UserProfileCard';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <UserProfileCard
        name="Ana Silva"
        role="Product Designer"
        avatarUrl="https://i.pravatar.cc/150?img=47"
        bio="Apaixonada por criar experiências intuitivas."
        status="online"
        onPressFollow={() => Alert.alert('Seguindo Sarah!')}
      />

      <UserProfileCard
        name="Matheus campos"
        role="Backend Engineer"
        avatarUrl="https://i.pravatar.cc/150?img=11"
        status="offline"
      />

      <UserProfileCard
        name="Maria dos Santos"
        role="UX Designer"
        avatarUrl="https://i.pravatar.cc/150?img=32"
        bio="Explorando as interações humanas com a tecnologia."
        onPressFollow={() => Alert.alert('Seguindo Elena!')}
      />
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    paddingTop: 50 
  }
});