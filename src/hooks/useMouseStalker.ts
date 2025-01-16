import { useSpring } from 'react-spring';
import { useMouseMove } from '@/hooks/useMouseMove';
import type { Mouse } from '@/hooks/useMouseMove';

export type SpringConfig = {
  frequency: number;
  damping: number;
};

export const useMouseStalker = (initMouse: Mouse, mouseConfig: SpringConfig) => {
  const [springStyles, setSpringStyles] = useSpring(() => ({
    to: initMouse,
    config: mouseConfig,
  }));

  useMouseMove(initMouse, setSpringStyles);

  return springStyles;
};
