import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CharacterCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.card}>
      <Image source={ item.image ? { uri: item.image } : require('../../assets/placeholder1.png') } style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role || 'Desconocido'}</Text>
        <Text style={styles.cosmos}>Cosmos: {item.cosmos ?? 0}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  cosmos: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  }
});
