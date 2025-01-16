/**
 * 草むらコンポーネント
 * 
 * @description
 * - 画面の四隅に配置される草むら
 * - ネズミの逃げ場所として機能
 */
import React from 'react';
import type { BushPosition } from '@/types/mouse-game';

interface BushProps {
  position: BushPosition;
}

const positionStyles: Record<BushPosition, string> = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
};

export const Bush: React.FC<BushProps> = ({ position }) => {
  return (
    <div
      className={`fixed w-[30vw] h-[30vw] bg-contain bg-no-repeat bg-center opacity-70 z-[500] ${positionStyles[position]}`}
      style={{
        backgroundImage: 'url(/games/mouse/bush.png)',
      }}
    />
  );
}; 