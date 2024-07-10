import { compareDateWithToday } from '@/utils/functions/compare-date-with-today';
import moment from 'moment';
import styles from '@/styles/components/cards/meeting-card-for-student.module.scss';

export const MeetingCardForStudent = ({ data, orderNumber }) => {
    const dateTimeComparison = compareDateWithToday(data?.date);

    return (
        <div className={styles.cardContainer}>
            <h3 className={styles.cardHeader}>{data?.description}</h3>
            <div className={styles.cardBody}>
                <div
                    className={`${styles.cardItem} ${styles[dateTimeComparison]}`}
                >
                    <p className={styles.date}>
                        {moment(data?.date).format('dddd, MMMM Do, YYYY')}
                    </p>
                    <p className={styles.time}>
                        {moment(data?.startTime, 'HH:mm:ss').format('HH:mm')}
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