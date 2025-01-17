/**
 * レーザーポインターゲームで使用する型定義
 *
 * @packageDocumentation
 */

/**
 * ゲームの状態を表す型
 *
 * @type GameState
 */
export type GameState = 'opening' | 'playing' | 'finished';

/**
 * レーザーポインターの設定情報を表す型
 *
 * @interface LaserConfig
 * @property {number} count - レーザーポインターの数（1-5個）
 * @property {number} speed - 移動速度（1-5の5段階。指数関数的に増加）
 * @property {number} size - レーザーの太さ（1-5の5段階。実際のサイズは5-15px）
 */
export interface LaserConfig {
  /** レーザーポインターの数（1-5） */
  count: number;
  /** 移動速度（1-5） */
  speed: number;
  /** レーザーの太さ（1-5） */
  size: number;
}

/**
 * レーザーポインターの位置情報を表す型
 *
 * @interface LaserPosition
 * @property {number} x - X座標（画面幅の1.2倍の範囲内）
 * @property {number} y - Y座標（画面高さの1.2倍の範囲）
 * @property {number} angle - 移動方向（ラジアン）
 */
export interface LaserPosition {
  /** X座標 */
  x: number;
  /** Y座標 */
  y: number;
  /** 移動方向（ラジアン） */
  angle: number;
}

/**
 * レーザーポインターの状態を表す型
 * 位置情報に一意のIDを追加した型
 *
 * @interface LaserState
 * @extends {LaserPosition}
 * @property {number} id - レーザーポインターの一意のID
 */
export interface LaserState extends LaserPosition {
  /** レーザーポインターのID */
  id: number;
}
