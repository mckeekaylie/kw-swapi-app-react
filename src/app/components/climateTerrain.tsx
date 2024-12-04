// NEXT
import Image from "next/image";

// CUSTOM STYLES
import styles from "../styles/detail.module.scss";

const ClimateTerrain = (props) => {
  return (
    <div className="row">
      {/* CLIMATE */}
      <div className="col">
        <div className={`${styles.climateTerrain} p-1 m-1`}>
          <div className={styles.imgTextWrapper}>
            <div>
              <Image
                src="/images/icons/climate.svg"
                width={62}
                height={62}
                alt="Climate icon"
              />
            </div>
            <dl>
              <dt>Climate</dt>
              <dd>
                {props.planet?.climate.split(",").map((word, index) => (
                  <span key={index}>
                    {word}
                    <br />
                  </span>
                ))}
              </dd>
            </dl>
          </div>
        </div>
      </div>

      {/* TERRAIN */}
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
            <dl>
              <dt>Terrain</dt>
              <dd>
                {props.planet?.terrain.split(",").map((word, index) => (
                  <span key={index}>
                    {word}
                    <br />
                  </span>
                ))}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateTerrain;
