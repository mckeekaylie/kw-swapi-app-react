"use client";

// COMPONENTS
import ErrorScreen from "../../components/error";
import LoadingScreen from "../../components/loading";
import OrbitRotate from "../../components/orbitRotate";

// INTERFACES
import { Planets } from "../../interfaces/planets";

// HOOKS
import { GetPlanets } from "../../hooks/getPlanets";

// NEXT
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// REACT
import { useEffect, useState } from "react";

// CUSTOM STYLES
import styles from "../../styles/detail.module.scss";

// FRAMER MOTION
import { AnimatePresence, motion } from "framer-motion";
import ClimateTerrain from "@/app/components/climateTerrain";

export default function PlanetDetail() {
  const { data, error, isLoading } = GetPlanets();

  const [planet, setPlanet] = useState<Planets>();

  const planetParam = useParams<{ planet: string }>();

  useEffect(() => {
    const planetsContainer: Planets[] = [];

    if (data && data.length !== undefined) {
      for (let i = 0; i <= data.length; i++) {
        data[i]?.results.map((x) => {
          planetsContainer.push(x);
        });
      }

      // find the planet that matches the param passed via useParams, then store that planet as state variable planet
      const activePlanet = planetsContainer.find(
        (x) => x.name === decodeURIComponent(planetParam.planet)
      );

      setPlanet(activePlanet);
    }
  }, [data, planetParam.planet]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen />;
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
              src="/images/hyperdrive.webp"
              alt="hyperdrive"
              objectFit="cover"
              width={1280}
              height={720}
              objectPosition="center"
              priority
            />
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
          </div>

          {/* Everything below the hero */}
          <div className="pageContent">
            {/* Climate & Terrain */}
            <section>
              <ClimateTerrain planet={planet}></ClimateTerrain>
              <div className="spacer"></div>
            </section>
            <section>
              <OrbitRotate planet={planet}></OrbitRotate>
            </section>
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
