'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import useContainerListeners from './useContainerListeners';
import { useContainerContext, usePosition } from './useContainer';
import { getElementOffset } from './utils';

const SvgBoard = ({ className }: { className: string }) => {
  const [
    containerRadius,
    containerCenter,
    initialContainerContext,
    circleContainer,
    containerSize,
  ] = useContainerContext<SVGSVGElement>(0, (element, rect) => {
    const offset = getElementOffset(element);
    return {
      radius: Math.min(rect.width, rect.height) / 2,
      center: {
        x: offset.left + rect.width / 2,
        y: offset.top + rect.height / 4,
      },
    };
  });

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
    <svg
      ref={circleContainer}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className={twMerge('rounded-full w-[384px] h-[768px]', className)}
    >
      <path
        d={`M ${containerSize.width / 2} ${containerSize.height} c 0 ${
          -containerSize.height / 2
        } 0 ${-containerSize.height * 0.8} ${position.relativeX} ${
          position.relativeY - containerSize.height * 0.75
        }`}
        className="stroke-current fill-none"
        strokeWidth="2"
      />
    </svg>
  );
};

export default SvgBoard;
