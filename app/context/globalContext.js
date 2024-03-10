'use client';

import axios from 'axios';
import { useContext, createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});

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

  useEffect(() => {
    fetchForecast();
    fetchAirQuality();
  }, []);

  return (
    <GlobalContext.Provider value={{ forecast, airQuality }}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
