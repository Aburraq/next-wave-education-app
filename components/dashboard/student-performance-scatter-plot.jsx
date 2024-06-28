import { LinkTitle } from '@/components/common/link-title';
import { Suspense } from 'react';
import { SkeletonLoader } from '@/components/common/skeleton-loader';
import { PerformanceScatterLoader } from '@/components/loaders/performance-scatter-loader';
import styles from '@/styles/components/dashboard/performance-scatter-plot.module.scss';

export const StudentPerformanceScatterPlot = () => {
    return (
        <div className={styles.container}>
            <LinkTitle
                title="Student Performance"
                href="/dashboard/manage/student"
            />
            <hr className={styles.hr} />
            <div className={styles.chartContainer}>
                <Suspense fallback={<SkeletonLoader height="300px" />}>
                    <PerformanceScatterLoader />
                </Suspense>
            </div>
        </div>
    );
};