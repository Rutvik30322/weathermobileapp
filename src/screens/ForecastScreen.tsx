import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchForecast } from '../redux/weatherSlice';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../@types/navigation';
import { ForecastItem } from '../components/ForecastItem';

type ForecastScreenNavigationProp = StackNavigationProp<
  RootStackParamList, 
  'Forecast'
>;

const ForecastScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { forecast, currentWeather } = useSelector((state: RootState) => state.weather);
  const navigation = useNavigation<ForecastScreenNavigationProp>();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (currentWeather?.name) {
      dispatch(fetchForecast(currentWeather.name));
    }
  }, [currentWeather?.name, dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    if (currentWeather?.name) {
      await dispatch(fetchForecast(currentWeather.name));
    }
    setRefreshing(false);
  };

  if (!forecast) {
    return (
      <View style={styles.containerCentered}>
        <Text>Loading forecast data...</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Group forecast items by day
  const groupedForecast = forecast.list.reduce((acc: any, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Convert to array and take only 5 days
  const forecastDays = Object.entries(groupedForecast).slice(0, 5);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>5-Day Forecast</Text>
        <View style={{ width: 20 }} /> {/* Spacer for alignment */}
      </View>

      {/* Location */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>
          {forecast.city.name}, {forecast.city.country}
        </Text>
      </View>

      {/* Forecast List */}
      <View style={styles.forecastContainer}>
        {forecastDays.map(([date, dayForecasts]: [string, any], index) => {
          // Take the midday forecast or the first forecast of the day
          const dayForecast = dayForecasts.find((f: any) => 
            new Date(f.dt * 1000).getHours() >= 12 && new Date(f.dt * 1000).getHours() <= 14
          ) || dayForecasts[0];
          
          const dateObj = new Date(date);
          const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
          const dayOfMonth = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

          return (
            <ForecastItem
              key={index}
              dayOfWeek={dayOfWeek}
              date={dayOfMonth}
              minTemp={Math.round(dayForecast.main.temp_min)}
              maxTemp={Math.round(dayForecast.main.temp_max)}
              description={dayForecast.weather[0].description}
              iconCode={dayForecast.weather[0].icon}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
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
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  locationContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  forecastContainer: {
    padding: 16,
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

export default ForecastScreen;