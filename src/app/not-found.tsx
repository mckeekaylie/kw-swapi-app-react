import Link from "next/link";
import styles from "./styles/loading-error.module.scss";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className={styles.errorScreen}>
      <h1>...That\'s no planet.</h1>
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
