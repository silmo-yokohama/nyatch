"use client"
/**
 * レーザーポインターゲームのメインコンポーネント
 * 
 * 複数のレーザーポインターが画面内を縦横無尽に動き回るゲーム。
 * ユーザーは以下の設定を調整可能：
 * - レーザーポインターの数（1-5個）
 * - 移動速度（5段階、指数関数的に増加）
 * - レーザーの太さ（5段階、5-15px）
 * 
 * @component
 */
import { useState } from 'react';
import type { LaserConfig } from '../../../types/laser-game';
import { useLaserPointers } from '../../../hooks/useLaserPointers';
import { LaserPointer } from './LaserPointer';
import styles from '../../../assets/css/Laser.module.css';

export const LaserGame = () => {
  // ゲームの設定状態を管理
  const [config, setConfig] = useState<LaserConfig>({
    count: 3,  // デフォルトは3個
    speed: 3,  // デフォルトは中速
    size: 3,   // デフォルトは中サイズ
  });

  // レーザーポインターの状態を取得
  const lasers = useLaserPointers(config);

  /**
   * レーザーポインターの数を変更する
   * 入力値を1-5の範囲に制限する
   */
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
    setConfig(prev => ({ ...prev, count }));
  };

  /**
   * 移動速度を変更する
   * 入力値を1-5の範囲に制限する
   */
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const speed = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
    setConfig(prev => ({ ...prev, speed }));
  };

  /**
   * レーザーの太さを変更する
   * 入力値を1-5の範囲に制限する
   */
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
    setConfig(prev => ({ ...prev, size }));
  };

  return (
    <div className={styles.container}>
      {/* レーザーポインターをレンダリング */}
      {lasers.map(laser => (
        <LaserPointer key={laser.id} laser={laser} size={config.size} />
      ))}

      {/* 設定パネル */}
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