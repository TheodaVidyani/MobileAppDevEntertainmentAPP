import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TextInput } from 'react-native';
import axios from 'axios';
import { useCount } from '../context/CountContext'; // Import the context hook

const { width } = Dimensions.get('window');

// Define a TypeScript interface for the artwork data
interface Artwork {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImage: string | null; // primaryImage can be null
}

const ArtGalleryApp = () => {
  const [searchQuery, setSearchQuery] = useState('sunflowers'); // Default query
  const [artworks, setArtworks] = useState<Artwork[]>([]); // Explicitly set the state type to Artwork[]
  const [loading, setLoading] = useState(false);

  const { count, incrementCount } = useCount(); // Get count and increment function from context

  useEffect(() => {
    if (searchQuery) {
      fetchArtworks();
    }
  }, [searchQuery]);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      // Fetch object IDs based on the search query
      const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchQuery}`;
      const searchResponse = await axios.get(searchUrl);
      const objectIDs = searchResponse.data.objectIDs?.slice(0, 20) || []; // Limit to 20 results

      // Fetch artwork details for each object ID
      const artworksData = await Promise.all(
        objectIDs.map(async (id: number) => { // Ensure the ID is treated as a number
          try {
            const objectUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
            const objectResponse = await axios.get(objectUrl);
            return objectResponse.data;
          } catch (error) {
            // Handle the 404 error and skip to the next item
            if (axios.isAxiosError(error) && error.response?.status === 404) {
              console.warn(`Artwork with ID ${id} not found (404). Skipping...`);
              return null; // Skip this artwork
            }
            console.error('Error fetching artwork:', error);
            return null; // Skip this artwork on other errors
          }
        })
      );

      // Filter artworks with a valid primaryImage
      const validArtworks = artworksData.filter((artwork) => artwork.primaryImage);
      setArtworks(validArtworks); // Line 33
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback for missing images
  const getImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) {
      console.warn('Image URL missing or invalid, using placeholder');
      return 'https://via.placeholder.com/300'; // Fallback to placeholder image
    }
    return imageUrl;
  };

  const renderArtwork = ({ item }: { item: Artwork }) => (
    <View style={styles.artCard}>
      <Text style={styles.artTitle}>{item.title || 'Untitled Artwork'}</Text>
      <Image
        source={{ uri: getImageUrl(item.primaryImage) }}
        style={styles.artImage}
        onError={() => console.warn(`Failed to load image for artwork: ${item.title}`)}
      />
      <Text style={styles.artArtist}>{item.artistDisplayName || 'Artist Unknown'}</Text>
      <Text style={styles.clickCountText}>Clicked {count} times</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Metropolitan Museum Art Collection</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for art (e.g., Van Gogh)"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <Text style={styles.loadingText}>Loading artworks...</Text>
      ) : (
        <FlatList
          data={artworks}
          keyExtractor={(item) => item.objectID.toString()}
          renderItem={({ item }) => (
            <View onTouchEnd={incrementCount}>{renderArtwork({ item })}</View>
          )}
          contentContainerStyle={styles.artList}
        />
      )}

      {/* Floating button at the bottom */}
      <View style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#6A4E23',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  searchBar: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderColor: '#C4A66A',
    color: '#6A4E23',
    borderWidth: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  artList: {
    padding: 10,
  },
  artCard: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  artImage: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  artTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A4E23',
    marginBottom: 5,
  },
  artArtist: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  clickCountText: {
    marginTop: 10,
    fontSize: 14,
    color: '#6A4E23',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6A4E23',
    padding: 16,
    borderRadius: 50,
    elevation: 10,
  },
  floatingButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default ArtGalleryApp;
