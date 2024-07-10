import { PlusLink } from '@/components/common/plus-links';
import { Suspense } from 'react';
import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { MeetingListForTeacher } from '@/components/list/meeting-list-for-teacher';
import { FaPeopleLine } from 'react-icons/fa6';
import styles from '@/styles/page.module.scss';

export default function MeetingManagementPage({ searchParams }) {
    let { size, page, sort, type } = searchParams;
    size = size || 6;
    page = page || 1;
    sort = sort || 'date';
    type = type || 'desc';

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/meeting/new" title="Meeting">
                    <FaPeopleLine />
                </PlusLink>
            </div>
            <PageTitle title="Meetings" />
            <div className={styles.container}>
                <Suspense
                    fallback={<ListSkeleton height="220px" flex="1 1 600px" />}
                >
                    <MeetingListForTeacher
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