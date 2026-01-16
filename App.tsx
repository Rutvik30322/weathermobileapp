/**
 * Weather App for iTechnoSol Recruitment Task
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, useColorScheme, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import CurrentWeatherScreen from './src/screens/CurrentWeatherScreen';
import ForecastScreen from './src/screens/ForecastScreen';
import CitySearchScreen from './src/screens/CitySearchScreen';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaView style={[styles.container, { flex: 1 }]}>  
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="CitySearch">
            <Stack.Screen 
              name="CitySearch" 
              component={CitySearchScreen} 
              options={{ title: 'Weather Search' }}
            />
            <Stack.Screen 
              name="CurrentWeather" 
              component={CurrentWeatherScreen} 
              options={{ title: 'Current Weather' }}
            />
            <Stack.Screen 
              name="Forecast" 
              component={ForecastScreen} 
              options={{ title: '5-Day Forecast' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
