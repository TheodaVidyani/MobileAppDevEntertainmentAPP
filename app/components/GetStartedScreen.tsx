import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type GetStartedScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GetStarted'>;
};

const GetStartedScreen: React.FC<GetStartedScreenProps> = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../assets/ArtPhoto.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Discover Art at Your Fingertips!</Text>
        </Animated.View>
      </View>

      <View style={styles.featuresContainer}>
        <FeatureItem
          icon="🖼️"
          title="Exclusive Art Collections"
          description="Explore unique artwork from renowned and emerging artists"
        />
        <FeatureItem
          icon="🎨"
          title="Art Events & Exhibitions"
          description="Stay updated with upcoming art events, exhibitions, and gallery openings"
        />
        <FeatureItem
          icon="👩‍🎨"
          title="Meet the Artists"
          description="Learn about the artists behind the masterpieces"
        />
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

type FeatureItemProps = {
  icon: string;
  title: string;
  description: string;
};

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <View style={styles.featureTextContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E6', // Cream color for background
  },
  topSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: width * 0.8,
    height: width * 0.5,
    marginBottom: 24,
    marginTop: 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6A4E23', // Brownish color for the title
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#88A398',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 24,
  },
  featuresContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6A4E23', // Brownish color for feature titles
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6A4E23', // Brownish color for feature description
    lineHeight: 20,
  },
  bottomSection: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  button: {
    backgroundColor: '#6A4E23', // Brown color for the button
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GetStartedScreen;
