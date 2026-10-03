import type { CSSProperties } from 'react';
import styles from './NeuralScene.module.css';

export function NeuralScene() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.composition}>
        <div className={styles.block} />
        <div className={styles.frame} />
        <div className={styles.tile} />
        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            className={styles.particle}
            style={
              {
                left: `${8 + ((i * 37) % 84)}%`,
                top: `${5 + ((i * 23) % 90)}%`,
                '--delay': `${i * -0.7}s`,
                '--size': `${2 + (i % 3)}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
