import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Fireflies } from './Fireflies';
import { Treeline } from './Treeline';
import { TREELINES } from './treelines';
import styles from './ForestScene.module.css';

/**
 * David's night forest as a backdrop: the moon and the three ranks of pines drift at
 * different depths as the page scrolls and as the pointer moves over the scene, as on
 * his own site. The scene ignores clicks, so it follows the pointer from the window
 * and reacts whenever the pointer is over its area, even through the text above it.
 */
export function ForestScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const smoothX = useSpring(pointerX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end start'],
  });

  // Farther layers drift more against the scroll, which reads as depth.
  const moonY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const farY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Nearer layers slide further against the pointer.
  const farX = useTransform(smoothX, [0, 1], [10, -10]);
  const midX = useTransform(smoothX, [0, 1], [22, -22]);
  const nearX = useTransform(smoothX, [0, 1], [36, -36]);
  const lanternX = useTransform(smoothX, (v) => `${v * 100}%`);
  const lanternY = useTransform(smoothY, (v) => `${v * 100}%`);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const scene = sceneRef.current;
      if (!scene) return;
      const rect = scene.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) return;
      pointerX.set(x);
      pointerY.set(y);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [pointerX, pointerY]);

  return (
    <div ref={sceneRef} className={styles.scene}>
      <motion.div className={styles.moon} style={{ y: moonY }}>
        <div className={styles.moonDisc} />
      </motion.div>
      <motion.div className={styles.lantern} style={{ left: lanternX, top: lanternY }} />

      <Treeline layer={TREELINES.far} fill="#0f2a20" x={farX} y={farY} className={styles.far} />
      <div className={styles.mist} />
      <Treeline layer={TREELINES.mid} fill="#0a1c15" x={midX} y={midY} className={styles.mid} />
      <Fireflies className={styles.fireflies} />
      <Treeline layer={TREELINES.near} fill="var(--color-bg)" x={nearX} className={styles.near} />
      <div className={styles.fade} />
    </div>
  );
}
