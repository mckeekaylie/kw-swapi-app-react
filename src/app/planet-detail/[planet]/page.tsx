"use client";

import { GetPlanets } from "@/app/hooks/getPlanets";
import { useEffect, useState } from "react";
import { Planets } from "@/app/interfaces/planets";
import styles from "../../styles/detail.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import LoadingScreen from "@/app/components/loading";
import ErrorScreen from "@/app/components/error";

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

      const activePlanet = planetsContainer.find(
        (x) => x.name === decodeURIComponent(planetParam.planet)
      );
      console.log(activePlanet);
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
          <h1 className="mb-2">{planet?.name}</h1>
          <div className={styles.infoBelowPlanetName}>
            <h6>
              Diameter: <span className="fw-400">{planet?.diameter}</span>
            </h6>
            <h6>
              Gravity: <span className="fw-400">{planet?.gravity}</span>
            </h6>
            <h6>
              Surface Water:{" "}
              <span className="fw-400">{planet?.surface_water}</span>
            </h6>
          </div>
        </div>
      </div>
      <div className="pageContent">
        <div className="row">
          <div className="col">
            <div className={`${styles.climateTerrain} p-1 m-1`}>
              <div className={styles.imgTextWrapper}>
                <div>
                  <Image
                    className={styles.climateTerrainIcon}
                    src="/images/icons/climate.svg"
                    width={62}
                    height={62}
                    alt="Climate icon"
                  />
                </div>
                <div className={styles.textWrapper}>
                  <h6>Climate</h6>
                  <h6 className="fw-300">
                    {planet?.climate.split(",").map((word, index) => (
                      <span key={index}>
                        {word}
                        <br />
                      </span>
                    ))}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className={`${styles.climateTerrain} p-1 m-1`}>
              <div className={styles.imgTextWrapper}>
                <div>
                  <Image
                    className={styles.climateTerrainIcon}
                    src="/images/icons/terrain.svg"
                    width={62}
                    height={62}
                    alt="Terrain icon"
                  />
                </div>
                <div className={styles.textWrapper}>
                  <h6>Terrain</h6>
                  <h6 className="fw-300">
                    {planet?.terrain.split(",").map((word, index) => (
                      <span key={index}>
                        {word}
                        <br />
                      </span>
                    ))}
                  </h6>
                </div>
              </div>
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
