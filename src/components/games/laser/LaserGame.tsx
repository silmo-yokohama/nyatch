"use client"
/**
 * レーザーポインターゲーム
 * 
 * 複数のレーザーポインターが画面内を縦横無尽に動き回るゲーム
 * - レーザーポインターの数は1-5個で設定可能
 * - 移動速度は5段階で調整可能
 * - レーザーの太さは5段階で調整可能
 */
import { useState } from 'react';
import type { LaserConfig } from '../../../types/laser-game';
import { useLaserPointers } from '../../../hooks/useLaserPointers';
import { LaserPointer } from './LaserPointer';
import styles from '../../../assets/css/Laser.module.css';

export const LaserGame = () => {
  const [config, setConfig] = useState<LaserConfig>({
    count: 3,
    speed: 3,
    size: 3,
  });

  const lasers = useLaserPointers(config);

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
    setConfig(prev => ({ ...prev, count }));
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const speed = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
    setConfig(prev => ({ ...prev, speed }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
    setConfig(prev => ({ ...prev, size }));
  };

  return (
    <div className={styles.container}>
      {lasers.map(laser => (
        <LaserPointer key={laser.id} laser={laser} size={config.size} />
      ))}

      <div className={styles.configPanel}>
        <label className={styles.configLabel}>
          レーザー数 (1-5):
          <input
            type="number"
            min="1"
            max="5"
            value={config.count}
            onChange={handleCountChange}
            className={styles.configInput}
          />
        </label>

        <label className={styles.configLabel}>
          速度 (1-5):
          <input
            type="number"
            min="1"
            max="5"
            value={config.speed}
            onChange={handleSpeedChange}
            className={styles.configInput}
          />
        </label>

        <label className={styles.configLabel}>
          太さ (1-5):
          <input
            type="number"
            min="1"
            max="5"
            value={config.size}
            onChange={handleSizeChange}
            className={styles.configInput}
          />
        </label>
      </div>
    </div>
  );
}; 