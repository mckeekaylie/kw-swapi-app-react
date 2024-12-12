import styles from "../styles/loading-error.module.scss";

import galaxy from "../../../public/images/bkgd-galaxy.webp";

import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className={styles.loadingScreen} data-testid="loadingScreen">
      <Image src={galaxy} alt="Galaxy background by Freepik" fill priority />
      <Image
        className={styles.loaderSvg}
        src="/images/icons/starfighter.svg"
        alt="Star Wars Naboo Ship icon by Icons8"
        width={120}
        height={120}
        priority
      />
    </div>
  );
}
