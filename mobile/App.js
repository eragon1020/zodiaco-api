import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  RefreshControl,
  Keyboard
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_BASE = 'https://zodiaco-api.onrender.com/characters';

export default function App() {
  const [allChars, setAllChars] = useState([]);
  const [filteredChars, setFilteredChars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchChars = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_BASE);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo conectar`);
      }
      
      const data = await response.json();
      const chars = Array.isArray(data) ? data : [];
      setAllChars(chars);
      setFilteredChars(chars);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchChars();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterCharacters();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, allChars]);

  const filterCharacters = () => {
    if (!searchQuery.trim()) {
      setFilteredChars(allChars);
      return;
    }

    const filtered = allChars.filter(char => 
      char.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.role?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredChars(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchChars();
  };

  const clearSearch = () => {
    setSearchQuery('');
    Keyboard.dismiss();
  };

  const renderCharacter = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardGlow} />
      <Image 
        source={{ uri: item.image || 'https://via.placeholder.com/300/FFD700/0b1020?text=' + encodeURIComponent(item.name || '?') }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name || 'Sin nombre'}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleLabel}>{item.role || 'Desconocido'}</Text>
        </View>
        <Text style={styles.desc} numberOfLines={3}>
          {item.description || 'Sin descripción disponible'}
        </Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>⚔️ CABALLEROS</Text>
        <Text style={styles.subtitle}>DEL ZODIACO</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar personajes..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={() => Keyboard.dismiss()}
          blurOnSubmit={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredChars.length} {filteredChars.length === 1 ? 'personaje encontrado' : 'personajes encontrados'}
        </Text>
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearFiltersButton}>
            <Text style={styles.clearFiltersText}>Limpiar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.loadingText}>Cargando personajes...</Text>
          <Text style={styles.loadingSubtext}>Conectando con el servidor</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.centerContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorSubtext}>Verifica que el backend esté activo</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchChars}>
            <Text style={styles.retryText}>🔄 Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <FlatList
        ListHeaderComponent={renderHeader}
        data={filteredChars}
        keyExtractor={(item, index) => item._id || item.id || `char-${index}`}
        renderItem={renderCharacter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        removeClippedSubviews={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFD700"
            colors={["#FFD700"]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No se encontraron personajes</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery ? 'Intenta con otros términos de búsqueda' : 'No hay datos disponibles'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0a0e1a'
  },
  header: { 
    paddingHorizontal: 16, 
    paddingTop: 10, 
    paddingBottom: 16 
  },
  titleContainer: { 
    alignItems: 'center', 
    marginBottom: 20, 
    paddingTop: 10 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '900', 
    color: '#FFD700', 
    letterSpacing: 2, 
    textShadowColor: 'rgba(255, 215, 0, 0.5)', 
    textShadowOffset: { width: 0, height: 0 }, 
    textShadowRadius: 10 
  },
  subtitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#fff', 
    letterSpacing: 4, 
    marginTop: 4 
  },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 16, 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 215, 0, 0.2)' 
  },
  searchIcon: { 
    fontSize: 20, 
    marginRight: 8 
  },
  searchInput: { 
    flex: 1, 
    fontSize: 16, 
    color: '#fff' 
  },
  clearButton: { 
    padding: 4 
  },
  clearIcon: { 
    fontSize: 18, 
    color: '#888', 
    fontWeight: '700' 
  },
  resultsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 8 
  },
  resultsText: { 
    color: '#888', 
    fontSize: 14, 
    fontWeight: '600' 
  },
  clearFiltersButton: { 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    backgroundColor: 'rgba(255, 107, 107, 0.2)', 
    borderRadius: 12 
  },
  clearFiltersText: { 
    color: '#ff6b6b', 
    fontSize: 12, 
    fontWeight: '700' 
  },
  listContent: { 
    paddingBottom: 20 
  },
  card: { 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    borderRadius: 20, 
    marginHorizontal: 16, 
    marginBottom: 16, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: 'rgba(255, 215, 0, 0.2)' 
  },
  cardGlow: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    height: 100, 
    backgroundColor: 'rgba(255, 215, 0, 0.05)' 
  },
  cardContent: { 
    padding: 16 
  },
  image: { 
    width: '100%', 
    height: 200, 
    backgroundColor: 'rgba(255, 255, 255, 0.05)' 
  },
  name: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: '#FFD700', 
    marginBottom: 8 
  },
  roleBadge: { 
    alignSelf: 'flex-start', 
    backgroundColor: 'rgba(255, 215, 0, 0.2)', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 12, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 215, 0, 0.3)' 
  },
  roleLabel: { 
    color: '#FFD700', 
    fontSize: 12, 
    fontWeight: '700' 
  },
  desc: { 
    color: '#ccc', 
    fontSize: 14, 
    lineHeight: 20 
  },
  centerContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  loadingText: { 
    color: '#FFD700', 
    marginTop: 16, 
    fontSize: 18, 
    fontWeight: '700' 
  },
  loadingSubtext: { 
    color: '#888', 
    marginTop: 8, 
    fontSize: 14 
  },
  errorIcon: { 
    fontSize: 64, 
    marginBottom: 16 
  },
  errorText: { 
    color: '#ff6b6b', 
    fontSize: 18, 
    fontWeight: '700', 
    textAlign: 'center', 
    marginBottom: 8 
  },
  errorSubtext: { 
    color: '#888', 
    fontSize: 14, 
    textAlign: 'center', 
    marginBottom: 24 
  },
  retryButton: { 
    backgroundColor: '#FFD700', 
    paddingHorizontal: 32, 
    paddingVertical: 14, 
    borderRadius: 12 
  },
  retryText: { 
    color: '#0a0e1a', 
    fontWeight: '700', 
    fontSize: 16 
  },
  emptyContainer: { 
    alignItems: 'center', 
    paddingVertical: 60 
  },
  emptyIcon: { 
    fontSize: 64, 
    marginBottom: 16 
  },
  emptyText: { 
    color: '#888', 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 8 
  },
  emptySubtext: { 
    color: '#666', 
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20
  }
});