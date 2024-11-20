import Image from "next/image";
import styles from "../styles/loading-error.module.scss";
import Link from "next/link";

export default function LoadingScreen() {
  return (
    <div className={styles.loadingScreen}>
      <Link href="https://icons8.com/icon/A5m8pfz5UiSL/star-wars-naboo-ship">
        <Image
          className={styles.loaderSvg}
          src="/images/icons/starfighter.svg"
          width={120}
          height={120}
          alt="Star Wars Naboo Ship icon by Icons8"
        />
      </Link>
    </div>
  );
}
