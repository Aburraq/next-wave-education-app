import { Suspense } from 'react';
import { CreditScoreLoader } from '@/components/loaders/credit-score-loader';
import { SkeletonLoader } from '@/components/common/skeleton-loader';
import { LinkTitle } from '@/components/common/link-title';
import styles from '@/styles/components/dashboard/credit-score-distribution.module.scss';

export const CreditScoreDistribution = () => {
    return (
        <div className={styles.container}>
            <LinkTitle
                href="/dashboard/manage/lesson"
                title="Credit Score Distribution"
            />
            <hr className={styles.hr} />
            <div className={styles.chartContainer}>
                <Suspense fallback={<SkeletonLoader height="300px" />}>
                    <CreditScoreLoader />
                </Suspense>
            </div>
        </div>
    );
};