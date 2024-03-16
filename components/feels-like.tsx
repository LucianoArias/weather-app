'use client';

import { useGlobalContext } from '@/app/context/globalContext';
import { thermometer } from '@/app/utils/icons';
import { kelvinToCelsius } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeelsLike() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { feels_like, temp_min, temp_max } = forecast?.main;
  const feelsLikeText = (feelsLike: number, minTemp: number, maxTemp: number) => {
    const avgTemp = (minTemp + maxTemp) / 2;

    if (feelsLike < avgTemp - 5) {
      return 'Sensación de mucho más frío que la temperatura real';
    }
    if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return 'Se aproxima a la temperatura real';
    }
    if (feelsLike > avgTemp + 5) {
      return 'La sensación de calor es muy superior a la temperatura real';
    }

    return 'La sensación térmica es típica de este rango.';
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{thermometer} Sensación térmica</h2>
        <p className="pt-4 text-2xl">{kelvinToCelsius(feels_like)}°</p>
      </div>

      <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  );
}
