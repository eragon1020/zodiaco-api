import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_BASE = 'https://zodiaco-api.onrender.com';

export default function AddCharacterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [cosmos, setCosmos] = useState('');
  const [image, setImage] = useState('');

  const submit = async () => {
    if (!name) {
      Alert.alert('Validación', 'El nombre es obligatorio');
      return;
    }
    try {
      await axios.post(`${API_BASE}/characters`, { name, role, cosmos: Number(cosmos) || 0, image, description: '' });
      Alert.alert('Éxito', 'Caballero agregado');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'No se pudo agregar: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Seiya" placeholderTextColor="#999" />
      <Text style={styles.label}>Rol</Text>
      <TextInput style={styles.input} value={role} onChangeText={setRole} placeholder="Bronce" placeholderTextColor="#999" />
      <Text style={styles.label}>Cosmos</Text>
      <TextInput style={styles.input} value={cosmos} onChangeText={setCosmos} keyboardType="numeric" placeholder="9000" placeholderTextColor="#999" />
      <Text style={styles.label}>Imagen URL (opcional)</Text>
      <TextInput style={styles.input} value={image} onChangeText={setImage} placeholder="https://..." placeholderTextColor="#999" />
      <View style={{ marginTop: 12 }}>
        <Button title="Agregar" onPress={submit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0b1020' },
  label: { color: '#fff', marginTop: 8 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginTop: 6 }
});
