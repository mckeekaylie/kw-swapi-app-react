"use client";

import { getPlanets } from "@/app/hooks/getPlanets";
import { useEffect, useState } from "react";
import { Planets } from "@/app/interfaces/planets";
import styles from "../../styles/detail.module.scss";
import Image from "next/image";

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
      <div className={styles.planetDetailCover}>
        <div>
          <h1>{planet?.name}</h1>
          <div className="d-flex">
            <h4>Diameter: {planet?.diameter}</h4>
            <h4>Gravity: {planet?.gravity}</h4>
            <h4>Surface Water: {planet?.surface_water}</h4>
          </div>
        </div>
      </div>
      <div className={styles.detailContent}>
        <div className="row">
          <div className="col">
            <div className={styles.climateTerrain}>
              {/* <Image
                className={styles.planetImg}
                src="/images/thermometer.svg"
                width={200}
                height={200}
                alt="Star Wars logo"
              /> */}
              <h2>Climate</h2>
              {planet?.climate}
            </div>
          </div>
          <div className="col">
            <div className={styles.climateTerrain}>
              <h2>Terrain</h2>
              {planet?.terrain}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className={styles.orbitalWrapper}>
              <h3 className="textLg">
                Orbital Period: {planet?.orbital_period}
              </h3>
              <div className={styles.orbitContainer}>
                <div className={styles.outerOrbit}>
                  <div className={styles.orbitCircle}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <h3 className="textLg">
              Rotation Period: {planet?.rotation_period}
            </h3>
            <div className={styles.sphere}></div>
          </div>
          <div className="row">
            {/* <Image
              src="/images/Star-Wars-millennium-falcon-light-jump-virtual-background.jpg"
              width={1280}
              height={720}
              alt="cockpit"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
