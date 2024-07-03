import { deleteLessonProgram } from '@/actions/lesson/delete-lesson-program.action';
import { DeleteButton } from '@/components/common/delete-button';
import styles from '@/styles/components/dashboard/cards/lesson-program-card.module.scss';

export const LessonProgramCard = ({ authorized, data, orderNumber }) => {
    const itemName = `lesson program - ${data?.lessonProgramId}`;

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                <h2 className={styles.title}>{itemName}</h2>
                {authorized && (
                    <DeleteButton
                        cb={deleteLessonProgram}
                        id={data?.lessonProgramId}
                        title={`Delete ${itemName}`}
                        errorText={`Failed to delete ${itemName}`}
                        questionText={`Are you sure you want to delete ${itemName}?`}
                        successText={`${itemName} deleted successfully`}
                    />
                )}
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.classInfo}>
                    <div className={styles.day}>
                        <span>Day:</span>
                        <span>{data?.day}</span>
                    </div>
                    <div className={styles.time}>
                        {data?.startTime} - {data?.stopTime}
                    </div>
                </div>
                <div className={styles.lessonList}>
                    {data?.lessonName &&
                        data?.lessonName.map((lesson, index) => (
                            <li key={index} className={styles.item}>
                                <span>{lesson?.lessonName}</span>
                                <span>(Credits: {lesson?.creditScore})</span>
                            </li>
                        ))}
                </div>
            </div>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
};