import { Suspense } from 'react';
import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { MessageList } from '@/components/list/message-list';
import styles from '@/styles/page.module.scss';

export default function MessageManagementPage({ searchParams }) {
    let { size, page, sort, type } = searchParams;
    size = size || 6;
    page = page || 1;
    sort = sort || 'name';
    type = type || 'desc';

    return (
        <>
            <PageTitle title="Contact Messages" />
            <div className={styles.container}>
                <Suspense
                    fallback={<ListSkeleton height="110px" flex="1 1 500px" />}
                >
                    <MessageList
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