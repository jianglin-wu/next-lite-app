import CircleBoard from '@/components/VirtualCircle/CircleBoard';

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-24 space-y-12 flex flex-col justify-between">
      <div className="flex flex-row items-center justify-start space-x-4">
        <CircleBoard className="bg-blue-50/10 w-12 h-12 md:w-24 md:h-24" />
        <CircleBoard className="bg-blue-50/10 w-12 h-12 md:w-24 md:h-24" />
        <CircleBoard className="bg-blue-50/10 w-12 h-12 md:w-24 md:h-24" />
      </div>
      <div className="flex flex-row items-center justify-center space-x-4">
        <CircleBoard className="bg-blue-50/10 w-12 h-12 md:w-24 md:h-24" />
        <CircleBoard className="bg-blue-50/10 w-12 h-12 md:w-24 md:h-24" />
        <CircleBoard className="bg-blue-50/10 w-12 h-12 md:w-24 md:h-24" />
      </div>
      <div className="flex flex-row items-center justify-end space-x-4">
        <CircleBoard className="bg-blue-50/10 w-12 h-12 md:w-24 md:h-24" />
        <CircleBoard className="bg-blue-50/10 w-12 h-12 md:w-24 md:h-24" />
        <CircleBoard className="bg-blue-50/10 w-12 h-12 md:w-24 md:h-24" />
      </div>
    </main>
  );
}
