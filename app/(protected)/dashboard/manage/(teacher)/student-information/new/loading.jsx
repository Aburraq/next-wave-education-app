import styles from '@/styles/form.module.scss';
import { SkeletonLoader } from '@/components/common/skeleton-loader';

export default function Loading() {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '16px'
                }}
            >
                <SkeletonLoader height="40px" width="400px" />
            </div>
            <form className={styles.form}>
                <div className={styles.inputsContainer}>
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className={styles.inputGroup}>
                            <div className={styles.label}>
                                <SkeletonLoader height="24px" width="110px" />
                            </div>
                            <div
                                className={styles.input}
                                style={{ padding: 0, border: 'none' }}
                            >
                                <SkeletonLoader height="44px" width="100%" />
                            </div>
                        </div>
                    ))}
                </div>
                <button type="button" disabled style={{ border: 'none' }}>
                    <SkeletonLoader height="50px" width="100%" />
                </button>
            </form>
        </>
    );
}