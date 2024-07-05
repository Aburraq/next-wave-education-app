import { NoDataAvailable } from '@/components/common/no-data-available';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';
import { Pagination } from '@/components/common/pagination';
import { AdminCard } from '@/components/cards/admin-card';
import { getTeachersByPage } from '@/actions/teacher/get-teachers-by-page.action';
import { deleteTeacher } from '@/actions/teacher/delete-teacher.action';
import styles from '@/styles/list.module.scss';

export const TeacherList = async ({ page, size, sort, type }) => {
    const data = await getTeachersByPage({
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
                            deleteAction={deleteTeacher}
                            isEditButton
                            orderNumber={calculateOrderNumber(
                                page,
                                size,
                                index
                            )}
                            type="teacher"
                        />
                    ))
                ) : (
                    <NoDataAvailable />
                )}
            </div>
            <hr className={styles.hr} />
            <Pagination
                baseUrl="/dashboard/manage/teacher"
                currentPage={+page}
                size={size}
                totalPages={data.totalPages}
            />
        </div>
    );
};