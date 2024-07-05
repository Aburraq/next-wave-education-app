import { PlusLink } from '@/components/common/plus-links';
import { Suspense } from 'react';
import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { TeacherList } from '@/components/list/teacher-list';
import styles from '@/styles/page.module.scss';

export default function TeacherManagementPage({ searchParams }) {
    let { size, page, sort, type } = searchParams;
    size = size || 6;
    page = page || 1;
    sort = sort || 'name';
    type = type || 'desc';

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/teacher/new" title="Teacher">
                    <FaChalkboardTeacher />
                </PlusLink>
            </div>
            <PageTitle title="Teachers" />
            <div className={styles.container}>
                <Suspense
                    fallback={<ListSkeleton flex="1 1 600px" height="280px" />}
                >
                    <TeacherList
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