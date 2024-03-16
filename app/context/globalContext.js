'use client';

import axios from 'axios';
import { useContext, createContext, useState, useEffect } from 'react';
import { defaultStates } from '@/app/utils/defaultStates';
import { debounce } from 'lodash';

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState('');
  const [activeCityCoords, setActiveCityCoords] = useState([-34.6075682, -58.4370894]);
  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, setUvIndex] = useState({});

  const fetchForecast = async (lat, lon) => {
    try {
      const response = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
      setForecast(response.data);
    } catch (error) {
      console.log('Error fetching forecast data:', error.message);
    }
  };

  const fetchAirQuality = async (lat, lon) => {
    try {
      const response = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
      setAirQuality(response.data);
    } catch (error) {
      console.log('Error fetching pollution data:', error.message);
    }
  };

  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const response = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
      setFiveDayForecast(response.data);
    } catch (error) {
      console.log('Error fetching fiveday forecast data:', error.message);
    }
  };

  const fetchUvIndex = async (lat, lon) => {
    try {
      const response = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
      setUvIndex(response.data);
    } catch (error) {
      console.log('Error fetching uv index data:', error.message);
    }
  };

  const fetchGeoCodedList = async (search) => {
    try {
      const response = await axios.get(`/api/geocoded?search=${search}`);
      setGeoCodedList(response.data);
    } catch (error) {
      console.log('Error fetching geocoded list: ', error.message);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === '') {
      setGeoCodedList(defaultStates);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
