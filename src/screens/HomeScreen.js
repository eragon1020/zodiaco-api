import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard';

const API_BASE = 'https://zodiaco-api.onrender.com';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChars = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/characters`);
      setData(res.data);
    } catch (err) {
      console.log('Error fetching', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchChars();
    });
    fetchChars();
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Caballeros del Zodiaco</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('Add')}>
          <Text style={styles.addBtnText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      {loading ? <ActivityIndicator size="large" color="#FFD700" /> :
        <FlatList
          data={data}
          keyExtractor={(item) => item._id ?? item.name}
          renderItem={({ item }) => <CharacterCard item={item} onPress={(i) => navigation.navigate('Detail', { item: i })} />}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0b1020' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { color: '#FFD700', fontSize: 20, fontWeight: '700' },
  addBtn: { backgroundColor: '#1f6feb', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  addBtnText: { color: '#fff', fontWeight: '700' },
});
