'use client';

import axios from 'axios';
import { useContext, createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

  const fetchForecast = async () => {
    try {
      const response = await axios.get('api/weather');
      setForecast(response.data);
    } catch (error) {
      console.log('Error fetching forecast data:', error.message);
    }
  };

  const fetchAirQuality = async () => {
    try {
      const response = await axios.get('api/pollution');
      setAirQuality(response.data);
    } catch (error) {
      console.log('Error fetching forecast data:', error.message);
    }
  };

  const fetchFiveDayForecast = async () => {
    try {
      const response = await axios.get('api/fiveday');
      setFiveDayForecast(response.data);
    } catch (error) {
      console.log('Error fetching forecast data:', error.message);
    }
  };

  const fetchUvIndex = async () => {
    try {
      const response = await axios.get('/api/uv');
      setUvIndex(response.data);
    } catch (error) {
      console.log('Error fetching forecast data:', error.message);
    }
  };

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
    fetchFiveDayForecast();
    fetchUvIndex();
  }, []);

  return (
    <GlobalContext.Provider value={{ forecast, airQuality, fiveDayForecast, uvIndex }}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
