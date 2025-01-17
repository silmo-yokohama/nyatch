/**
 * レーザーポインターを表示するコンポーネント
 */
import type { LaserState } from '../../../types/laser-game';
import styles from '../../../assets/css/Laser.module.css';

interface Props {
  laser: LaserState;
}

export const LaserPointer = ({ laser }: Props) => {
  return (
    <div
      className={styles.laser}
      style={{
        left: `${laser.x}px`,
        top: `${laser.y}px`,
      }}
    />
  );
}; 