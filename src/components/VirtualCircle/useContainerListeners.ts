import { MutableRefObject, useEffect, useRef } from 'react';
import createThrottle from '@/utils/create-throttle';
import { getDocumentPosition } from '@/components/VirtualCircle/utils';
import { useRefContext, IPosition, IContainerContextInfo } from './base';

type ILastInfo = {
  center: IPosition;
  point: IPosition;
};

// 鼠标指针和触摸移动更新点位置
const usePointMoveListener = (
  containerContextRef: MutableRefObject<IContainerContextInfo>,
  updatePosition: (x: number, y: number) => void,
  lastInfo: MutableRefObject<ILastInfo | null>,
) => {
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const { center: containerCenter } = containerContextRef.current;
      const touch = (e as TouchEvent).touches[0];
      const point = {
        x: touch.clientX,
        y: touch.clientY,
      };
      const center = {
        x: containerCenter.x,
        y: containerCenter.y,
      };
      lastInfo.current = {
        center,
        point,
      };
      updatePosition(touch.pageX, touch.pageY);
    };
    const handleTouchMoveThrottle = createThrottle(handleTouchMove);
    window.addEventListener('touchmove', handleTouchMoveThrottle);

    const handleMouseMove = (e: MouseEvent) => {
      const { center: containerCenter } = containerContextRef.current;
      const point = {
        x: e.clientX,
        y: e.clientY,
      };
      const center = {
        x: containerCenter.x,
        y: containerCenter.y,
      };
      lastInfo.current = {
        center,
        point,
      };
      updatePosition(e.pageX, e.pageY);
    };
    const handleMouseMoveThrottle = createThrottle(handleMouseMove);
    window.addEventListener('mousemove', handleMouseMoveThrottle);

    return () => {
      window.removeEventListener('touchmove', handleTouchMoveThrottle);
      window.removeEventListener('mousemove', handleMouseMoveThrottle);
    };
  }, [updatePosition, containerContextRef, lastInfo]);
};

// 页面滚动使点位置保持屏幕固定
const usePageScrollListener = (
  containerContextRef: MutableRefObject<IContainerContextInfo>,
  updatePosition: (x: number, y: number) => void,
  lastInfo: MutableRefObject<ILastInfo | null>,
) => {
  useEffect(() => {
    const handleScrollMove = () => {
      const { center: containerCenter } = containerContextRef.current;
      const documentPosition = getDocumentPosition();
      const point = lastInfo.current ? lastInfo.current.point : containerCenter;
      const pageX = point.x + documentPosition.offsetLeft;
      const pageY = point.y + documentPosition.offsetTop;
      updatePosition(pageX, pageY);
    };
    const handleScrollMoveThrottle = createThrottle(handleScrollMove);
    window.addEventListener('scroll', handleScrollMoveThrottle);
    return () => window.removeEventListener('scroll', handleScrollMoveThrottle);
  }, [updatePosition, containerContextRef, lastInfo]);
};

// 页面放大缩小使点位置保持屏幕固定比例
const usePageResizeListener = (initialContainerContext: () => any) => {
  useEffect(() => {
    const handleResize = () => initialContainerContext();
    const handlePageResizeThrottle = createThrottle(handleResize);
    window.addEventListener('resize', handlePageResizeThrottle);
    return () => window.removeEventListener('resize', handlePageResizeThrottle);
  }, [initialContainerContext]);
};

const useContainerListeners = (
  initialContainerContext: () => any,
  containerRadius: number,
  containerCenter: IPosition,
  updatePosition: (x: number, y: number) => void,
) => {
  const containerContextRef = useRefContext(containerRadius, containerCenter);
  const lastInfo = useRef<ILastInfo | null>(null);

  useEffect(() => {
    initialContainerContext();
  }, [initialContainerContext]);

  useEffect(() => {
    if (!lastInfo.current) {
      updatePosition(containerCenter.x, containerCenter.y);
      return;
    }
    const { point: lastPoint, center: lastCenter } = lastInfo.current;
    const documentPosition = getDocumentPosition();
    const diffW = containerCenter.x - lastCenter.x;
    const diffH = containerCenter.y - lastCenter.y;
    const pageX = lastPoint.x + diffW + documentPosition.offsetLeft;
    const pageY = lastPoint.y + diffH + documentPosition.offsetTop;
    updatePosition(pageX, pageY);
  }, [containerRadius, containerCenter, updatePosition]);

  usePointMoveListener(containerContextRef, updatePosition, lastInfo);
  usePageScrollListener(containerContextRef, updatePosition, lastInfo);
  usePageResizeListener(initialContainerContext);
};

export default useContainerListeners;
