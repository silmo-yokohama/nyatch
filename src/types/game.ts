import type { ElementType } from 'react';

export type GameMode = {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
  color: string;
  to: string;
};
