import { useEffect, useState, useRef, useCallback } from 'react';
import { useRefContext, IPosition } from './base';
import { getElementOffset } from './utils';

type ICalculateRadiusAndCenter<T extends HTMLElement | SVGSVGElement> = (
  dom: T,
  rect: DOMRect,
) => { radius: number; center: IPosition };
export const useContainerContext = <T extends HTMLElement | SVGSVGElement>(
  padding: number = 0,
  calculateRadiusAndCenter?: ICalculateRadiusAndCenter<T>,
) => {
  const [containerRadius, setContainerRadius] = useState(0);
  const [containerCenter, setContainerCenter] = useState<IPosition>({
    x: 0,
    y: 0,
  });
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const calculateRef = useRef(calculateRadiusAndCenter);
  calculateRef.current = calculateRadiusAndCenter;

  const circleContainer = useRef<T | null>(null);
  const initialContainerContext = useCallback(() => {
    const circleContainerDom = circleContainer.current;
    if (!circleContainerDom) return;
    const rect = circleContainerDom.getBoundingClientRect();
    if (calculateRef.current) {
      const { radius, center } = calculateRef.current(circleContainerDom, rect);
      setContainerRadius(radius);
      setContainerCenter(center);
    } else {
      setContainerRadius(Math.min(rect.width, rect.height) / 2 - padding);
      const offset = getElementOffset(circleContainerDom);
      setContainerCenter({
        x: offset.left + rect.width / 2,
        y: offset.top + rect.height / 2,
      });
    }
    setContainerSize({ width: rect.width, height: rect.height });
  }, [padding]);

  useEffect(() => {
    const circleContainerDom = circleContainer.current;
    const disableScroll = (e: Event) => e.preventDefault();
    circleContainerDom?.addEventListener('touchmove', disableScroll);
    return () => {
      circleContainerDom?.removeEventListener('touchmove', disableScroll);
    };
  }, []);

  return [
    containerRadius,
    containerCenter,
    initialContainerContext,
    circleContainer,
    containerSize,
  ] as const;
};

export const usePosition = (
  containerRadius: number,
  containerCenter: IPosition,
) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    relativeX: 0,
    relativeY: 0,
  });
  const containerContextRef = useRefContext(containerRadius, containerCenter);
  const updatePosition = useCallback(
    (pageX: number, pageY: number) => {
      const { center, radius } = containerContextRef.current;
      const x = pageX - center.x;
      const y = pageY - center.y;
      // 指针与圆心的距离
      const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      if (distance <= radius) {
        return setPosition({ x: pageX, y: pageY, relativeX: x, relativeY: y });
      }

      // 指针与圆心的角度
      const angle = Math.atan2(y, x);
      // 指针在圆上的位置
      const relativeX = radius * Math.cos(angle);
      const relativeY = radius * Math.sin(angle);
      const circleInnerX = center.x + relativeX;
      const circleInnerY = center.y + relativeY;
      // 指针在圆上的位置
      setPosition({ x: circleInnerX, y: circleInnerY, relativeX, relativeY });
    },
    [containerContextRef],
  );
  return [position, updatePosition] as const;
};
