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
import { useState, useEffect } from 'react';
import type { LaserConfig, GameState } from '../../../types/laser-game';
import { useLaserPointers } from '../../../hooks/useLaserPointers';
import { LaserPointer } from './LaserPointer';
import { OpeningScreen } from './OpeningScreen';
import styles from '../../../assets/css/Laser.module.css';

// ゲームの制限時間（20分）
const GAME_DURATION_MS = 20 * 60 * 1000;

export const LaserGame = () => {
  // ゲームの状態を管理
  const [gameState, setGameState] = useState<GameState>('opening');
  // 残り時間を管理（ミリ秒）
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_MS);

  // ゲームの設定状態を管理
  const [config, setConfig] = useState<LaserConfig>({
    count: 1,  // デフォルトは1個
    speed: 3,  // デフォルトは中速
    size: 3,   // デフォルトは中サイズ
  });

  // レーザーポインターの状態を取得
  const lasers = useLaserPointers(config);

  /**
   * ゲームを開始する
   * 状態を'playing'に変更し、タイマーをリセット
   */
  const handleGameStart = () => {
    setGameState('playing');
    setTimeLeft(GAME_DURATION_MS);
  };

  /**
   * ゲームを終了する
   * 状態を'opening'に戻す
   */
  const handleGameEnd = () => {
    setGameState('opening');
  };

  // タイマーの更新を管理
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1000) { // 1秒以下になったら終了
          clearInterval(timer);
          handleGameEnd();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // 残り時間を分:秒形式に変換
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (gameState === 'opening') {
    return (
      <OpeningScreen
        config={config}
        onConfigChange={setConfig}
        onStart={handleGameStart}
      />
    );
  }

  return (
    <div className={styles.container}>
      {/* レーザーポインターをレンダリング */}
      {lasers.map(laser => (
        <LaserPointer key={laser.id} laser={laser} size={config.size} />
      ))}

      {/* 設定パネル */}
      <div className={styles.configPanel}>
        {/* タイマー表示 */}
        <div className={styles.timer}>
          残り時間: {formatTime(timeLeft)}
        </div>

        <label className={styles.configLabel}>
          レーザー数
          <input
            type="range"
            min="1"
            max="5"
            value={config.count}
            onChange={e => setConfig(prev => ({ ...prev, count: Number(e.target.value) }))}
            className={styles.settingSlider}
          />
          <span className={styles.settingValue}>{config.count}</span>
        </label>

        <label className={styles.configLabel}>
          速度
          <input
            type="range"
            min="1"
            max="5"
            value={config.speed}
            onChange={e => setConfig(prev => ({ ...prev, speed: Number(e.target.value) }))}
            className={styles.settingSlider}
          />
          <span className={styles.settingValue}>{config.speed}</span>
        </label>

        <label className={styles.configLabel}>
          太さ
          <input
            type="range"
            min="1"
            max="5"
            value={config.size}
            onChange={e => setConfig(prev => ({ ...prev, size: Number(e.target.value) }))}
            className={styles.settingSlider}
          />
          <span className={styles.settingValue}>{config.size}</span>
        </label>
      </div>
    </div>
  );
}; 