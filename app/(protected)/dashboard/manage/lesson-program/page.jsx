import { PlusLink } from '@/components/common/plus-links';
import { Suspense } from 'react';
import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { LessonProgramList } from '@/components/list/lesson-program-list';
import { MdOutlineViewTimeline } from 'react-icons/md';
import styles from '@/styles/page.module.scss';

export default function LessonProgramManagementPage({ searchParams }) {
    let { size, page, sort, type } = searchParams;
    size = size || 6;
    page = page || 1;
    sort = sort || 'day';
    type = type || 'asc';

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink
                    href="/dashboard/manage/lesson-program/new"
                    title="Lesson Program"
                >
                    <MdOutlineViewTimeline />
                </PlusLink>
            </div>
            <PageTitle title="Lesson Programs" />
            <div className={styles.container}>
                <Suspense
                    fallback={<ListSkeleton height="160px" flex="1 1 480px" />}
                >
                    <LessonProgramList
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