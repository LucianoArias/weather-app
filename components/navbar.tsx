'use client';

import { ThemeDropdown } from '@/app/themeDropdown/themeDropdown';
import { github } from '@/app/utils/icons';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import SearchDialog from '@/components/search-dialog';
import { useGlobalContext } from '@/app/context/globalContext';

export default function Navbar() {
  const router = useRouter();
  const { state } = useGlobalContext();

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />
        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />
          <Button
            onClick={() => {
              router.push('https://github.com/LucianoArias/weather-app');
            }}
            className="source-code flex items-center gap-2"
          >
            {github} Código fuente
          </Button>
        </div>
      </div>
    </div>
  );
}
