"use client";

// COMPONENTS
import ErrorScreen from "./components/error";
import LoadingScreen from "./components/loading";

// ENUMS & INTERFACES
import { Featured, Icons } from "./enums/enum";
import { Planets } from "./interfaces/planets";

// HOOKS
import { GetPlanets } from "./hooks/getPlanets";

// NEXT
import Image from "next/image";
import Link from "next/link";

// REACT
import { ChangeEvent, useEffect, useState } from "react";

// CUSTOM STYLES
import styles from "./styles/home.module.scss";
import vars from "./styles/variables.module.scss";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { data, error, isLoading, isValidating } = GetPlanets();

  const [planets, setPlanets] = useState<Array<Planets>>([]);
  const [sortedFilteredPlanets, setSortedFilteredPlanets] = useState<
    Array<Planets>
  >([]);
  const [featured, setFeatured] = useState<Array<Planets>>([]);

  // show more button handling
  const [planetChipsToShow, setPlanetChipsToShow] = useState(12);
  const handleShowMore = () => setPlanetChipsToShow(planetChipsToShow + 10);

  // display a random icon inside each planet chip
  const getImageSrc = (index: number) => {
    const icons = Object.values(Icons);
    if ((index + 1) % 5 === 0) {
      return `/images/icons/${icons[4]}`;
    } else if ((index + 1) % 4 === 0) {
      return `/images/icons/${icons[3]}`;
    } else if ((index + 1) % 3 === 0) {
      return `/images/icons/${icons[2]}`;
    } else if ((index + 1) % 2 === 0) {
      return `/images/icons/${icons[1]}`;
    } else {
      return `/images/icons/${icons[0]}`;
    }
  };

  useEffect(() => {
    if (!isLoading && !isValidating) {
      const planetsContainer: Planets[] = [];

      // grab the results array inside the response object, push each result to planetsContainer
      if (data && data.length !== undefined) {
        for (let i = 0; i <= data.length; i++) {
          data[i]?.results.map((x) => {
            planetsContainer.push(x);
          });
        }
      }

      /* populate the featured planet cards by filtering the planets received from the api 
         by the designated featured planets (specifically, the values inside Featured enum) */
      const featuredPlanets = planetsContainer.filter((planet) => {
        const featuredEnumVals = Object.values(Featured) as Array<string>;
        return featuredEnumVals.includes(planet.name);
      });

      // sort the planets received from the api alphabetically before populating the state variable
      const resultsAbc = planetsContainer.sort((a, b) => {
        return a["name"].localeCompare(b["name"]);
      });

      // store the planets received from the api UNMODIFIED, for filtering purposes
      setPlanets(planetsContainer);

      // store the planets sorted in resultsAbc; this state variable populates the planet chips
      setSortedFilteredPlanets(resultsAbc);

      // store the featured planets returned by featuredPlanets; this state variable populates the featured planet cards
      setFeatured(featuredPlanets);
    }
  }, [data, isLoading, isValidating]);

  const [inputValue, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    const filtered = planets.filter((x) => {
      return x.name.toLowerCase().includes(inputValue.toLowerCase());
    });

    setSortedFilteredPlanets(filtered);
  };

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
          {/* Hero */}
          <div className={styles.homeHero}>
            <h4 className="mb-1" style={{ color: "white", marginTop: 0 }}>
              The Planets Of:
            </h4>
            <Image
              className={styles.swLogo}
              src="/images/star-wars-logo.svg"
              width={500}
              height={200}
              alt="Star Wars logo from worldvectorlogo.com"
              loading="lazy"
            />
          </div>
          {/* Everything below the Hero */}
          <div className="pageContent pt-2 pb-2">
            {/* Featured Planets */}
            <h1
              className="mb-1"
              style={{ color: vars.yellow, textAlign: "center" }}
            >
              Featured Planets
            </h1>
            <div className="row">
              {featured.map((planet) => (
                <div
                  className="col"
                  key={planet.name}
                  data-testid={`${planet.name}-feature-card`}
                >
                  <div className={`${styles.featuredPlanet} p-1 m-1`}>
                    <div className="flex">
                      <div className="p-1">
                        <div>
                          <Image
                            className={styles.planetImg}
                            src={"/images/planets/" + planet.name + ".webp"}
                            width={380}
                            height={380}
                            alt={planet.name + " " + "from starwars.fandom.com"}
                            priority
                          />
                        </div>
                      </div>
                      <div className="p-1">
                        <h5 className="mb-1">{planet.name}</h5>
                        <p>
                          <span className="label">Rotation Period: </span>
                          {planet.rotation_period}
                        </p>
                        <p>
                          <span className="label">Orbital Period: </span>
                          {planet.orbital_period}
                        </p>
                        <p>
                          <span className="label">Terrain: </span>
                          {planet.terrain}
                        </p>
                        <p>
                          <span className="label">Climate: </span>
                          {planet.climate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* All Planets (planet search)  */}
            {/* Search input */}
            <div className="row fw-400 mt-2">
              <div className={styles.planetSearch}>
                <h1 className="mb-1" style={{ color: vars.yellow }}>
                  All Planets
                </h1>
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
            {/* Planet Chips */}
            <div className="flexColumn justifyCenterAlignCenter">
              <div className={styles.planetChipsWrapper} key="chips">
                {sortedFilteredPlanets.length > 0 ? (
                  sortedFilteredPlanets
                    .slice(0, planetChipsToShow)
                    .map((planet, index) => (
                      <div key={planet.name} data-testid="planetChip">
                        <Link
                          className={styles.planetChip}
                          href={`/planet-detail/${planet.name}`}
                        >
                          <Image
                            className={styles.planetChipIcon}
                            src={getImageSrc(index)}
                            width={36}
                            height={36}
                            alt="Star Wars Icon from flaticon.com, Premium License"
                          />
                          <p className="bigger">{planet.name}</p>
                        </Link>
                      </div>
                    ))
                ) : (
                  <p className="mt-2">
                    {" "}
                    No planets found! Please clear the search field and try
                    again.
                  </p>
                )}
              </div>
              {/* Show more btn */}
              {planetChipsToShow < sortedFilteredPlanets.length && (
                <button className={styles.moreLessBtn} onClick={handleShowMore}>
                  Show more
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
