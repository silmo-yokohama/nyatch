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
        // 速度を指数関数的に増加させる（1: 3, 2: 5, 3: 8, 4: 12, 5: 17）
        const baseSpeed = Math.floor(Math.pow(config.speed, 1.5)) + 2;

        // ランダムな方向変化を追加（より大きな変化を可能に）
        const angleChange = (Math.random() - 0.5) * 0.5;

        // 突然の方向転換の確率（5%）
        const shouldChangeDirection = Math.random() < 0.05;
        const newAngle = shouldChangeDirection
          ? Math.random() * Math.PI * 2
          : laser.angle + angleChange;

        // ランダムな速度変動（0.8-1.2倍）
        const speedVariation = 0.8 + Math.random() * 0.4;
        const currentSpeed = baseSpeed * speedVariation;

        // 新しい位置を計算
        const newX = laser.x + Math.cos(newAngle) * currentSpeed;
        const newY = laser.y + Math.sin(newAngle) * currentSpeed;

        // 画面外に出た場合は反対側から出現
        const x = ((newX % fieldWidth) + fieldWidth) % fieldWidth;
        const y = ((newY % fieldHeight) + fieldHeight) % fieldHeight;

        // 画面端に近づいた時の挙動を追加（20%の確率で方向転換）
        const margin = 50;
        const isNearEdge =
          x < margin || x > fieldWidth - margin || y < margin || y > fieldHeight - margin;

        if (isNearEdge && Math.random() < 0.2) {
          // 画面中央に向かう角度を計算
          const centerAngle = Math.atan2(fieldHeight / 2 - y, fieldWidth / 2 - x);
          // 中央方向 ± 45度のランダムな角度
          return {
            ...laser,
            x,
            y,
            angle: centerAngle + ((Math.random() - 0.5) * Math.PI) / 2,
          };
        }

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
