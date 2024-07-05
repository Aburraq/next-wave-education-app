import { NoDataAvailable } from '@/components/common/no-data-available';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';
import { Pagination } from '@/components/common/pagination';
import { AdminCard } from '@/components/cards/admin-card';
import { getStudentsByPage } from '@/actions/student/get-students-by-page.action';
import { deleteStudent } from '@/actions/student/delete-student.action';
import styles from '@/styles/list.module.scss';

export const StudentList = async ({ page, size, sort, type }) => {
    const data = await getStudentsByPage({
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
                            deleteAction={deleteStudent}
                            isEditButton
                            orderNumber={calculateOrderNumber(
                                page,
                                size,
                                index
                            )}
                            type="student"
                        />
                    ))
                ) : (
                    <NoDataAvailable />
                )}
            </div>
            <hr className={styles.hr} />
            <Pagination
                baseUrl="/dashboard/manage/student"
                currentPage={+page}
                size={size}
                totalPages={data.totalPages}
            />
        </div>
    );
};