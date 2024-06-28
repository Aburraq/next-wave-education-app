import styles from '@/styles/list.module.scss';
import { SkeletonLoader } from '@/components/common/skeleton-loader';

export const ListSkeleton = ({
    height = '230px',
    flex = '1 1 450px',
    itemCount = 4,
    isRing
}) => {
    return (
        <div className={styles.container}>
            <div
                className={`${styles.cardsContainer} ${styles.skeletonContainer}`}
            >
                {[...Array(itemCount)].map((_, index) => (
                    <SkeletonLoader
                        key={index}
                        height={height}
                        flex={flex}
                        isRing={isRing}
                    />
                ))}
            </div>
            <hr className={styles.hr} />
            <div className={styles.paginationContainer}>
                {[...Array(3)].map((_, index) => (
                    <SkeletonLoader
                        key={index}
                        height="50px"
                        width="50px"
                        rounded
                    />
                ))}
            </div>
        </div>
    );
};