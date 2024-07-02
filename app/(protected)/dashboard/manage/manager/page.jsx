import { PlusLink } from '@/components/common/plus-links';
import { Suspense } from 'react';
import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { GrUserManager } from 'react-icons/gr';
import { ManagerList } from '@/components/list/manager-list';
import styles from '@/styles/page.module.scss';

export default function ManagerManagementPage({ searchParams }) {
    let { size, page, sort, type } = searchParams;
    size = size || 6;
    page = page || 1;
    sort = sort || 'name';
    type = type || 'desc';

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/manager/new" title="Manager">
                    <GrUserManager />
                </PlusLink>
            </div>
            <PageTitle title="Managers (Deans)" />
            <div className={styles.container}>
                <Suspense fallback={<ListSkeleton />}>
                    <ManagerList
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