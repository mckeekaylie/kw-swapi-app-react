"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { Featured, Icons } from "./enums/enum";
import { Planets, PlanetRes } from "./interfaces/planets";
import Image from "next/image";
import styles from "./styles/home.module.scss";
import vars from "./styles/variables.module.scss";
import Link from "next/link";
import { getPlanets } from "./hooks/getPlanets";

export default function Home() {
  const { data, isLoading, isValidating } = getPlanets();

  const [items, setItems] = useState<Array<any>>([]);
  const [filteredItems, setFilteredItems] = useState<Array<Planets>>([]);
  const [featured, setFeatured] = useState<Array<Planets>>([]);

  const url = "https://swapi.dev/api/planets";

  const getRandomIcon = () => {
    const icons = Object.values(Icons);
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  };

  useEffect(() => {
    if (!isLoading && !isValidating) {
      let planetsContainer: Planets[] = [];

      if (data && data.length !== undefined) {
        for (let i = 0; i <= data.length; i++) {
          data[i]?.results.map((x) => {
            planetsContainer.push(x);
          });
        }
      }

      const featuredPlanets = planetsContainer.filter((planet) => {
        const featuredEnumVals = Object.values(Featured) as Array<string>;
        return featuredEnumVals.includes(planet.name);
      });

      const resultsAbc = planetsContainer.sort((a, b) => {
        return a["name"].localeCompare(b["name"]);
      });

      setItems(planetsContainer);
      setFilteredItems(resultsAbc);
      setFeatured(featuredPlanets);
    }
  }, [data]);

  const [inputValue, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    const filtered = items.filter((x) => {
      return x.name.toLowerCase().includes(inputValue.toLowerCase());
    });

    setFilteredItems(filtered);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.homebanner}>
        <h1 style={{ color: "white", marginTop: 0 }}>The Planets Of:</h1>
        <Image
          src="/images/star-wars-logo.svg"
          width={500}
          height={200}
          alt="Star Wars logo"
        />
      </div>
      <div className={styles.homeContent}>
        <div className="row" key="featured">
          <h1 style={{ color: vars.yellow, textAlign: "center" }}>
            Featured Planets
          </h1>
          {featured.map((planet) => (
            <div className="col" key={planet.name}>
              <div className={styles.featuredPlanet}>
                <div className="flexObjectHorizontal">
                  <div>
                    <Image
                      className={styles.planetImg}
                      src="/images/planets/endor.png"
                      width={200}
                      height={200}
                      alt="Star Wars logo"
                    />
                  </div>
                  <div className={styles.featuredPlanetText}>
                    <h2>{planet.name}</h2>
                    <span className="block">
                      <span className="label">Rotation Period: </span>
                      {planet.rotation_period}
                    </span>
                    <span className="block">
                      <span className="label">Orbital Period: </span>
                      {planet.orbital_period}
                    </span>
                    <span className="block">
                      <span className="label">Terrain: </span>
                      {planet.terrain}
                    </span>
                    <span className="block">
                      <span className="label">Climate: </span>
                      {planet.climate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row" key="search">
          <div className={styles.planetsSearch}>
            <h1 style={{ color: vars.yellow }}>All Planets (A to Z)</h1>
            <input
              className={styles.searchBar}
              type="text"
              id="inputId"
              placeholder="Filter by planet name..."
              value={inputValue ?? ""}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className={styles.planetChipsWrapper} key="chips">
            {filteredItems.map((planet) => (
              <div key={planet.name}>
                <Link
                  className={styles.planetChip}
                  href={`/planet-detail/${planet.name}`}
                >
                  {planet.name}
                  <Image
                    className={styles.planetChipIcon}
                    src={getRandomIcon()}
                    width={36}
                    height={36}
                    alt="Star Wars Icon"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
