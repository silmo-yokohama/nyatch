/**
 * 足跡コンポーネント
 * 
 * @description
 * - ネズミの移動に応じて表示される足跡
 * - 3秒でフェードアウト
 */
import React from 'react';
import type { Footprint } from '@/types/mouse-game';
import styles from './Footprints.module.css';

interface FootprintsProps {
  footprints: Footprint[];
}

export const Footprints: React.FC<FootprintsProps> = ({ footprints }) => {
  return (
    <>
      {footprints.map((footprint) => (
        <div
          key={footprint.id}
          className={styles.footprint}
          style={{
            left: footprint.x - 10,
            top: footprint.y - 10,
            backgroundImage: 'url(/games/mouse/footprint.png)',
          }}
        />
      ))}
    </>
  );
}; 