import { PlusLink } from '@/components/common/plus-links';
import { Suspense } from 'react';
import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { GiNotebook } from 'react-icons/gi';
import { StudentInformationList } from '@/components/list/student-information-list';
import styles from '@/styles/page.module.scss';

export default function StudentInformationManagementPage({ searchParams }) {
    let { size, page } = searchParams;
    size = size || 6;
    page = page || 1;

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink
                    href="/dashboard/manage/student-information/new"
                    title="Student Information"
                >
                    <GiNotebook />
                </PlusLink>
            </div>
            <PageTitle title="Student Information" />
            <div className={styles.container}>
                <Suspense fallback={<ListSkeleton />}>
                    <StudentInformationList size={size} page={page} />
                </Suspense>
            </div>
        </>
    );
}