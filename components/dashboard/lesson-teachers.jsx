import { LinkTitle } from '@/components/common/link-title';
import { SkeletonLoader } from '@/components/common/skeleton-loader';
import { Suspense } from 'react';
import { LessonTeachersLoader } from '@/components/loaders/lesson-teachers-loader';
import styles from '@/styles/components/dashboard/grades.module.scss';

export const LessonTeachers = () => {
    return (
        <div className={styles.container}>
            <LinkTitle href="/dashboard/lessons" title="Teachers" />
            <hr className={styles.hr} />
            <div className={styles.contentContainer} style={{ gap: '4px' }}>
                <Suspense fallback={<SkeletonLoader height="300px" />}>
                    <LessonTeachersLoader />
                </Suspense>
            </div>
        </div>
    );
};