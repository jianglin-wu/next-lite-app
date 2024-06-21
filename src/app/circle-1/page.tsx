import CircleBoard from '@/components/VirtualCircle/CircleBoard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-center">
      <CircleBoard className="bg-blue-50/10 w-64 h-64 md:w-94 md:h-94" />
    </main>
  );
}
