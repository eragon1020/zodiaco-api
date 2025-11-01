import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const API_BASE = 'https://<YOUR_CHARACTERS_SERVICE_URL>';

export default function App() {
  const [chars, setChars] = useState([]);

  useEffect(() => {
    fetchChars();
  }, []);

  const fetchChars = async () => {
    try {
      const res = await axios.get(`${API_BASE}/characters`);
      setChars(res.data);
    } catch (err) {
      console.log('Error fetching', err.message);
    }
  };

  const renderItem = ({ item }) => (
    <PanGestureHandler onGestureEvent={() => {}}>
      <View style={{ padding: 16, backgroundColor: '#fff', marginBottom: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        <Text>Cosmos: {item.cosmos}</Text>
        <Text>Role: {item.role}</Text>
      </View>
    </PanGestureHandler>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1, padding: 16, backgroundColor: '#eee' }}>
      <Text style={{ fontSize: 20, marginBottom: 8 }}>Caballeros del Zodiaco - Mobile</Text>
      <Button title="Refrescar" onPress={fetchChars} />
      <FlatList data={chars} keyExtractor={c => c._id || c.name} renderItem={renderItem} />
    </GestureHandlerRootView>
  );
}
