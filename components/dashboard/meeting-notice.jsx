import { LinkTitle } from '@/components/common/link-title';
import { SkeletonLoader } from '@/components/common/skeleton-loader';
import { Suspense } from 'react';
import { MeetingNoticeLoader } from '@/components/loaders/meeting-notice-loader';
import styles from '@/styles/components/dashboard/meeting-notice.module.scss';

export const MeetingNotice = () => {
    return (
        <div className={styles.container}>
            <LinkTitle href="/dashboard/meetings" title="Meetings" />
            <hr className={styles.hr} />
            <div className={styles.contentContainer}>
                <Suspense fallback={<SkeletonLoader />}>
                    <MeetingNoticeLoader />
                </Suspense>
            </div>
        </div>
    );
};