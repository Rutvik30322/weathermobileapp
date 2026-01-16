import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

interface ForecastItemProps {
  dayOfWeek: string;
  date: string;
  minTemp: number;
  maxTemp: number;
  description: string;
  iconCode: string;
}

export const ForecastItem: React.FC<ForecastItemProps> = ({
  dayOfWeek,
  date,
  minTemp,
  maxTemp,
  description,
  iconCode,
}) => {
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      
      <View style={styles.tempContainer}>
        <Text style={styles.maxTemp}>{maxTemp}°</Text>
        <Text style={styles.minTemp}>{minTemp}°</Text>
      </View>
      
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  dateContainer: {
    flex: 1,
  },
  dayOfWeek: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 16,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  maxTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginRight: 8,
  },
  minTemp: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
});