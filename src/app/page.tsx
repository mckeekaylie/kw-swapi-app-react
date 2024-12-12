"use client";

// COMPONENTS
import ErrorScreen from "./components/error";
import LoadingScreen from "./components/loading";
import FeaturedPlanets from "./components/featuredPlanets";
import AllPlanets from "./components/allPlanets";

// ENUMS & INTERFACES
import { Featured, Icons } from "./enums/enum";
import { Planets } from "./interfaces/planets";

// HOOKS
import { GetPlanets } from "./hooks/getPlanets";

// MOTION
import { AnimatePresence, motion } from "framer-motion";

// NEXT
import Image from "next/image";

// REACT
import { useEffect, useState } from "react";

// STYLES
import styles from "./styles/home.module.scss";

export default function Home() {
  // api
  const { data, error, isLoading, isValidating } = GetPlanets();

  // state vars
  const [planets, setPlanets] = useState<Array<Planets>>([]);
  const [sortedFilteredPlanets, setSortedFilteredPlanets] = useState<
    Array<Planets>
  >([]);
  const [featured, setFeatured] = useState<Array<Planets>>([]);

  useEffect(() => {
    if (!isLoading && !isValidating) {
      const planetsContainer: Planets[] = [];

      // deep clone the results array inside the response object by pushing each result to planetsContainer
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

  // set the value of sortedFilteredPlanets after AllPlanets component handles search input change
  const handleFilterChange = (planetsFromChild) => {
    setSortedFilteredPlanets(planetsFromChild);
  };

  // render loading screen if getPlanets returns isLoading = true
  if (isLoading) {
    return <LoadingScreen />;
  }

  // render error screen if getPlanets returns error
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
            <h1 style={{ color: "white", marginTop: 0 }}>
              <div className="flex flexColumn justifyCenterAlignCenter">
                The Planets Of:
                <Image
                  className={styles.swLogo}
                  src="/images/star-wars-logo.svg"
                  width={500}
                  height={200}
                  alt="Star Wars"
                  placeholder="blur"
                  blurDataURL={"/images/star-wars-logo.svg"}
                />
              </div>
            </h1>
          </div>

          {/* Everything below the Hero */}
          <div className="pageContent pt-2 pb-2">
            {/* Featured Planets */}
            <FeaturedPlanets featured={featured}></FeaturedPlanets>

            {/* All Planets (planet search)  */}
            <AllPlanets
              sortedFilteredPlanets={sortedFilteredPlanets}
              planets={planets}
              onFilter={handleFilterChange}
            ></AllPlanets>
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
