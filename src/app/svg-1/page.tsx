import SvgBoard from '@/components/VirtualCircle/SvgBoard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-center p-24 space-x-4">
      <SvgBoard className="bg-blue-50/10" />
    </main>
  );
}
