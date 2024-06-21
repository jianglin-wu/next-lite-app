import SvgBoard from '@/components/VirtualCircle/SvgBoard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-end">
      <div className="flex flex-row items-center justify-start space-x-1 sm:space-x-4">
        <SvgBoard className="w-8 h-16 sm:w-14 sm:h-28 lg:w-24 lg:h-48" />
        <SvgBoard className="w-8 h-16 sm:w-14 sm:h-28 lg:w-24 lg:h-48" />
        <SvgBoard className="w-8 h-16 sm:w-14 sm:h-28 lg:w-24 lg:h-48" />
        <SvgBoard className="w-8 h-16 sm:w-14 sm:h-28 lg:w-24 lg:h-48" />
        <SvgBoard className="w-8 h-16 sm:w-14 sm:h-28 lg:w-24 lg:h-48" />
        <SvgBoard className="w-8 h-16 sm:w-14 sm:h-28 lg:w-24 lg:h-48" />
        <SvgBoard className="w-8 h-16 sm:w-14 sm:h-28 lg:w-24 lg:h-48" />
        <SvgBoard className="w-8 h-16 sm:w-14 sm:h-28 lg:w-24 lg:h-48" />
        <SvgBoard className="w-8 h-16 sm:w-14 sm:h-28 lg:w-24 lg:h-48" />
      </div>
    </main>
  );
}
