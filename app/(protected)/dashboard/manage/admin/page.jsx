import { PlusLink } from '@/components/common/plus-links';
import { Suspense } from 'react';
import { RiAdminFill } from 'react-icons/ri';
import { PageTitle } from '@/components/common/page-title';
import { ListSkeleton } from '@/components/common/list-skeleton';
import { AdminList } from '@/components/dashboard/admin-list';
import styles from '@/styles/page.module.scss';

export default function AdminManagementPage({ searchParams }) {
    
    let { size, page, sort, type } = searchParams;
    size = size || 6;
    page = page || 1;
    sort = sort || 'name';
    type = type || 'desc';

    return (
        <>
            <div className={styles.addContainer}>
                <PlusLink href="/dashboard/manage/admin/new" title="Admin">
                    <RiAdminFill />
                </PlusLink>
            </div>
            <PageTitle title="Admins" />
            <div className={styles.container}>
                <Suspense fallback={<ListSkeleton />}>
                    <AdminList
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