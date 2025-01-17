/**
 * レーザーポインターゲームのオープニング画面
 * 
 * ゲームの説明、設定パネル、開始ボタンを表示する
 * 
 * @component
 */
import type { LaserConfig } from '../../../types/laser-game';
import styles from '../../../assets/css/Laser.module.css';

interface Props {
  config: LaserConfig;
  onConfigChange: (newConfig: LaserConfig) => void;
  onStart: () => void;
}

export const OpeningScreen = ({ config, onConfigChange, onStart }: Props) => {
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
    onConfigChange({ ...config, count });
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const speed = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
    onConfigChange({ ...config, speed });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
    onConfigChange({ ...config, size });
  };

  return (
    <div className={styles.opening}>
      <h1 className={styles.title}>レーザーポインター</h1>

      <div className={styles.content}>
        <div className={styles.description}>
          <p className={styles.lead}>
            画面内を動き回る赤いレーザーポインターを追いかけよう！
          </p>
          <p className={styles.note}>
            ゲームは20分で自動的に終了します
          </p>
        </div>

        <div className={styles.settings}>
          <h2>ゲーム設定</h2>
          <div className={styles.settingsGrid}>
            <div className={styles.settingItem}>
              <label className={styles.settingLabel}>
                レーザーの数
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={config.count}
                  onChange={handleCountChange}
                  className={styles.settingSlider}
                />
                <span className={styles.settingValue}>{config.count}</span>
              </label>
              <p className={styles.settingDescription}>
                同時に表示されるレーザーの数を設定
              </p>
            </div>

            <div className={styles.settingItem}>
              <label className={styles.settingLabel}>
                移動速度
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={config.speed}
                  onChange={handleSpeedChange}
                  className={styles.settingSlider}
                />
                <span className={styles.settingValue}>{config.speed}</span>
              </label>
              <p className={styles.settingDescription}>
                数値が大きいほど速く動きます
              </p>
            </div>

            <div className={styles.settingItem}>
              <label className={styles.settingLabel}>
                レーザーの太さ
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={config.size}
                  onChange={handleSizeChange}
                  className={styles.settingSlider}
                />
                <span className={styles.settingValue}>{config.size}</span>
              </label>
              <p className={styles.settingDescription}>
                レーザーポインターのサイズを調整
              </p>
            </div>
          </div>
        </div>
      </div>

      <button onClick={onStart} className={styles.startButton}>
        ゲームを開始する
      </button>
    </div>
  );
}; 