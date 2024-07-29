export interface IThrottle<T extends (...args: any) => void> {
  (...args: Parameters<T>): ReturnType<T> & { cancel: () => void };
  cancel: () => void;
}

const createThrottle = <T extends (...args: any) => void>(
  fn: T,
): IThrottle<T> => {
  let lock = false;
  let cancel = false;
  let fnArgs: any[] = [];
  const Throttle: IThrottle<T> = ((...args: any) => {
    fnArgs = args;
    if (lock) {
      return;
    }
    lock = true;
    window.requestAnimationFrame(() => {
      lock = false;
      if (cancel) {
        cancel = false;
        return;
      }
      fn(...fnArgs);
    });
  }) as any as IThrottle<T>;
  Throttle.cancel = () => {
    cancel = true;
  };
  return Throttle;
};

export default createThrottle;
