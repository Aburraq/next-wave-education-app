import { PlusLink } from '@/components/common/plus-links';
import { Suspense } from 'react';
import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { PiStudentFill } from 'react-icons/pi';
import { StudentList } from '@/components/list/student-list';
import styles from '@/styles/page.module.scss';

export default function StudentManagementPage({ searchParams }) {
    let { size, page, sort, type } = searchParams;
    size = size || 6;
    page = page || 1;
    sort = sort || 'name';
    type = type || 'desc';

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/student/new" title="Student">
                    <PiStudentFill />
                </PlusLink>
            </div>
            <PageTitle title="Students" />
            <div className={styles.container}>
                <Suspense fallback={<ListSkeleton height="260px" />}>
                    <StudentList
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