import styles from '@/styles/list.module.scss';
import { NoDataAvailable } from '@/components/common/no-data-available';
import { AdminCard } from '@/components/dashboard/cards/admin-card';
import { getAdminsByPage } from '@/actions/admin/get-admins-by-page.action';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';
import { Pagination } from '@/components/common/pagination';

export const AdminList = async ({ page, size, sort, type }) => {
    const data = await getAdminsByPage({ page: page-1, size, sort, type });

    const isDataAvailable =
        data &&
        data.status !== 'error' &&
        Array.isArray(data?.content) &&
        data?.content?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isDataAvailable ? (
                    data.content.map((item, index) => (
                        <AdminCard key={index} data={item} orderNumber={calculateOrderNumber(page,size,index)} />
                    ))
                ) : (
                    <NoDataAvailable />
                )}
            </div>
            <hr className={styles.hr} />
            <Pagination />
        </div>
    );
};