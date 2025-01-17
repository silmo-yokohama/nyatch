/**
 * レーザーポインターの動きを制御するカスタムフック
 */
import { useCallback, useEffect, useState } from 'react';
import type { LaserConfig, LaserState } from '../types/laser-game';

export const useLaserPointers = (config: LaserConfig) => {
  const [lasers, setLasers] = useState<LaserState[]>([]);

  // フィールドサイズを画面の1.2倍に設定
  const fieldWidth = window.innerWidth * 1.2;
  const fieldHeight = window.innerHeight * 1.2;

  // 初期化
  useEffect(() => {
    const initialLasers: LaserState[] = Array.from({ length: config.count }, (_, i) => ({
      id: i,
      x: Math.random() * fieldWidth,
      y: Math.random() * fieldHeight,
      angle: Math.random() * Math.PI * 2,
    }));
    setLasers(initialLasers);
  }, [config.count, fieldWidth, fieldHeight]);

  // レーザーの移動を制御
  const updateLasers = useCallback(() => {
    setLasers((prevLasers) =>
      prevLasers.map((laser) => {
        // 基本速度を設定（5段階）
        const baseSpeed = config.speed * 2 + 1;

        // ランダムな方向変化を追加
        const angleChange = (Math.random() - 0.5) * 0.2;
        const newAngle = laser.angle + angleChange;

        // 新しい位置を計算
        const newX = laser.x + Math.cos(newAngle) * baseSpeed;
        const newY = laser.y + Math.sin(newAngle) * baseSpeed;

        // 画面外に出た場合は反対側から出現
        const x = ((newX % fieldWidth) + fieldWidth) % fieldWidth;
        const y = ((newY % fieldHeight) + fieldHeight) % fieldHeight;

        return {
          ...laser,
          x,
          y,
          angle: newAngle,
        };
      })
    );
  }, [config.speed, fieldWidth, fieldHeight]);

  // アニメーションフレームで更新
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      updateLasers();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [updateLasers]);

  return lasers;
};
