import moment from 'moment';
import { compareDateWithToday } from '@/utils/functions/compare-date-with-today';
import { EditButton } from '@/components/common/edit-button';
import { DeleteButton } from '@/components/common/delete-button';
import styles from '@/styles/components/cards/meeting-card.module.scss';

export const MeetingCard = ({
    data,
    deleteAction,
    isAuthorized,
    isEditButton,
    orderNumber,
    type
}) => {
    const dateTimeComparison = compareDateWithToday(data?.date);

    type = 'teacher' ? 'meeting' : 'student';

    const id = data?.id || data?.userId;

    const fullName = data?.teacherName;

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                <h3>{data?.description}</h3>
                {isAuthorized && (
                    <div className={styles.buttonsContainer}>
                        {isEditButton && (
                            <EditButton
                                title={`Edit ${fullName}`}
                                href={`/dashboard/manage/${type}/edit/${id}`}
                            />
                        )}
                        <DeleteButton
                            cb={deleteAction}
                            id={id}
                            title={`Delete ${fullName}`}
                            simple
                            builtIn={data?.built_in}
                            errorText={`Failed to delete ${fullName}`}
                            questionText={`Are you sure you want to delete ${fullName}?`}
                            successText={`${fullName} deleted successfully`}
                        />
                    </div>
                )}
            </div>
            <div className={styles.cardBody}>
                <div
                    className={`${styles.cardItem} ${styles[dateTimeComparison]}`}
                >
                    <p className={styles.date}>
                        {moment(data?.date).format('dddd')}
                    </p>
                    <p className={styles.date}>
                        {moment(data?.date).format('MMMM Do, YYYY')}
                    </p>
                    <p className={styles.time}>
                        {moment(data?.startTime, 'HH:mm:ss').format('HH:mm')} -
                        {moment(data?.stopTime, 'HH:mm:ss').format('HH:mm')}
                    </p>
                </div>
                <div className={styles.itemsContainer}>
                    <p className={styles.cardItem}>
                        Advisor: {data?.teacherName}
                    </p>
                    <p className={styles.cardItem}>
                        Students: {data?.students?.length}
                    </p>
                </div>
            </div>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
};