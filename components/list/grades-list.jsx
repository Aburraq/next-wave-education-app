import { NoDataAvailable } from '@/components/common/no-data-available';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';
import { Pagination } from '@/components/common/pagination';
import { getStudentInformationAsStudent } from '@/actions/student/get-student-information-as-student.action';
import { StudentInformationCard } from '@/components/cards/student-information-card';
import styles from '@/styles/list.module.scss';

export const GradesList = async ({ page, size }) => {
    const data = await getStudentInformationAsStudent({
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
                baseUrl="/dashboard/grades"
                currentPage={+page}
                size={size}
                totalPages={data.totalPages}
            />
        </div>
    );
};