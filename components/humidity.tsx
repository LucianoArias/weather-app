'use client';

import { useGlobalContext } from '@/app/context/globalContext';
import { droplets } from '@/app/utils/icons';
import { Skeleton } from '@/components/ui/skeleton';

export default function Humidity() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { humidity } = forecast?.main;

  const getHumidityText = (humidity: number) => {
    if (humidity < 30) return 'Seca: Puede causar irritación en la piel';
    if (humidity >= 30 && humidity < 50) return 'Confortable: Ideal para la salud y el confort';
    if (humidity >= 50 && humidity < 70) return 'Moderada: Pegajoso, puede aumentar los alérgenos';
    if (humidity >= 70) return 'Alta: Incómodo, riesgo de crecimiento de moho';
    return 'No disponible: Datos de humedad no disponibles';
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{droplets} Humedad</h2>
        <p className="pt-4 text-2xl">{humidity}%</p>
      </div>

      <p className="text-sm">{getHumidityText(humidity)}</p>
    </div>
  );
}
