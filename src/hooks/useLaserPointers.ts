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
import { useCallback, useEffect, useState, useRef } from 'react';
import type { LaserConfig, LaserState } from '../types/laser-game';

// ランダムな目標地点を生成する関数
const generateTarget = (fieldWidth: number, fieldHeight: number) => ({
  x: Math.random() * fieldWidth,
  y: Math.random() * fieldHeight,
  duration: 1000 + Math.random() * 2000, // 1-3秒
});

export const useLaserPointers = (config: LaserConfig) => {
  const [lasers, setLasers] = useState<LaserState[]>([]);
  const targetsRef = useRef<{ [key: number]: { x: number; y: number; duration: number } }>({});

  // フィールドサイズを画面の1.2倍に設定（画面外への移動を可能に）
  const fieldWidth = window.innerWidth * 1.2;
  const fieldHeight = window.innerHeight * 1.2;

  /**
   * レーザーポインターの初期状態を生成
   * 設定された数だけランダムな位置と角度で生成する
   */
  useEffect(() => {
    const initialLasers: LaserState[] = Array.from({ length: config.count }, (_, i) => {
      const target = generateTarget(fieldWidth, fieldHeight);
      targetsRef.current[i] = target;
      return {
        id: i,
        x: Math.random() * fieldWidth,
        y: Math.random() * fieldHeight,
        angle: Math.random() * Math.PI * 2,
      };
    });
    setLasers(initialLasers);
  }, [config.count, fieldWidth, fieldHeight]);

  /**
   * レーザーポインターの位置を更新
   * 毎フレーム呼び出され、各レーザーの新しい位置と角度を計算する
   */
  const updateLasers = useCallback(() => {
    const now = Date.now();

    setLasers((prevLasers) =>
      prevLasers.map((laser) => {
        let target = targetsRef.current[laser.id];
        if (!target) {
          target = generateTarget(fieldWidth, fieldHeight);
          targetsRef.current[laser.id] = target;
        }

        const dx = target.x - laser.x;
        const dy = target.y - laser.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 目標地点に近づいたら新しい目標を設定（ランダムな距離閾値を使用）
        const minDistance = 10 + Math.sin(now * 0.001 + laser.id) * 5;
        if (distance < minDistance) {
          target = generateTarget(fieldWidth, fieldHeight);
          targetsRef.current[laser.id] = target;
        }

        // 基本速度を設定（1: 3, 2: 5, 3: 8, 4: 12, 5: 17）
        const baseSpeed = Math.floor(Math.pow(config.speed, 1.5)) + 2;

        // 複数の周期で変動する速度
        const timeScale = now * 0.001;
        const speedVariation =
          0.8 + // 基準値
          Math.sin(timeScale + laser.id) * 0.1 + // ゆっくりとした変動
          Math.sin(timeScale * 2 + laser.id * 2) * 0.05 + // 中程度の変動
          Math.sin(timeScale * 4 + laser.id * 4) * 0.025; // 速い変動

        const currentSpeed = baseSpeed * speedVariation;

        // 基本の移動方向を計算
        const baseAngle = Math.atan2(dy, dx);

        // 複数の周期による蛇行運動
        const wiggle1 = Math.sin(timeScale + laser.id) * 0.2; // ゆっくりとした蛇行
        const wiggle2 = Math.sin(timeScale * 2.5 + laser.id * 2) * 0.15; // 中程度の蛇行
        const wiggle3 = Math.sin(timeScale * 5 + laser.id * 3) * 0.1; // 速い蛇行

        // カオス的な動きを追加
        const chaos = Math.sin(Math.tan(timeScale * 0.1 + laser.id)) * 0.1;

        // ランダムなゆらぎ（距離に応じて強さを変える）
        const randomStrength = Math.min(0.2, distance / 100); // 目標に近いほど揺れが小さく
        const randomDeviation = (Math.random() - 0.5) * randomStrength;

        // 最終的な移動角度を計算
        const moveAngle = baseAngle + wiggle1 + wiggle2 + wiggle3 + chaos + randomDeviation;

        // 角度から移動量を計算
        const moveX = Math.cos(moveAngle) * currentSpeed;
        const moveY = Math.sin(moveAngle) * currentSpeed;

        // 新しい位置を計算
        const newX = laser.x + moveX;
        const newY = laser.y + moveY;

        // 画面外に出た場合は反対側から出現
        const x = ((newX % fieldWidth) + fieldWidth) % fieldWidth;
        const y = ((newY % fieldHeight) + fieldHeight) % fieldHeight;

        return {
          ...laser,
          x,
          y,
          angle: moveAngle,
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
