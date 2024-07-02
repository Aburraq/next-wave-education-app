import { NoDataAvailable } from '@/components/common/no-data-available';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';
import { Pagination } from '@/components/common/pagination';
import { AdminCard } from '@/components/cards/admin-card';
import { getManagersByPage } from '@/actions/manager/get-managers-by-page.action';
import { deleteManager } from '@/actions/manager/delete-manager.action';
import styles from '@/styles/list.module.scss';

export const ManagerList = async ({ page, size, sort, type }) => {
    const data = await getManagersByPage({
        page: page - 1,
        size,
        sort,
        type
    });

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
                        <AdminCard
                            key={index}
                            data={item}
                            deleteAction={deleteManager}
                            isEditButton
                            orderNumber={calculateOrderNumber(
                                page,
                                size,
                                index
                            )}
                            type="manager"
                        />
                    ))
                ) : (
                    <NoDataAvailable />
                )}
            </div>
            <hr className={styles.hr} />
            <Pagination
                baseUrl="/dashboard/manage/manager"
                currentPage={+page}
                size={size}
                totalPages={data.totalPages}
            />
        </div>
    );
};