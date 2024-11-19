"use client";

import { getPlanets } from "@/app/hooks/getPlanets";
import { useEffect, useState } from "react";
import { Planets } from "@/app/interfaces/planets";
import styles from "../../styles/detail.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function PlanetDetail({ params }) {
  const { data, isLoading, isValidating } = getPlanets();

  const [planet, setPlanet] = useState<Planets>();

  useEffect(() => {
    let planetsContainer: Planets[] = [];

    if (data && data.length !== undefined) {
      for (let i = 0; i <= data.length; i++) {
        data[i]?.results.map((x) => {
          planetsContainer.push(x);
        });
      }

      const activePlanet = planetsContainer.find(
        (x) => x.name === params.planet
      );

      setPlanet(activePlanet);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      <div className={styles.planetDetailCover}>
        <div>
          <h1 className="mb-1">{planet?.name}</h1>
          <div className="flex justifyBetweenAlignCenter">
            <h5 className="pr-2">
              Diameter: <span className="fw-400">{planet?.diameter}</span>
            </h5>
            <h5 className="pr-2">
              Gravity: <span className="fw-400">{planet?.gravity}</span>
            </h5>
            <h5 className="pr-2">
              Surface Water:{" "}
              <span className="fw-400">{planet?.surface_water}</span>
            </h5>
          </div>
        </div>
      </div>
      <div className="pageContent">
        <div className="row">
          <div className="col">
            <div className={`${styles.climateTerrain} p-1 m-1`}>
              <div className="flex justifyCenterAlignCenter">
                <Image
                  className={styles.climateTerrainIcon}
                  src="/images/icons/climate.svg"
                  width={56}
                  height={56}
                  alt="Climate icon"
                />
                <h5>Climate</h5>
              </div>
              <h5 className="fw-400">{planet?.climate}</h5>
            </div>
          </div>
          <div className="col">
            <div className={`${styles.climateTerrain} p-1 m-1`}>
              <div className="flex justifyCenterAlignCenter">
                <Image
                  className={styles.climateTerrainIcon}
                  src="/images/icons/terrain.svg"
                  width={54}
                  height={54}
                  alt="Terrain icon"
                />
                <h5>Terrain</h5>
              </div>
              <h5 className="fw-400">{planet?.terrain}</h5>
            </div>
          </div>
        </div>
        <div className="spacer"></div>
        <div className="row">
          <div className="col">
            <div className={styles.orbitalWrapper}>
              <h4 className="p-2">Orbital Period: {planet?.orbital_period}</h4>
              <div className={styles.outerOrbit}>
                <div className={styles.orbitCircle}></div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className={styles.orbitalWrapper}>
              <h4 className="p-2">
                Rotation Period: {planet?.rotation_period}
              </h4>
              <div className={styles.sphere}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
