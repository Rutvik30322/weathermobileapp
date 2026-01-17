# weathermobileapp

A React Native mobile application for checking current weather and 5-day forecasts, built with Redux Toolkit for state management and Axios for API calls.

## Features

- **City Search**: Search for weather by city name.
- **Current Weather**: View detailed current weather information (Temperature, Humidity, Wind, etc.).
- **5-Day Forecast**: View weather projections for the next 5 days.
- **Redux State Management**: Centralized data handling using Redux Toolkit.
- **Clean Architecture**: Separate services, redux slices, and reusable components.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) (Android Studio/Xcode)
- A valid API Key from [OpenWeatherMap](https://openweathermap.org/api)

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd weathermobileapp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure API Key
Open `src/services/config.ts` and replace `YOUR_API_KEY_HERE` with your actual OpenWeatherMap API key:

```typescript
export const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  API_KEY: 'your_actual_key_here',
  UNITS: 'metric',
};
```

### 4. Run the Application

#### For Android:
```bash
# Start Metro Bundler
npm start

# In a new terminal, run the android app
npm run android
```

#### For iOS:
```bash
# Install CocoaPods (macOS only)
cd ios && pod install && cd ..

# Start Metro Bundler
npm start

# In a new terminal, run the ios app
npm run ios
```

## Folder Structure
- `src/redux`: Redux store and slices for state management.
- `src/services`: API configuration and service calls.
- `src/screens`: Main application screens (Search, Current Weather, Forecast).
- `src/components`: Reusable UI components.
- `src/@types`: TypeScript type definitions.

## Troubleshooting
- **401 Unauthorized**: Ensure your API key is active and correctly pasted in `config.ts`.
- **Build Errors**: Ensure you have the correct Android/iOS environment setup. Run `npx react-native doctor` to check for common issues.
