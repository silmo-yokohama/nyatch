/**
 * 障害物コンポーネント
 * 
 * @description
 * - 画面の四隅に配置される草むら
 * - ネズミの逃げ場所として機能
 */
import React from 'react';
import type { BushPosition } from '@/types/mouse-game';

interface ObjectProps {
  position: BushPosition;
  image: string;
  size: number;
}

const positionStyles: Record<BushPosition, string> = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};

export const Object: React.FC<ObjectProps> = ({ position, image, size }) => {
  return (
    <div
      className={`fixed w-[${size}vw] h-[${size}vw] bg-contain bg-no-repeat bg-center max-w-[500px] max-h-[500px] z-50 ${positionStyles[position]}`}
      style={{
        backgroundImage: `url(${image})`,
      }}
    />
  );
}; 