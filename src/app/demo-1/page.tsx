'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const confRef = useRef<{
    radius: number;
    centerPos: { x: number; y: number };
    lastPos?: { x: number; y: number };
  }>({
    radius: 0,
    centerPos: { x: 0, y: 0 },
  });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const initConf = () => {
      const rect = document
        .getElementById('circle-container')!
        .getBoundingClientRect();
      confRef.current.radius = rect.width / 2;
      const centerPos = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      confRef.current.centerPos = centerPos;
    };

    const updatePosition = (clientX: number, clientY: number) => {
      const radius = confRef.current.radius;
      const centerPos = confRef.current.centerPos;
      // 指针与圆心的角度
      const angle = Math.atan2(clientY - centerPos.y, clientX - centerPos.x);
      // 指针与圆心的距离
      const distance = Math.sqrt(
        Math.pow(clientX - centerPos.x, 2) + Math.pow(clientY - centerPos.y, 2),
      );
      if (distance <= radius) {
        return setPosition({ x: clientX, y: clientY });
      }

      // 指针在圆上的位置
      const x = centerPos.x + radius * Math.cos(angle);
      const y = centerPos.y + radius * Math.sin(angle);
      // 指针在圆上的位置
      setPosition({ x, y });
      confRef.current.lastPos = { x, y };
    };

    initConf();
    updatePosition(confRef.current.centerPos.x, confRef.current.centerPos.y);

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 监听窗口变化
    const handleResize = () => {
      initConf();
      if (confRef.current.lastPos) {
        const lastPos = confRef.current.lastPos;
        updatePosition(lastPos.x, lastPos.y);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div
        id="circle-container"
        className="bg-blue-50/10 rounded-full w-96 h-96"
      >
        <div
          className="border bg-red-500 rounded-full w-2 h-2 -translate-x-1/2 -translate-y-1/2 absolute"
          style={{ left: position.x, top: position.y }}
        ></div>
      </div>
    </main>
  );
}
