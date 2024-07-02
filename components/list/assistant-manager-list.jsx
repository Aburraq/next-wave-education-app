import { NoDataAvailable } from '@/components/common/no-data-available';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';
import { Pagination } from '@/components/common/pagination';
import { getAssistantManagersByPage } from '@/actions/assistant-manager/get-assistant-managers-by-page.action';
import { AdminCard } from '@/components/cards/admin-card';
import styles from '@/styles/list.module.scss';
import { deleteAssistantManager } from '@/actions/assistant-manager/delete-assistant-manager.action';

export const AssistantManagerList = async ({ page, size, sort, type }) => {
    const data = await getAssistantManagersByPage({
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
                            deleteAction={deleteAssistantManager}
                            isEditButton
                            orderNumber={calculateOrderNumber(
                                page,
                                size,
                                index
                            )}
                            type="assistant-manager"
                        />
                    ))
                ) : (
                    <NoDataAvailable />
                )}
            </div>
            <hr className={styles.hr} />
            <Pagination
                baseUrl="/dashboard/manage/assistant-manager"
                currentPage={+page}
                size={size}
                totalPages={data.totalPages}
            />
        </div>
    );
};