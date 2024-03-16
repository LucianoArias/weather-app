'use client';

import { useGlobalContext } from '@/app/context/globalContext';
import { Skeleton } from '@/components/ui/skeleton';
import { wind } from '@/app/utils/icons';
import Image from 'next/image';

export default function Wind() {
  const { forecast } = useGlobalContext();
  const windSpeed = forecast?.wind?.speed;
  const windDir = forecast?.wind?.deg;

  if (!windSpeed || !windDir) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <h1 className="flex items-center gap-2 font-medium">{wind} Viento</h1>
      <div className="compass relative flex items-center justify-center">
        <div className="image relative">
          <Image src="/images/compass_body.svg" alt="compass" width={110} height={110} />
          <Image
            className="absolute top-0 left-[45%] transition-all duration-500 ease-in-out dark:invert"
            src="/images/compass_arrow.svg"
            alt="compass"
            width={11}
            height={11}
            style={{
              transform: `rotate(${windDir}deg) translateX(-50%)`,
              height: '100%',
            }}
          />
        </div>
        <p className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-xs dark:text-white font-medium">
          {Math.round(windSpeed)} m/s
        </p>
      </div>
    </div>
  );
}
