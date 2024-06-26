import styles from '@/styles/components/common/loader-ring.module.scss';

export const LoaderRing = ({ text }) => {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                {text && <div className={styles.text}>{text}</div>}
            </div>
        </div>
    );
};