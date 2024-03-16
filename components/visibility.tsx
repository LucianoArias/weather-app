'use client';

import { useGlobalContext } from '@/app/context/globalContext';
import { eye } from '@/app/utils/icons';
import { Skeleton } from '@/components/ui/skeleton';

export default function Visibility() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.visibility) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { visibility } = forecast;

  const getVisibilityDescription = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000);

    if (visibilityInKm > 10) return 'Excelente: Vista clara y amplia';
    if (visibilityInKm > 5) return 'Buena: Fácilmente navegable';
    if (visibilityInKm > 2) return 'Moderada: Algunas limitaciones';
    if (visibilityInKm <= 2) return 'Mala: restringido y poco claro';
    return 'No disponible: Datos de visibilidad no disponibles';
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">{eye} Visibility</h2>
        <p className="pt-4 text-2xl">{Math.round(visibility / 1000)} km</p>
      </div>

      <p className="text-sm">{getVisibilityDescription(visibility)}.</p>
    </div>
  );
}
