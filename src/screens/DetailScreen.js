import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailScreen({ route }) {
  const { item } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={ item.image ? { uri: item.image } : require('../../assets/placeholder1.png') } style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
      <Text style={styles.cosmos}>Cosmos: {item.cosmos ?? 0}</Text>
      <Text style={styles.description}>
        {item.description ?? 'No hay descripción disponible.'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center', backgroundColor: '#0b1020' },
  image: { width: 220, height: 220, borderRadius: 12, marginTop: 16 },
  name: { color: '#FFD700', fontSize: 26, fontWeight: '800', marginTop: 12 },
  role: { color: '#fff', fontSize: 18, marginTop: 8 },
  cosmos: { color: '#ccc', marginTop: 8 },
  description: { color: '#ddd', marginTop: 12, textAlign: 'center', lineHeight: 20 }
});
