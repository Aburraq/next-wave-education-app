import { DeleteButton } from '@/components/common/delete-button';
import styles from '@/styles/components/cards/lesson-card.module.scss';

export const LessonCard = ({ data, deleteAction, orderNumber }) => {
    const isCompulsory = data?.compulsory ? styles.danger : styles.warning;

    return (
        <div className={`${styles.cardContainer} ${isCompulsory}`}>
            <div className={styles.cardHeader}>
                <h3 className={styles.lessonName}>{data?.lessonName}</h3>
                <DeleteButton
                    cb={deleteAction}
                    id={data?.lessonId}
                    title={`Delete ${data?.lessonName}`}
                    simple
                    builtIn={data?.built_in}
                    errorText={`Failed to delete ${data?.lessonName}`}
                    questionText={`Are you sure you want to delete ${data?.lessonName}?`}
                    successText={`${data?.lessonName} deleted successfully`}
                />
            </div>
            <p className={styles.item}>ID: {data?.lessonId}</p>
            <p className={styles.item}>Credits: {data?.creditScore}</p>
            <p className={`${styles.isCompulsory} ${isCompulsory}`}>
                {data?.compulsory ? 'Compulsory' : 'Optional'}
            </p>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
};  