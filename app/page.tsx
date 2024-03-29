'use client';

import AirPollution from '@/components/air-pollution';
import DaiylForecast from '@/components/daily-forecast';
import FeelsLike from '@/components/feels-like';
import Humidity from '@/components/humidity';
import Navbar from '@/components/navbar';
import Population from '@/components/population';
import Pressure from '@/components/pressure';
import Sunset from '@/components/sunset';
import Temperature from '@/components/temperature';
import UvIndex from '@/components/uv-index';
import Visibility from '@/components/visibility';
import Wind from '@/components/wind';
import FiveDayForecast from '@/components/five-day-forecast';
import { useGlobalContextUpdate } from '@/app/context/globalContext';
import { defaultStates } from '@/app/utils/defaultStates';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('../components/mapbox'), { ssr: false });

export default function Home() {
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const getClickedCityCoord = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DaiylForecast />
            <UvIndex />
            <Population />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <DynamicComponentWithNoSSR />
            <div className="states flex flex-col gap-3 flex-1">
              <h1 className="flex items-center gap-2 font-medium">Grandes ciudades</h1>
              <div className="flex flex-col gap-4">
                {defaultStates.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                      onClick={() => {
                        getClickedCityCoord(state.lat, state.lon);
                      }}
                    >
                      <p className="px-6 py-4">{state.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
