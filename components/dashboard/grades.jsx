import { LinkTitle } from '@/components/common/link-title';
import { SkeletonLoader } from '@/components/common/skeleton-loader';
import { GradeCardsLoader } from '@/components/loaders/grade-cards-loader';
import { Suspense } from 'react';
import styles from '@/styles/components/dashboard/grades.module.scss';

export const Grades = () => {
    return (
        <div className={styles.container}>
            <LinkTitle href="/dashboard/grades" title="Grades" />
            <hr className={styles.hr} />
            <div className={styles.contentContainer}>
                <Suspense fallback={<SkeletonLoader height="300px" />}>
                    <GradeCardsLoader />
                </Suspense>
            </div>
        </div>
    );
};