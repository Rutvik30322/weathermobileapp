import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { CurrentWeatherResponse } from '../services/api';

interface SearchCardProps {
  weather: CurrentWeatherResponse;
  onPress: () => void;
}

export const SearchCard: React.FC<SearchCardProps> = ({ weather, onPress }) => {
  // Convert temperature to Celsius if needed
  const temperature = Math.round(weather.main.temp);
  
  // Get weather icon URL
  const iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.leftContent}>
          <Text style={styles.cityName}>{weather.name}</Text>
          <Text style={styles.country}>{weather.sys.country}</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
        </View>
        
        <View style={styles.rightContent}>
          <Image source={{ uri: iconUrl }} style={styles.icon} />
          <Text style={styles.temperature}>{temperature}°C</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  country: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#888',
    textTransform: 'capitalize',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 4,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});