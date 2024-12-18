import Link from "next/link";
import styles from "./styles/loading-error.module.scss";
import Image from "next/image";

export default function NotFound() {
  const title = "...That's no planet.";

  return (
    <div className={styles.errorScreen}>
      <h1>{title}</h1>
      <Image
        className="mt-2 mb-2"
        src="/images/icons/death-star.svg"
        width={180}
        height={180}
        alt=""
      />
      <Link href="/" className={styles.goHome}>
        Return to the galaxy
      </Link>
    </div>
  );
}
