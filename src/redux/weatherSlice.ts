import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CurrentWeatherResponse, ForecastResponse, getCurrentWeather, getForecast } from '../services/api';

interface WeatherState {
  currentWeather: CurrentWeatherResponse | null;
  forecast: ForecastResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
};

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const data = await getCurrentWeather(city);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch current weather');
    }
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (city: string, { rejectWithValue }) => {
    try {
      const data = await getForecast(city);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch forecast');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearData: (state) => {
      state.currentWeather = null;
      state.forecast = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action: PayloadAction<CurrentWeatherResponse>) => {
        state.loading = false;
        state.currentWeather = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action: PayloadAction<ForecastResponse>) => {
        state.loading = false;
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearData } = weatherSlice.actions;
export default weatherSlice.reducer;
