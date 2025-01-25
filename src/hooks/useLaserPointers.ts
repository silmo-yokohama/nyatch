/**
 * レーザーポインターの動きを制御するカスタムフック
 *
 * 以下の機能を提供する：
 * - 指定された数のレーザーポインターを生成
 * - 指数関数的な速度制御（レベル1-5）
 * - 複数の周期による複雑な動き
 * - カオス的な動きと距離依存のランダム性
 *
 * @param {LaserConfig} config - レーザーポインターの設定
 * @returns {LaserState[]} 各レーザーポインターの現在の状態
 */
import { useCallback, useEffect, useState, useRef } from 'react';
import type { LaserConfig, LaserState } from '../types/laser-game';

/**
 * 動きの制御に使用する定数
 * @constant
 */
const MOVEMENT_PARAMS = {
  // 基本的な動きの制御
  FIELD_SCALE: 1.2, // フィールドサイズの画面比
  MIN_DISTANCE: 10, // 目標地点への最小到達距離
  DISTANCE_VARIATION: 5, // 到達距離の変動幅

  // 速度の制御
  SPEED_BASE: 0.8, // 速度の基準値
  SPEED_SLOW_AMP: 0.1, // ゆっくりとした速度変動の振幅
  SPEED_MED_AMP: 0.05, // 中程度の速度変動の振幅
  SPEED_FAST_AMP: 0.025, // 速い速度変動の振幅

  // 蛇行運動の制御
  WIGGLE_SLOW: { FREQ: 1, AMP: 0.2 }, // ゆっくりとした蛇行
  WIGGLE_MED: { FREQ: 2.5, AMP: 0.15 }, // 中程度の蛇行
  WIGGLE_FAST: { FREQ: 5, AMP: 0.1 }, // 速い蛇行

  // カオス的な動きの制御
  CHAOS_FREQ: 0.1, // カオスの基本周波数
  CHAOS_AMP: 0.1, // カオスの振幅

  // ランダム性の制御
  MAX_RANDOM_STRENGTH: 0.2, // 最大のランダム強度
  DISTANCE_FACTOR: 100, // 距離依存の係数
} as const;

/**
 * ランダムな目標地点を生成する関数
 *
 * @param {number} fieldWidth - フィールドの幅
 * @param {number} fieldHeight - フィールドの高さ
 * @returns {{ x: number; y: number; duration: number }} 生成された目標地点の座標と持続時間
 */
const generateTarget = (fieldWidth: number, fieldHeight: number) => ({
  x: Math.random() * fieldWidth,
  y: Math.random() * fieldHeight,
  duration: 1000 + Math.random() * 2000,
});

/**
 * 速度変動を計算する関数
 * 3つの異なる周期の正弦波を合成して複雑な速度変化を生成する
 *
 * @param {number} timeScale - 現在の時間スケール（秒単位）
 * @param {number} laserId - レーザーの一意のID
 * @returns {number} 計算された速度変動値（基準値からの変動）
 */
const calculateSpeedVariation = (timeScale: number, laserId: number) => {
  const { SPEED_BASE, SPEED_SLOW_AMP, SPEED_MED_AMP, SPEED_FAST_AMP } = MOVEMENT_PARAMS;
  return (
    SPEED_BASE +
    Math.sin(timeScale + laserId) * SPEED_SLOW_AMP + // ゆっくりとした変動
    Math.sin(timeScale * 2 + laserId * 2) * SPEED_MED_AMP + // 中程度の変動
    Math.sin(timeScale * 4 + laserId * 4) * SPEED_FAST_AMP // 速い変動
  );
};

/**
 * 蛇行運動を計算する関数
 * 3つの異なる周期の正弦波を合成して複雑な蛇行を生成する
 *
 * @param {number} timeScale - 現在の時間スケール（秒単位）
 * @param {number} laserId - レーザーの一意のID
 * @returns {number} 計算された蛇行角度（ラジアン）
 */
const calculateWiggle = (timeScale: number, laserId: number) => {
  const { WIGGLE_SLOW, WIGGLE_MED, WIGGLE_FAST } = MOVEMENT_PARAMS;
  return (
    Math.sin(timeScale * WIGGLE_SLOW.FREQ + laserId) * WIGGLE_SLOW.AMP +
    Math.sin(timeScale * WIGGLE_MED.FREQ + laserId * 2) * WIGGLE_MED.AMP +
    Math.sin(timeScale * WIGGLE_FAST.FREQ + laserId * 3) * WIGGLE_FAST.AMP
  );
};

/**
 * レーザーポインターの動きを制御するカスタムフック
 *
 * @param {LaserConfig} config - レーザーの設定
 * @param {number} config.count - 生成するレーザーの数
 * @param {number} config.speed - レーザーの基本速度（1-5）
 * @returns {LaserState[]} 更新されたレーザーの状態の配列
 */
export const useLaserPointers = (config: LaserConfig) => {
  const [lasers, setLasers] = useState<LaserState[]>([]);
  const targetsRef = useRef<{ [key: number]: { x: number; y: number; duration: number } }>({});
  const [fieldSize, setFieldSize] = useState({ width: 0, height: 0 });

  // フィールドサイズを画面サイズに基づいて設定
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateFieldSize = () => {
      setFieldSize({
        width: window.innerWidth * MOVEMENT_PARAMS.FIELD_SCALE,
        height: window.innerHeight * MOVEMENT_PARAMS.FIELD_SCALE,
      });
    };

    // 初期サイズを設定
    updateFieldSize();

    // リサイズイベントのリスナーを追加
    window.addEventListener('resize', updateFieldSize);
    return () => window.removeEventListener('resize', updateFieldSize);
  }, []);

  /**
   * レーザーポインターの初期状態を生成するエフェクト
   *
   * @effect
   * @dependencies [config.count, fieldSize]
   */
  useEffect(() => {
    if (fieldSize.width === 0 || fieldSize.height === 0) return;

    const initialLasers: LaserState[] = Array.from({ length: config.count }, (_, i) => {
      const target = generateTarget(fieldSize.width, fieldSize.height);
      targetsRef.current[i] = target;
      return {
        id: i,
        x: Math.random() * fieldSize.width,
        y: Math.random() * fieldSize.height,
        angle: Math.random() * Math.PI * 2,
      };
    });
    setLasers(initialLasers);
  }, [config.count, fieldSize]);

  /**
   * レーザーポインターの位置を更新するコールバック関数
   * 各フレームで呼び出され、以下の処理を行う：
   * - 目標地点への移動
   * - 速度の動的な調整
   * - 蛇行運動の適用
   * - カオス的な動きの追加
   * - 距離に応じたランダム性の適用
   *
   * @callback
   * @returns {void}
   */
  const updateLasers = useCallback(() => {
    if (fieldSize.width === 0 || fieldSize.height === 0) return;

    const now = Date.now();
    const timeScale = now * 0.001; // ミリ秒を秒に変換

    setLasers((prevLasers) =>
      prevLasers.map((laser) => {
        // 目標地点の取得または生成
        let target = targetsRef.current[laser.id];
        if (!target) {
          target = generateTarget(fieldSize.width, fieldSize.height);
          targetsRef.current[laser.id] = target;
        }

        // 目標地点までの距離を計算
        const dx = target.x - laser.x;
        const dy = target.y - laser.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 目標地点に十分近づいたら新しい目標を設定
        const { MIN_DISTANCE, DISTANCE_VARIATION } = MOVEMENT_PARAMS;
        const minDistance = MIN_DISTANCE + Math.sin(timeScale + laser.id) * DISTANCE_VARIATION;
        if (distance < minDistance) {
          target = generateTarget(fieldSize.width, fieldSize.height);
          targetsRef.current[laser.id] = target;
        }

        // 基本速度の計算（指数関数的な増加）
        const baseSpeed = Math.floor(Math.pow(config.speed, 1.5)) + 2;
        const speedVariation = calculateSpeedVariation(timeScale, laser.id);
        const currentSpeed = baseSpeed * speedVariation;

        // 目標への基本角度
        const baseAngle = Math.atan2(dy, dx);

        // 複合的な角度変化の計算
        const wiggle = calculateWiggle(timeScale, laser.id);
        const chaos =
          Math.sin(Math.tan(timeScale * MOVEMENT_PARAMS.CHAOS_FREQ + laser.id)) *
          MOVEMENT_PARAMS.CHAOS_AMP;

        // 距離に応じたランダム性（近いほど小さく）
        const { MAX_RANDOM_STRENGTH, DISTANCE_FACTOR } = MOVEMENT_PARAMS;
        const randomStrength = Math.min(MAX_RANDOM_STRENGTH, distance / DISTANCE_FACTOR);
        const randomDeviation = (Math.random() - 0.5) * randomStrength;

        // 最終的な移動角度と位置の計算
        const moveAngle = baseAngle + wiggle + chaos + randomDeviation;
        const moveX = Math.cos(moveAngle) * currentSpeed;
        const moveY = Math.sin(moveAngle) * currentSpeed;

        // 新しい位置（画面外に出た場合は反対側から出現）
        const x = (((laser.x + moveX) % fieldSize.width) + fieldSize.width) % fieldSize.width;
        const y = (((laser.y + moveY) % fieldSize.height) + fieldSize.height) % fieldSize.height;

        return { ...laser, x, y, angle: moveAngle };
      })
    );
  }, [config.speed, fieldSize]);

  /**
   * アニメーションフレームでの更新を制御するエフェクト
   *
   * @effect
   * @dependencies [updateLasers]
   */
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
