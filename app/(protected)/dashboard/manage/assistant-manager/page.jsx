import { PlusLink } from '@/components/common/plus-links';
import { Suspense } from 'react';
import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { MdAssistant } from 'react-icons/md';
import { AssistantManagerList } from '@/components/list/assistant-manager-list';
import styles from '@/styles/page.module.scss';

export default function AssistantManagerManagementPage({ searchParams }) {
    let { size, page, sort, type } = searchParams;
    size = size || 6;
    page = page || 1;
    sort = sort || 'name';
    type = type || 'desc';

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink
                    href="/dashboard/manage/assistant-manager/new"
                    title="Assistant Manager"
                >
                    <MdAssistant />
                </PlusLink>
            </div>
            <PageTitle title="Assistant Managers (Vice Deans)" />
            <div className={styles.container}>
                <Suspense fallback={<ListSkeleton />}>
                    <AssistantManagerList
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