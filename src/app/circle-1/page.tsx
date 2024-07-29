import CircleBoard from '@/components/VirtualCircle/CircleBoard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-center p-24 space-x-4">
      <CircleBoard className="bg-blue-50/10 w-96 h-96" />
    </main>
  );
}
