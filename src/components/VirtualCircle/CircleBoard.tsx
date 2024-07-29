'use client';

import { useEffect, useState, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import useContainerListeners from './useContainerListeners';
import { useContainerContext, usePosition } from './useContainer';

const CircleBoard = ({ className }: { className: string }) => {
  const circleDot = useRef<HTMLDivElement | null>(null);
  const [padding, setPadding] = useState(0);

  useEffect(() => {
    if (circleDot?.current) {
      const circleDotRect = circleDot.current!.getBoundingClientRect();
      const padding = circleDotRect.width / 2;
      setPadding(padding);
    }
  }, []);

  const [
    containerRadius,
    containerCenter,
    initialContainerContext,
    circleContainer,
  ] = useContainerContext<HTMLDivElement>(padding);

  const [position, updatePosition] = usePosition(
    containerRadius,
    containerCenter,
  );

  useContainerListeners(
    initialContainerContext,
    containerRadius,
    containerCenter,
    updatePosition,
  );

  return (
    <div
      ref={circleContainer}
      className={twMerge('rounded-full w-96 h-96', className)}
    >
      <div
        ref={circleDot}
        className="border bg-red-500 rounded-full w-2 h-2 -translate-x-1/2 -translate-y-1/2 absolute"
        style={{ left: position.x, top: position.y }}
      ></div>
    </div>
  );
};

export default CircleBoard;
