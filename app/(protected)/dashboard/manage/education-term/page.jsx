import { PlusLink } from '@/components/common/plus-links';
import { Suspense } from 'react';
import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { AiOutlineSchedule } from 'react-icons/ai';
import { EducationTermList } from '@/components/list/education-term-list';
import styles from '@/styles/page.module.scss';

export default function EducationTermManagementPage({ searchParams }) {
    let { size, page, sort, type } = searchParams;
    size = size || 6;
    page = page || 1;
    sort = sort || 'startDate';
    type = type || 'desc';

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink
                    href="/dashboard/manage/education-term/new"
                    title="Education Terms"
                >
                    <AiOutlineSchedule />
                </PlusLink>
            </div>
            <PageTitle title="Education Terms" />
            <div className={styles.container}>
                <Suspense
                    fallback={<ListSkeleton height="160px" flex="1 1 350px" />}
                >
                    <EducationTermList
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