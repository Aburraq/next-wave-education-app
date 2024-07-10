import { LinkTitle } from '@/components/common/link-title';
import { SkeletonLoader } from '@/components/common/skeleton-loader';
import { Suspense } from 'react';
import { LessonProgramsLoader } from '@/components/loaders/lesson-programs-loader';
import styles from '@/styles/components/dashboard/lesson-programs.module.scss';

export const LessonPrograms = () => {
    return (
        <div className={styles.container}>
            <LinkTitle href="/dashboard/lessons" title="Teachers" />
            <hr className={styles.hr} style={{ marginBottom: '12px' }} />
            <div className={styles.cardsContainer}>
                <Suspense fallback={<SkeletonLoader height="300px" />}>
                    <LessonProgramsLoader />
                </Suspense>
            </div>
        </div>
    );
};