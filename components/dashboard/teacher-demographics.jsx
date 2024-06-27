import { LinkTitle } from '@/components/common/link-title';
import { AdvisorStatusLoader } from '@/components/loaders/advisor-status-loader';
import { Suspense } from 'react';
import { SkeletonLoader } from '@/components/common/skeleton-loader';
import styles from '@/styles/components/dashboard/teacher-demographics.module.scss';

export const TeacherDemographics = () => {
    return (
        <div className={styles.container}>
            <LinkTitle
                title="Teacher Advisor Status"
                href="/dashboard/manage/teacher"
            />
            <hr className={styles.hr} />
            <div className={styles.chartContainer}>
                <Suspense fallback={<SkeletonLoader height="300px" />}>
                    <AdvisorStatusLoader />
                </Suspense>
            </div>
        </div>
    );
};