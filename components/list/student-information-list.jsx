import { NoDataAvailable } from '@/components/common/no-data-available';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';
import { Pagination } from '@/components/common/pagination';
import { StudentInformationCard } from '@/components/cards/student-information-card';
import { getStudentInformationByPageAsTeacher } from '@/actions/student-information/get-student-information-by-page-as-teacher.action';
import { deleteStudentInformation } from '@/actions/student-information/delete-student-information.action';
import styles from '@/styles/list.module.scss';

export const StudentInformationList = async ({ page, size }) => {
    const data = await getStudentInformationByPageAsTeacher({
        page: page - 1,
        size
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
                    data?.content?.map((item, index) => (
                        <StudentInformationCard
                            key={index}
                            data={item}
                            deleteAction={deleteStudentInformation}
                            isAuthorized
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
                baseUrl="/dashboard/student-information"
                currentPage={+page}
                size={size}
                totalPages={data.totalPages}
            />
        </div>
    );
};