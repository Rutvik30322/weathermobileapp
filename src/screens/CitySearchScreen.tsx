import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentWeather } from '../redux/weatherSlice';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../@types/navigation';
import { SearchCard } from '../components/SearchCard';

type CitySearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CitySearch'>;

const CitySearchScreen: React.FC = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, currentWeather } = useSelector((state: RootState) => state.weather);
  const navigation = useNavigation<CitySearchScreenNavigationProp>();

  const handleSearch = async () => {
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    try {
      const resultAction = await dispatch(fetchCurrentWeather(city));
      if (fetchCurrentWeather.fulfilled.match(resultAction)) {
        // Navigate to current weather screen after successful search
        navigation.navigate('CurrentWeather');
      }
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleCityPress = async (cityName: string) => {
    setCity(cityName);
    try {
      const resultAction = await dispatch(fetchCurrentWeather(cityName));
      if (fetchCurrentWeather.fulfilled.match(resultAction)) {
        navigation.navigate('CurrentWeather');
      }
    } catch (err) {
      console.error('City press error:', err);
    }
  };

  // Sample popular cities for quick search
  const popularCities = [
    { name: 'London', country: 'UK' },
    { name: 'New York', country: 'USA' },
    { name: 'Tokyo', country: 'Japan' },
    { name: 'Paris', country: 'France' },
    { name: 'Sydney', country: 'Australia' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name..."
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Search</Text>
          )}
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Popular Cities */}
      <View style={styles.popularContainer}>
        <Text style={styles.popularTitle}>Popular Cities</Text>
        <FlatList
          data={popularCities}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.cityButton} 
              onPress={() => handleCityPress(item.name)}
            >
              <Text style={styles.cityButtonText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
        />
      </View>

      {/* Recent Searches - Placeholder for now */}
      {currentWeather && (
        <View style={styles.recentContainer}>
          <Text style={styles.recentTitle}>Recent Search</Text>
          <SearchCard 
            weather={currentWeather} 
            onPress={() => navigation.navigate('CurrentWeather')} 
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#ffcccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: '#cc0000',
    textAlign: 'center',
  },
  popularContainer: {
    marginBottom: 20,
  },
  popularTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cityButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cityButtonText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  recentContainer: {
    marginTop: 20,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CitySearchScreen;