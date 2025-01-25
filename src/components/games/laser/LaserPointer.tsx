/**
 * レーザーポインターを表示するコンポーネント
 * 
 * 赤色の円形で表示され、グロー効果を持つ。
 * サイズは設定値に応じて5-15pxの範囲で変化する。
 * React Springを使用してスムーズな動きを実現。
 * 
 * @component
 */
import { useSpring, animated } from '@react-spring/web';
import type { LaserState } from '../../../types/laser-game';
import styles from '../../../assets/css/Laser.module.css';

interface Props {
  laser: LaserState;
  size: number;
}

export const LaserPointer = ({ laser, size }: Props) => {
  // サイズを1-5から5-15pxの範囲にマッピング
  const pixelSize = size * 6 + 3;

  // アニメーションの設定
  const springConfig = {
    tension: 120 + Math.random() * 80, // 120-200の範囲でランダム
    friction: 12 + Math.random() * 8,  // 12-20の範囲でランダム
    mass: 1 + Math.random(),           // 1-2の範囲でランダム
  };

  // 位置のアニメーション
  const { x, y, scale, glow } = useSpring({
    from: { x: laser.x, y: laser.y, scale: 1, glow: 1 },
    to: { x: laser.x, y: laser.y, scale: 0.8 + Math.random() * 0.4, glow: 0.8 + Math.random() * 0.4 },
    config: springConfig,
    immediate: false,
  });

  const AnimateDiv = animated('div');

  return (
    <AnimateDiv
      className={styles.laser}
      style={{
        left: x,
        top: y,
        width: pixelSize,
        height: pixelSize,
        transform: scale.to(s => `translate(-50%, -50%) scale(${s})`),
        boxShadow: glow.to(g => `0 0 ${10 * g}px rgba(255, 0, 0, ${g})`),
      }}
    />
  );
}; 