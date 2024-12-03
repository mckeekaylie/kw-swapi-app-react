// REACT
import { useEffect, useState } from "react";

// FRAMER MOTION
import { motion } from "framer-motion";

// CUSTOM STYLES
import styles from "../styles/detail.module.scss";

const OrbitRotate = (props) => {
  const [duration, setDuration] = useState<number>();

  useEffect(() => {
    if (props.planet?.orbital_period !== undefined) {
      const newDuration =
        Math.round(Number(props.planet.orbital_period) / 365) * 2;
      setDuration(newDuration);
    }
  }, [props]);

  return (
    <div className="row">
      {/* Orbital Period */}
      <div className="col">
        <figure>
          <div className={styles.orbitalWrapper}>
            <figcaption className="p-2" data-testid="orbital">
              Orbital Period: {props.planet?.orbital_period}
            </figcaption>
            <motion.div
              key={duration}
              animate={{ rotate: 360 }}
              className={styles.outerOrbit}
              transition={{
                duration: duration,
                delay: 0,
                repeat: Infinity,
              }}
            >
              <div className={styles.orbitCircle}></div>
            </motion.div>
          </div>
        </figure>
      </div>
      {/* Rotation Period */}
      <div className="col">
        <figure>
          <div className={styles.orbitalWrapper}>
            <figcaption className="p-2" data-testid="rotation">
              Rotation Period: {props.planet?.rotation_period}
            </figcaption>
            <div className={styles.sphere}></div>
          </div>
        </figure>
      </div>
    </div>
  );
};

export default OrbitRotate;
