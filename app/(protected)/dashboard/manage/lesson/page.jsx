import { PlusLink } from '@/components/common/plus-links';
import { Suspense } from 'react';
import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { PiStudentFill } from 'react-icons/pi';
import styles from '@/styles/page.module.scss';
import { LessonList } from '@/components/list/lesson-list';

export default function LessonManagementPage({ searchParams }) {
    let { size, page, sort, type } = searchParams;
    size = size || 6;
    page = page || 1;
    sort = sort || 'lessonName';
    type = type || 'asc';

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/lesson/new" title="Lesson">
                    <PiStudentFill />
                </PlusLink>
            </div>
            <PageTitle title="Students" />
            <div className={styles.container}>
                <Suspense fallback={<ListSkeleton height="170px" />}>
                    <LessonList
                        size={size}
                        page={page}
                        sort={sort}
                        type={type}
                    />
                </Suspense>
            </div>
        </>
    );
}