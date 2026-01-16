import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentWeather } from '../redux/weatherSlice';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../@types/navigation';
import { WeatherDetailCard } from '../components/WeatherDetailCard';

type CurrentWeatherScreenNavigationProp = StackNavigationProp<
  RootStackParamList, 
  'CurrentWeather'
>;

const CurrentWeatherScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentWeather } = useSelector((state: RootState) => state.weather);
  const navigation = useNavigation<CurrentWeatherScreenNavigationProp>();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    if (currentWeather?.name) {
      await dispatch(fetchCurrentWeather(currentWeather.name));
    }
    setRefreshing(false);
  };

  if (!currentWeather) {
    return (
      <View style={styles.containerCentered}>
        <Text>No weather data available. Please search for a city first.</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Convert temperature to Celsius if needed
  const temperature = Math.round(currentWeather.main.temp);
  const feelsLike = Math.round(currentWeather.main.feels_like);
  const minTemp = Math.round(currentWeather.main.temp_min);
  const maxTemp = Math.round(currentWeather.main.temp_max);
  
  // Get weather icon URL
  const iconUrl = `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Forecast')}
            disabled={!currentWeather?.name}
          >
            <Text style={styles.forecastButton}>5-Day Forecast →</Text>
          </TouchableOpacity>
        </View>

      {/* Main weather info */}
      <View style={styles.mainWeatherContainer}>
        <Text style={styles.cityName}>{currentWeather.name}, {currentWeather.sys.country}</Text>
        <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
        <Text style={styles.temperature}>{temperature}°C</Text>
        <Text style={styles.description}>{currentWeather.weather[0].description}</Text>
        <Text style={styles.feelsLike}>Feels like {feelsLike}°C</Text>
      </View>

      {/* Weather details */}
      <View style={styles.detailsContainer}>
        <WeatherDetailCard 
          title="Min Temperature" 
          value={`${minTemp}°C`} 
          icon="🌡️" 
        />
        <WeatherDetailCard 
          title="Max Temperature" 
          value={`${maxTemp}°C`} 
          icon="🌡️" 
        />
        <WeatherDetailCard 
          title="Humidity" 
          value={`${currentWeather.main.humidity}%`} 
          icon="💧" 
        />
        <WeatherDetailCard 
          title="Wind Speed" 
          value={`${currentWeather.wind.speed} m/s`} 
          icon="💨" 
        />
        <WeatherDetailCard 
          title="Pressure" 
          value={`${currentWeather.main.pressure} hPa`} 
          icon="📊" 
        />
        <WeatherDetailCard 
          title="Visibility" 
          value={`${(currentWeather.visibility / 1000).toFixed(1)} km`} 
          icon="👁️" 
        />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  container: {
    flex: 1,
  },
  containerCentered: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  forecastButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  mainWeatherContainer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  temperature: {
    fontSize: 64,
    fontWeight: '300',
    color: '#333',
  },
  description: {
    fontSize: 20,
    color: '#666',
    textTransform: 'capitalize',
    marginVertical: 5,
  },
  feelsLike: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CurrentWeatherScreen;