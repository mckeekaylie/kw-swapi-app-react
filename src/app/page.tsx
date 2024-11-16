"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { Featured, Icons } from "./enums/enum";
import { Planets } from "./interfaces/planets";
import Image from "next/image";
import styles from "./styles/home.module.scss";
import vars from "./styles/variables.module.scss";

interface iDefault {
  defaultValue: string | null;
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [items, setItems] = useState<Array<Planets>>([]);
  const [filteredItems, setFilteredItems] = useState<Array<Planets>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featured, setFeatured] = useState<Array<Planets>>([]);

  const url = "https://swapi.dev/api/planets";

  const getRandomIcon = () => {
    const icons = Object.values(Icons);
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  };

  useEffect(() => {
    let results: Planets[] = [];
    let featured: Planets[] = [];

    const fetchData = async () => {
      setIsLoading(true);
      for (let i = 1; i <= 6; i++) {
        const response = await fetch(`${url}?page=${i}`);
        const data = await response.json();

        data.results.forEach((x) => {
          results.push(x);
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
      }

      const featured = results.filter((result) => {
        const enumFeature = Object.values(Featured) as Array<string>;
        return enumFeature.includes(result.name);
      });

      setFeatured(featured);
      setItems(results);
      setFilteredItems(results);

      setIsLoading(false);
    };

    fetchData();
  }, []);

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
        <div className="row">
          <h1 style={{ color: vars.yellow, textAlign: "center" }}>
            Featured Planets
          </h1>
          {featured.map((planet) => (
            <div className="col">
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
        <div className="row">
          <div className={styles.planetsSearch}>
            <h1 style={{ color: vars.yellow }}>All Planets</h1>
            <input
              className={styles.searchBar}
              type="text"
              id="inputId"
              placeholder="Search by planet name..."
              value={inputValue ?? ""}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className={styles.planetChipsWrapper}>
            {filteredItems.map((planet) => (
              <div className={styles.planetChip}>
                <Image
                  className={styles.planetChipIcon}
                  src={getRandomIcon()}
                  width={36}
                  height={36}
                  alt="Star Wars Icon"
                />
                {planet.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
