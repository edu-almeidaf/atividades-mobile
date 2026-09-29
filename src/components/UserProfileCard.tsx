import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

export interface UserProfileCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  bio?: string;
  status?: 'online' | 'offline';
  onPressFollow?: () => void;
}

export function UserProfileCard({ name, role, avatarUrl, bio, status, onPressFollow }: UserProfileCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          {status && (
            <View style={[styles.status, status === 'online' ? styles.online : styles.offline]} />
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text>{role}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {bio ? bio : 'Este usuário não possui biografia.'}
      </Text>

      {onPressFollow && (
        <Button title="Seguir" onPress={onPressFollow} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 15, 
    marginBottom: 15, 
    borderRadius: 8 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25 
  },
  status: { 
    width: 12, 
    height: 12, 
    borderRadius: 6, 
    position: 'absolute', 
    bottom: 0, 
    right: 0 
  },
  online: { backgroundColor: 'green' },
  offline: { backgroundColor: 'gray' },
  info: { marginLeft: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  bio: { marginBottom: 10 }
});