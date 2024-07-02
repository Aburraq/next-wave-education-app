import { compareDateWithToday } from '@/utils/functions/compare-date-with-today';
import { DeleteButton } from '@/components/common/delete-button';
import { deleteEducationTerm } from '@/actions/education-term/delete-education-term.action';
import moment from 'moment';
import styles from '@/styles/components/dashboard/cards/education-term-card.module.scss';

export const EducationTermCard = ({ authorized, data, orderNumber }) => {
    const dateTimeComparison = compareDateWithToday(data.lastRegistrationDate);
    const educationTermName = `${data?.term} - ${data?.id}`;

    return (
        <div
            className={`${styles.cardContainer} ${styles[dateTimeComparison]}`}
        >
            {authorized && (
                <div className={styles.deleteContainer}>
                    <DeleteButton
                        cb={deleteEducationTerm}
                        id={data?.id}
                        title={`Delete ${educationTermName}`}
                        errorText={`Failed to delete ${educationTermName}`}
                        questionText={`Are you sure you want to delete ${educationTermName}?`}
                        successText={`${educationTermName} deleted successfully`}
                    />
                </div>
            )}
            <h2 className={styles.term}>{educationTermName}</h2>
            <p className={styles.item}>
                Start Date: {moment(data?.startDate).format('LL')}
            </p>
            <p className={styles.item}>
                End Date: {moment(data?.endDate).format('LL')}
            </p>
            <p className={styles.item}>
                <span>Last Registration Date:</span>
                <span>{moment(data?.lastRegistrationDate).format('LL')}</span>
            </p>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
};