'use client';

import { useGlobalContext } from '@/app/context/globalContext';
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow } from '@/app/utils/icons';
import { kelvinToCelcius } from '@/app/utils/misc';
import moment from 'moment';
import 'moment/locale/es';
import { useEffect, useState } from 'react';

export default function Temperature() {
  const { forecast } = useGlobalContext();
  const { main, timezone, name, weather } = forecast;

  if (!forecast || !weather) {
    return <div>Cargando...</div>;
  }

  const temp = kelvinToCelcius(main?.temp);
  const minTemp = kelvinToCelcius(main?.temp_min);
  const maxTemp = kelvinToCelcius(main?.temp_max);

  const [currentDay, setCurrentDay] = useState<string>('');
  const [localTime, setLocalTime] = useState<string>('');

  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case 'Drizzle':
        return drizzleIcon;
      case 'Rain':
        return rain;
      case 'Snow':
        return snow;
      case 'Clear':
        return clearSky;
      case 'Clouds':
        return cloudy;
      default:
        return clearSky;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moment.locale('es');
      const localMoment = moment().utcOffset(timezone / 60);
      const formartedTime = localMoment.format('HH:mm:ss');
      const day = localMoment.format('dddd');

      setLocalTime(formartedTime);
      setCurrentDay(day.charAt(0).toUpperCase() + day.slice(1));
    }, 1000);
  }, []);

  return (
    <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}°</p>
      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Min: {minTemp}°</span>
          <span>Max: {maxTemp}°</span>
        </p>
      </div>
    </div>
  );
}
