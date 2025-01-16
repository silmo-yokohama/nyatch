/**
 * ネズミのコンポーネント
 * 
 * @description
 * - マウスカーソルに追従するネズミを表示（CSS transition）
 * - サイズ変更に対応
 * - 移動方向に応じて向きを変更（Framer Motion）
 */
import React, { useCallback, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { animated } from '@react-spring/web';
import type { MouseSize } from '@/types/mouse-game';
import { useMouseStalker } from '@/hooks/useMouseStalker';

const sizeMap = {
  xs: 60,
  sm: 80,
  md: 100,
  lg: 120,
  xl: 160,
};

const springConfig = {
  // 変化の速さ. 大きくすると遅くなる.
  frequency: 0.2,
  // どのタイミングで減速するか. 大きくすると減速の開始が速くなる.
  damping: 2,
};

const mouseStyles: CSSProperties = {
  pointerEvents: 'none',
  position: 'fixed',
  zIndex: 100,
};


export const Mouse: React.FC<{ size: MouseSize }> = ({ size }) => {
  const springStyles = useMouseStalker({
    width: sizeMap[size],
    height: sizeMap[size],
    opacity: 1,
    top: 0,
    left: 0,
  }, springConfig);


  return (
    <animated.div
      style={
        {
          ...mouseStyles,
          ...springStyles,
        }
      }
    >
      <div
        className="w-full h-full bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: 'url(/games/mouse/mouse.png)',
        }}
      />
    </animated.div>
  );
}; 