"use client";

// COMPONENTS
import ClimateTerrain from "@/app/components/climateTerrain";
import OrbitRotate from "../../components/orbitRotate";

// INTERFACES
import { Planets } from "../../interfaces/planets";

// IMAGES
import hyperdrive from "../../../../public/images/hyperdrive.webp";

// MOTION
import { AnimatePresence, easeIn, motion } from "framer-motion";

// NEXT
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

// REACT
import { useEffect, useState } from "react";

// STYLES
import styles from "../../styles/detail.module.scss";

export default function PlanetDetail() {
  const [planet, setPlanet] = useState<Planets>();
  const [loading, setLoading] = useState<boolean>(true);

  const planetParam = useParams<{ planetId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      console.log(planetParam.planetId);
      const res = await fetch(
        `https://www.swapi.tech/api/planets/${planetParam.planetId}`
      );

      if (!res.ok) {
        setLoading(false);
        const error = new Error("An error occurred while fetching the data.");
        throw error;
      }

      const planet = await res.json();

      setPlanet(planet.result.properties);

      setLoading(false);
    };

    fetchData();
  }, [planetParam.planetId]);

  // if the fetchData logic is complete and the planet is still undefined, render 404 page
  if (!loading && planet === undefined) {
    notFound();
  }

  return (
    <main style={{ backgroundColor: "#000213" }}>
      <AnimatePresence>
        <motion.div
          transition={{ duration: 0.3, delay: 0.25, ease: "easeIn" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Nav */}
          <nav>
            <div className={`${styles.topBar} p-1`}>
              <Link href={`/`}>
                <Image
                  className={styles.backArrow}
                  src="/images/icons/back-arrow.svg"
                  width={36}
                  height={36}
                  alt="Return to home"
                />
              </Link>
            </div>
          </nav>

          {/* Hero */}
          <div className={styles.planetDetailCover}>
            <Image
              className={styles.bkgdImg}
              src={hyperdrive}
              alt="hyperdrive"
              width={1280}
              height={720}
              priority
            />

            {loading && (
              <div style={{ position: "absolute" }}>
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  <Image
                    src="/images/icons/c-3po.svg"
                    width={180}
                    height={180}
                    alt=""
                  />
                </motion.div>
              </div>
            )}

            {!loading && (
              <div style={{ position: "absolute" }}>
                <h1 className="mb-1 fw-700">{planet?.name}</h1>
                <div className={styles.infoBelowPlanetName}>
                  <p className="bigger" data-testid="diameter">
                    <span className="fw-500">Diameter: </span>
                    <span className="fw-400">{planet?.diameter}</span>
                  </p>
                  <p className="bigger" data-testid="gravity">
                    <span className="fw-500">Gravity: </span>
                    <span className="fw-400">{planet?.gravity}</span>
                  </p>
                  <p className="bigger" data-testid="surfaceWater">
                    <span className="fw-500">Surface Water: </span>
                    <span className="fw-400">{planet?.surface_water}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Everything below the hero */}
          <div className="pageContent">
            {!loading && (
              <>
                <section id="climateTerrain">
                  <ClimateTerrain planet={planet}></ClimateTerrain>
                  <div className="spacer"></div>
                </section>
                <section id="orbitalRotationalPeriod">
                  <OrbitRotate planet={planet}></OrbitRotate>
                </section>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
