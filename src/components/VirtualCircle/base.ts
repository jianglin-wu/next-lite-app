import { useMemo, useRef } from 'react';

export interface IPosition {
  x: number;
  y: number;
}
export type IContainerContextInfo = {
  radius: number;
  center: IPosition;
};

// 更新容器信息到引用对象，保证容器信息变化 updatePosition 函数是指保持同一个引用
export const useRefContext = (radius: number, center: IPosition) => {
  const containerContext = useRef<IContainerContextInfo>({
    radius,
    center,
  });
  useMemo(() => {
    containerContext.current = {
      radius,
      center,
    };
  }, [radius, center]);
  return containerContext;
};
