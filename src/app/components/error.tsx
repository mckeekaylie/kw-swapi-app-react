import styles from "../styles/loading-error.module.scss";
import Image from "next/image";

export default function ErrorScreen() {
  return (
    <div className={styles.errorScreen} data-testid="errorScreen">
      <div className={styles.errorScreenContent}>
        <h1>A grievous mistake occurred while fetching data.</h1>
        <Image
          className="mt-1 mb-1"
          src="/images/icons/grievous.svg"
          width={180}
          height={180}
          alt=""
        />
        <h5>Please try again later.</h5>
      </div>
    </div>
  );
}
