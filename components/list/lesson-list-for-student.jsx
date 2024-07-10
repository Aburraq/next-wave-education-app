import { NoDataAvailable } from '@/components/common/no-data-available';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';
import { getLessonProgramsAsStudent } from '@/actions/student/get-lesson-programs-as-student.action';
import { LessonProgramCard } from '@/components/cards/lesson-program-card';
import styles from '@/styles/list.module.scss';

export const LessonListForStudent = async () => {
    const data = await getLessonProgramsAsStudent();

    const isDataAvailable =
        data &&
        data.status !== 'error' &&
        Array.isArray(data) &&
        data?.length > 0;

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>
                {isDataAvailable ? (
                    data.map((item, index) => (
                        <LessonProgramCard
                            key={index}
                            data={item}
                            orderNumber={calculateOrderNumber(1, 500, index)}
                        />
                    ))
                ) : (
                    <NoDataAvailable />
                )}
            </div>
        </div>
    );
};