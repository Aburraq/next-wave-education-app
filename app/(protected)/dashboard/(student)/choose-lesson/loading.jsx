import styles from '@/styles/components/dashboard/choose-lesson-loading.module.scss';
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
            <div className={styles.container} style={{ gap: '16px' }}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonLoader key={index} height="130px" />
                ))}
            </div>
        </>
    );
}