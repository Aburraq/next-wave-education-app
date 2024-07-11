import { Suspense } from 'react';
import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';
import styles from '@/styles/page.module.scss';
import { LessonListForStudent } from '@/components/list/lesson-list-for-student';

export default function LessonsPage() {
    return (
        <>
            <PageTitle title="Lessons" />
            <div className={styles.container}>
                <Suspense
                    fallback={<ListSkeleton flex="1 1 600px" height="170px" />}
                >
                    <LessonListForStudent />
                </Suspense>
            </div>
        </>
    );
}
