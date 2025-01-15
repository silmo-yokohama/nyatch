/**
 * 土埃エフェクトコンポーネント
 * 
 * @description
 * - ネズミが逃走する際に表示される土埃エフェクト
 * - 0.5秒でフェードアウト
 */
import React from 'react';
import { motion } from 'framer-motion';
import type { AnimationControls } from 'framer-motion';
import type { MousePosition } from '@/types/mouse-game';

interface DustEffectProps {
  controls: AnimationControls;
  position: MousePosition;
}

export const DustEffect: React.FC<DustEffectProps> = ({ controls, position }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        left: position.x - 30,
        top: position.y - 30,
        width: 60,
        height: 60,
        backgroundImage: 'url(/games/mouse/dust.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        pointerEvents: 'none',
      }}
    />
  );
}; 