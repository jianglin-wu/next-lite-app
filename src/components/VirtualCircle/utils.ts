const getSvgElementOffset = (element: SVGSVGElement) => {
  const bound = element.getBoundingClientRect();
  const html = document.documentElement;

  return {
    top: bound.top + window.pageYOffset - html.clientTop,
    left: bound.left + window.pageXOffset - html.clientLeft,
  };
};

export const getElementOffset = (
  element: HTMLElement | SVGSVGElement,
): { left: number; top: number } => {
  if (!element) {
    return { left: 0, top: 0 };
  }
  if (element instanceof SVGSVGElement) {
    const { left, top } = getSvgElementOffset(element);
    return { left, top };
  } else {
    return { left: element.offsetLeft, top: element.offsetTop };
  }
};

export const getDocumentPosition = () => {
  const offsetTop =
    document.documentElement.scrollTop || document.body.scrollTop || 0;
  const offsetLeft =
    document.documentElement.scrollLeft || document.body.scrollLeft || 0;
  return {
    offsetTop,
    offsetLeft,
    clientWidth: document.documentElement.clientWidth,
    clientHeight: document.documentElement.clientHeight,
  };
};
