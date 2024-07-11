import { Suspense } from 'react';

import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';

import styles from '@/styles/page.module.scss';
import { MeetingListForStudent } from '@/components/list/meeting-list-for-student';

export default function MeetingPage() {
    return (
        <>
            <PageTitle title="Meetings" />
            <div className={styles.container}>
                <Suspense
                    fallback={<ListSkeleton flex="1 1 600px" height="170px" />}
                >
                    <MeetingListForStudent />
                </Suspense>
            </div>
        </>
    );
}
