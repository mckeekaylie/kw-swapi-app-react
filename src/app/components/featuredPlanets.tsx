// NEXT
import Image from "next/image";
import Link from "next/link";

// STYLES
import styles from "../styles/home.module.scss";
import vars from "../styles/variables.module.scss";

const FeaturedPlanets = (props) => {
  return (
    <section id="FeaturedPlanets">
      <h2 className="mb-1" style={{ color: vars.yellow, textAlign: "center" }}>
        Featured Planets
      </h2>
      {/* Wrap planet columns in a row */}
      <div className="row">
        {props.featured.map((planet) => (
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
                    href={`/planet-detail/${planet.name}`}
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
