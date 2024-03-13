'use client';

import { useGlobalContext } from '@/app/context/globalContext';
import { thermo } from '@/app/utils/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { airQualityIndexText } from '@/app/utils/misc';

export default function AirPollution() {
  const { airQuality } = useGlobalContext();

  if (!airQuality || !airQuality.list || !airQuality.list[0] || !airQuality.list[0].main) {
    return <Skeleton className="h-[1rem] w-full col-span-2 md:col-span-full" />;
  }

  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const filteredIndex = airQualityIndexText.find(item => {
    return item.rating === airQualityIndex;
  });

  return (
    <div className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full md:col-span-2 xl:col-span-2">
      <h2 className="flex items-center gap-2 font-medium">{thermo}Contaminación del Aire</h2>
      <Progress value={airQualityIndex} max={100} className="progress" />
      <p>La calidad del aire es {filteredIndex?.description}</p>
    </div>
  );
}
