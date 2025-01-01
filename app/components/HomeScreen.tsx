import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  Platform,
  StatusBar,
} from 'react-native';
import axios from 'axios';

const API_KEY = '998c3726-9506-4c1c-b6fb-7f45fecac7b3';
const { width } = Dimensions.get('window');

interface ArtItem {
  id: number;
  title: string;
  imageUrl: string;
  culture: string;
  period: string;
}

const HomeScreen: React.FC = () => {
  const [artItems, setArtItems] = useState<ArtItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchArtData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&size=10`
      );

      const data = response.data.records.map((item: any) => ({
        id: item.objectid,
        title: item.title || 'Untitled',
        imageUrl: item.primaryimageurl || '',
        culture: item.culture || 'Unknown',
        period: item.period || 'Unknown',
      }));

      setArtItems(data);
    } catch (error) {
      console.error('Error fetching art data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchArtData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchArtData();
  };

  const renderItem = ({ item }: { item: ArtItem }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.artImage} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.artTitle}>{item.title}</Text>
        <Text style={styles.artInfo}>Culture: {item.culture}</Text>
        <Text style={styles.artInfo}>Period: {item.period}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading art data...</Text>
        </View>
      ) : (
        <FlatList
          data={artItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  artImage: {
    width: '100%',
    height: width * 0.6,
    backgroundColor: '#FFF', // Ensures a clean white base for images with transparency
  },
  imagePlaceholder: {
    width: '100%',
    height: width * 0.6,
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#888',
    fontSize: 16,
  },
  cardContent: {
    padding: 16,
  },
  artTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  artInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default HomeScreen;
