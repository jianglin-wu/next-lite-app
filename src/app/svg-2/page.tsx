import SvgBoard from '@/components/VirtualCircle/SvgBoard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-center p-24 space-x-4">
      <div className="flex flex-row items-center justify-start space-x-4">
        <SvgBoard className="w-24 h-48" />
        <SvgBoard className="w-24 h-48" />
        <SvgBoard className="w-24 h-48" />
      </div>
      <div className="flex flex-row items-center justify-center space-x-4">
        <SvgBoard className="w-24 h-48" />
        <SvgBoard className="w-24 h-48" />
        <SvgBoard className="w-24 h-48" />
      </div>
      <div className="flex flex-row items-center justify-end space-x-4">
        <SvgBoard className="w-24 h-48" />
        <SvgBoard className="w-24 h-48" />
        <SvgBoard className="w-24 h-48" />
      </div>
    </main>
  );
}
