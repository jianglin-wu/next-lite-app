import SvgBoard from '@/components/VirtualCircle/SvgBoard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-end">
      <SvgBoard className="w-[300px] h-[600px] sm:w-[350px] sm:h-[700px]" />
    </main>
  );
}
