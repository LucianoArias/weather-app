'use client';

import { useGlobalContext } from '@/app/context/globalContext';
import { sunset } from '@/app/utils/icons';
import { unixToTime } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';

export default function Sunset() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const times = forecast?.sys?.sunset;
  const timezone = forecast?.timezone;

  const sunsetTime = unixToTime(times, timezone);
  const sunrise = unixToTime(forecast?.sys?.sunrise, timezone);

  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{sunset}Puesta de sol</h2>
        <p className="pt-4 text-2xl">{sunsetTime}</p>
      </div>
      <p>Amanecer: {sunrise}</p>
    </div>
  );
}
