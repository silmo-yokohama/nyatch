/**
 * ネズミのコンポーネント
 * 
 * @description
 * - マウスカーソルに追従するネズミを表示（CSS transition）
 * - サイズ変更に対応（react-spring）
 * - 移動方向に応じて向きを変更（Framer Motion）
 */
import React from 'react';
import type { CSSProperties } from 'react';
import { animated, useSpring } from '@react-spring/web';
import type { MouseSize } from '@/types/mouse-game';
import { useMouseStalker } from '@/hooks/useMouseStalker';

const sizeMap = {
  xs: 120,
  sm: 180,
  md: 220,
  lg: 260,
  xl: 300,
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
  zIndex: 49,
};


export const Mouse: React.FC<{ size: MouseSize }> = ({ size }) => {
  // マウス追従のアニメーション
  const stalkerStyles = useMouseStalker({
    width: sizeMap[size],
    height: sizeMap[size],
    opacity: 1,
    top: 0,
    left: 0,
  }, springConfig);

  // サイズ変更のアニメーション
  const sizeStyles = useSpring({
    width: sizeMap[size],
    height: sizeMap[size],
    config: {
      tension: 300,
      friction: 20,
    },
  });

  return (
    //  @ts-ignore
    <animated.div
      style={
        {
          ...mouseStyles,
          ...stalkerStyles,
          ...sizeStyles,
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