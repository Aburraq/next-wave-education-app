import { Suspense } from 'react';
import { CreditScoreLoader } from '@/components/loaders/credit-score-loader';
import { SkeletonLoader } from '@/components/common/skeleton-loader';
import styles from '@/styles/components/dashboard/credit-score-distribution.module.scss';

export const CreditScoreDistribution = () => {
    return (
        <div className={styles.container}>
            {/* <LinkTitle /> */}
            <hr className={styles.hr} />
            <div className={styles.chartContainer}>
                <Suspense fallback={<SkeletonLoader />}>
                    <CreditScoreLoader />
                </Suspense>
            </div>
        </div>
    );
};