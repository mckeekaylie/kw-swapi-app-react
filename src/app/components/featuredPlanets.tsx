// INTERFACES
import { Planets } from "../interfaces/planets";

// MOTION
import { motion } from "framer-motion";

// NEXT
import Image from "next/image";
import Link from "next/link";

// REACT
import { useEffect, useState } from "react";

// STYLES
import styles from "../styles/home.module.scss";
import vars from "../styles/variables.module.scss";

const FeaturedPlanets = (props) => {
  const [featuredPlanetData, setFeaturedPlanetData] = useState<Planets[]>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const planetsContainer: Planets[] = [];

    setLoading(true);

    const fetchData = async () => {
      for (let i = 0; i < props.featured.length; i++) {
        const res = await fetch(
          `https://www.swapi.tech/api/planets/${props.featured[i].uid}`
        );

        const planet = await res.json();

        const planetProps = planet.result.properties;
        planetProps["uid"] = props.featured[i].uid;

        planetsContainer.push(planetProps);
      }

      setFeaturedPlanetData(planetsContainer);
      setLoading(false);
    };

    fetchData();
  }, [props.featured]);

  if (loading) {
    return (
      <div className="flex justifyCenterAlignCenter">
        {loading && (
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
              src="/images/icons/bb-8.svg"
              width={180}
              height={180}
              alt=""
              style={{ width: 80, height: 80 }}
            />
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <section id="FeaturedPlanets">
      <h2 className="mb-1" style={{ color: vars.yellow, textAlign: "center" }}>
        Featured Planets
      </h2>
      {/* Wrap planet columns in a row */}
      <div className="row">
        {featuredPlanetData?.map((planet) => (
          // Create a column for each planet
          <div
            className="col"
            key={planet.name}
            data-testid={`${planet.name}-feature-card`}
          >
            {/* Render each planet as a card inside its own column  */}
            <article className={`${styles.featuredPlanet} p-1 m-1`}>
              <div className="flex">
                {/* Left side of the card */}
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
                {/* Right side of the card */}
                <div className={`${styles.featuredPlanetRightSide} p-1`}>
                  <Link
                    href={`/planet-detail/${planet.uid}`}
                    className="styles.featuredPlanetNameLink"
                  >
                    <p className={styles.featuredPlanetName}>{planet.name}</p>
                  </Link>
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
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPlanets;
