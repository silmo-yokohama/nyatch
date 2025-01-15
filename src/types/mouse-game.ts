/**
 * マウスゲームで使用する型定義
 */

/**
 * マウスの状態を表す型
 */
export type MouseState = 'waiting' | 'playing' | 'hiding';

/**
 * マウスのサイズを表す型（5段階）
 */
export type MouseSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * 足跡の情報を表す型
 */
export interface Footprint {
  id: string;
  x: number;
  y: number;
  timestamp: number;
}

/**
 * マウスの位置情報を表す型
 */
export interface MousePosition {
  x: number;
  y: number;
  direction: number; // ラジアン
}

/**
 * 草むらの位置を表す型
 */
export type BushPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
