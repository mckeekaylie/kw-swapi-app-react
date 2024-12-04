// REACT
import { useEffect, useState } from "react";

// FRAMER MOTION
import { motion } from "framer-motion";

// CUSTOM STYLES
import styles from "../styles/detail.module.scss";

const OrbitRotate = (props) => {
  const [orbitalDuration, setOrbitalDuration] = useState<number>();
  const [rotationDuration, setRotationDuration] = useState<number>();

  useEffect(() => {
    if (props.planet?.orbital_period !== undefined) {
      const orbitalDuration =
        Math.round(Number(props.planet.orbital_period) / 365) * 4;
      setOrbitalDuration(orbitalDuration);
    }

    if (props.planet?.rotation_period !== undefined) {
      const rotationDuration = Math.round(
        Number(props.planet.rotation_period) / 2
      );
      setRotationDuration(rotationDuration);
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
              key={orbitalDuration}
              animate={{ rotate: 360 }}
              className={styles.outerOrbit}
              transition={{
                duration: orbitalDuration,
                delay: 0,
                repeat: Infinity,
                repeatDelay: 0,
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
            {rotationDuration ? (
              <motion.div
                className={styles.sphere}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{
                  duration: rotationDuration,
                  delay: 0,
                  repeat: Infinity,
                  repeatDelay: 0,
                  ease: "linear",
                }}
              >
                <motion.div className={styles.innerSphere}></motion.div>
                <motion.div className={styles.innerSphere}></motion.div>
              </motion.div>
            ) : null}
          </div>
        </figure>
      </div>
    </div>
  );
};

export default OrbitRotate;
