// ENUM
import { Icons } from "../enums/enum";

// REACT
import { ChangeEvent, useState } from "react";

// NEXT
import Image from "next/image";
import Link from "next/link";

// STYLES
import styles from "../styles/home.module.scss";
import vars from "../styles/variables.module.scss";

const AllPlanets = (props) => {
  // handle search input change
  const [inputValue, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    const filtered = props.planets.filter((x) => {
      return x.name.toLowerCase().includes(inputValue.toLowerCase());
    });

    props.onFilter(filtered);
  };

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

  return (
    <section id="allPlanets">
      {/* background image, header and search input  */}
      <form>
        <div className="row fw-400 mt-2">
          <div className={styles.planetSearch}>
            <h2 className="mb-1" style={{ color: vars.yellow }} id="allPlanets">
              All Planets
            </h2>
            <input
              aria-labelledby="allPlanets"
              className={styles.searchBar}
              type="text"
              id="inputId"
              placeholder="Filter by planet name..."
              value={inputValue ?? ""}
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </form>
      {/* Render each planet inside sortedFilteredPlanets as a chip */}
      {props.sortedFilteredPlanets && (
        <div className="flexColumn justifyCenterAlignCenter">
          <div className={styles.planetChipsWrapper} key="chips">
            {props.sortedFilteredPlanets.length > 0 ? (
              props.sortedFilteredPlanets
                // only show the first 12 planets until the user clicks show more
                .slice(0, planetChipsToShow)
                // map each planet to a chip
                .map((planet, index) => (
                  <div key={planet.name} data-testid="planetChip">
                    <Link
                      className={styles.planetChip}
                      href={`/planet-detail/${planet.uid}`}
                    >
                      <Image
                        className={styles.planetChipIcon}
                        src={getImageSrc(index)}
                        width={36}
                        height={36}
                        alt=""
                      />
                      <p className="bigger">{planet.name}</p>
                    </Link>
                  </div>
                ))
            ) : (
              // show "no planets found" if sortedFilteredPlanets is an empty state
              <p className="mt-2">
                {" "}
                No planets found! Please clear the search field and try again.
              </p>
            )}
          </div>
          {/* Show more btn */}
          {planetChipsToShow < props.sortedFilteredPlanets.length && (
            <button className={styles.moreLessBtn} onClick={handleShowMore}>
              Show more
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default AllPlanets;
