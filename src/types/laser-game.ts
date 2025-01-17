/**
 * レーザーポインターゲームの型定義
 */

/**
 * レーザーポインターの設定
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
 * レーザーポインターの位置情報
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
 * レーザーポインターの状態
 */
export interface LaserState extends LaserPosition {
  /** レーザーポインターのID */
  id: number;
}
