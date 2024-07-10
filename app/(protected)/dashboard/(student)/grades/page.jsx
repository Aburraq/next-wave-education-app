import { Suspense } from 'react';
import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { GradesList } from '@/components/list/grades-list';
import styles from '@/styles/page.module.scss';

export default function GradesPage({ searchParams }) {
    let { page, size } = searchParams;

    page = page || 1;
    size = size || 6;

    return (
        <>
            <PageTitle title="Grades" />
            <div className={styles.container}>
                <Suspense
                    fallback={<ListSkeleton height="290px" flex="1 0 700px" />}
                >
                    <GradesList page={page} size={size} />
                </Suspense>
            </div>
        </>
    );
}