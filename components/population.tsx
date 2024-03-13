'use client';

import { useGlobalContext } from '@/app/context/globalContext';
import { people } from '@/app/utils/icons';
import { Skeleton } from './ui/skeleton';
import { formatNumber } from '@/app/utils/misc';

export default function Population() {
  const { fiveDayForecast } = useGlobalContext();
  const { city } = fiveDayForecast;

  if (!fiveDayForecast || !city) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{people} Población</h2>
        <p className="pt-4 text-2xl">{formatNumber(city.population)}</p>
      </div>
      <p className="text-sm">Último datos poblacional de {city.name}</p>
    </div>
  );
}
