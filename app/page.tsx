import AirPollution from '@/components/air-pollution';
import DaiylForecast from '@/components/daily-forecast';
import Navbar from '@/components/navbar';
import Population from '@/components/population';
import Sunset from '@/components/sunset';
import Temperature from '@/components/temperature';
import UvIndex from '@/components/uv-index';
import Wind from '@/components/wind';

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature></Temperature>
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPollution />
            <Sunset />
            <Wind />
            <DaiylForecast />
            <UvIndex />
            <Population />
          </div>
        </div>
      </div>
    </main>
  );
}
