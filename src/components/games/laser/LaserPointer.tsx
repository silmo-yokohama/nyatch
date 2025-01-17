/**
 * 個々のレーザーポインターを表示するコンポーネント
 * 
 * 赤色の円形で表示され、グロー効果を持つ。
 * サイズは設定値に応じて5-15pxの範囲で変化する。
 * 
 * @component
 * @param {Object} props
 * @param {LaserState} props.laser - レーザーポインターの状態（位置、角度、ID）
 * @param {number} props.size - レーザーポインターのサイズ（1-5）
 */
import type { LaserState } from '../../../types/laser-game';
import styles from '../../../assets/css/Laser.module.css';

interface Props {
  laser: LaserState;
  size: number;
}

export const LaserPointer = ({ laser, size }: Props) => {
  // サイズを1-5から5-15pxの範囲にマッピング
  const pixelSize = size * 2 + 3;

  return (
    <div
      className={styles.laser}
      style={{
        left: `${laser.x}px`,
        top: `${laser.y}px`,
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
      }}
    />
  );
}; 