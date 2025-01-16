import { useEffect } from 'react';
import { SpringRef } from 'react-spring';

export type Mouse = {
  width: number;
  height: number;
  opacity: number;
  top: number;
  left: number;
};

export const useMouseMove = (initMouse: Mouse, setSpringStyles: SpringRef<Mouse>) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      setSpringStyles.start({
        opacity: 1,
        top: e.y - initMouse.height / 2,
        left: e.x - initMouse.width / 2,
      });
    };

    window.addEventListener('mousemove', listener);

    return () => {
      window.removeEventListener('mousemove', listener);
    };
  }, [setSpringStyles, initMouse]);
};
