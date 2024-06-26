import styles from "@/styles/components/common/three-dots.module.scss";

export const ThreeDots = () => {
  return (
    <div className={styles.dotWrapper}>
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>

    </div>
  )
}
