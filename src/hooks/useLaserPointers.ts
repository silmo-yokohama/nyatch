/**
 * レーザーポインターの動きを制御するカスタムフック
 *
 * 以下の機能を提供する：
 * - 指定された数のレーザーポインターを生成
 * - 指数関数的な速度制御（レベル1-5）
 * - ランダムな動きと方向転換
 * - 画面端での特殊な挙動
 *
 * @param {LaserConfig} config - レーザーポインターの設定
 * @returns {LaserState[]} 各レーザーポインターの現在の状態
 */
import { useCallback, useEffect, useState } from 'react';
import type { LaserConfig, LaserState } from '../types/laser-game';

export const useLaserPointers = (config: LaserConfig) => {
  const [lasers, setLasers] = useState<LaserState[]>([]);

  // フィールドサイズを画面の1.2倍に設定（画面外への移動を可能に）
  const fieldWidth = window.innerWidth * 1.2;
  const fieldHeight = window.innerHeight * 1.2;

  /**
   * レーザーポインターの初期状態を生成
   * 設定された数だけランダムな位置と角度で生成する
   */
  useEffect(() => {
    const initialLasers: LaserState[] = Array.from({ length: config.count }, (_, i) => ({
      id: i,
      x: Math.random() * fieldWidth,
      y: Math.random() * fieldHeight,
      angle: Math.random() * Math.PI * 2,
    }));
    setLasers(initialLasers);
  }, [config.count, fieldWidth, fieldHeight]);

  /**
   * レーザーポインターの位置を更新
   * 毎フレーム呼び出され、各レーザーの新しい位置と角度を計算する
   */
  const updateLasers = useCallback(() => {
    setLasers((prevLasers) =>
      prevLasers.map((laser) => {
        // 速度を指数関数的に増加（1: 3, 2: 5, 3: 8, 4: 12, 5: 17）
        const baseSpeed = Math.floor(Math.pow(config.speed, 1.5)) + 2;

        // ランダムな方向変化（最大±0.5ラジアン）
        const angleChange = (Math.random() - 0.5) * 0.5;

        // 5%の確率で完全にランダムな方向に転換
        const shouldChangeDirection = Math.random() < 0.05;
        const newAngle = shouldChangeDirection
          ? Math.random() * Math.PI * 2
          : laser.angle + angleChange;

        // 速度に0.8-1.2倍のランダムな変動を追加
        const speedVariation = 0.8 + Math.random() * 0.4;
        const currentSpeed = baseSpeed * speedVariation;

        // 新しい位置を計算
        const newX = laser.x + Math.cos(newAngle) * currentSpeed;
        const newY = laser.y + Math.sin(newAngle) * currentSpeed;

        // 画面外に出た場合は反対側から出現（トーラス状の移動）
        const x = ((newX % fieldWidth) + fieldWidth) % fieldWidth;
        const y = ((newY % fieldHeight) + fieldHeight) % fieldHeight;

        // 画面端（50px以内）での特殊な挙動
        const margin = 50;
        const isNearEdge =
          x < margin || x > fieldWidth - margin || y < margin || y > fieldHeight - margin;

        // 画面端では20%の確率で画面中央方向に向かう
        if (isNearEdge && Math.random() < 0.2) {
          const centerAngle = Math.atan2(fieldHeight / 2 - y, fieldWidth / 2 - x);
          // 中央方向±45度の範囲でランダムな角度を設定
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

  // アニメーションフレームで更新を実行
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      updateLasers();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // クリーンアップ時にアニメーションを停止
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [updateLasers]);

  return lasers;
};
