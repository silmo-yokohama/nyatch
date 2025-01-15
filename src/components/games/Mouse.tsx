/**
 * ネズミのコンポーネント
 * 
 * @description
 * - マウスカーソルに追従するネズミを表示（CSS transition）
 * - サイズ変更に対応
 * - 移動方向に応じて向きを変更（Framer Motion）
 */
import React from 'react';
import { motion } from 'framer-motion';
import type { MousePosition, MouseSize } from '@/types/mouse-game';
import styles from './Mouse.module.css';

interface MouseProps {
  position: MousePosition;
  size: MouseSize;
}

const sizeMap = {
  xs: 60,
  sm: 80,
  md: 100,
  lg: 120,
  xl: 160,
};

export const Mouse: React.FC<MouseProps> = ({ position, size }) => {
  const baseSize = sizeMap[size];
  // 進行方向が左向き（-90度から90度）の場合は反転しない
  const shouldFlip = Math.abs(position.direction) > Math.PI / 2;

  return (
    <motion.div
      className={styles.mouse}
      animate={{
        rotate: (position.direction * 180) / Math.PI,
      }}
      style={{
        width: baseSize,
        height: baseSize,
        top: position.y - baseSize / 2,
        left: position.x - baseSize / 2,
      }}
    >
      <div
        className="w-full h-full bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: 'url(/games/mouse/mouse.png)',
          transform: shouldFlip ? 'scaleX(-1)' : undefined,
        }}
      />
    </motion.div>
  );
}; 