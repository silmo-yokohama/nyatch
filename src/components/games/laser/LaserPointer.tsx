/**
 * レーザーポインターを表示するコンポーネント
 */
import type { LaserState } from '../../../types/laser-game';
import styles from '../../../assets/css/Laser.module.css';

interface Props {
  laser: LaserState;
  size: number;
}

export const LaserPointer = ({ laser, size }: Props) => {
  // サイズを1-5から5-15pxの範囲にマッピング
  const pixelSize = size * 5 + 3;

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