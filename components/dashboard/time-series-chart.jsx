import styles from '@/styles/components/dashboard/time-series-chart.module.scss';
import { LinkTitle } from '@/components/common/link-title';
import { Suspense } from 'react';
import { SkeletonLoader } from '@/components/common/skeleton-loader';
import { TimeSeriesLoader } from '@/components/loaders/time-series-loader';

export const TimeSeriesChart = ({ role }) => {
    const title = `${
        role === 'TEACHER' ? 'Meetings' : 'Messages'
    } Through Time`;
    const href = `/dashboard/manage/${
        role === 'TEACHER' ? '/meeting' : '/message'
    }`;

    return (
        <div className={styles.container}>
            <LinkTitle title={title} href={href} />
            <hr className={styles.hr} />
            <div className={styles.chartContainer}>
                <Suspense fallback={<SkeletonLoader height="300px" />}>
                    <TimeSeriesLoader role={role} />
                </Suspense>
            </div>
        </div>
    );
};