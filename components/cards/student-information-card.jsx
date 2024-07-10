import { DeleteButton } from '@/components/common/delete-button';
import { EditButton } from '@/components/common/edit-button';
import { isPassingNumberGrade } from '@/utils/functions/is-passing-number-grade';
import { isPassingLetterGrade } from '@/utils/functions/is-passing-letter-grade';
import styles from '@/styles/components/cards/student-information-card.module.scss';
import moment from 'moment';

export const StudentInformationCard = ({
    data,
    deleteAction,
    isAuthorized,
    orderNumber,
    type
}) => {
    const dataToMap = [
        {
            label: 'Midterm Exam:',
            style: isPassingNumberGrade(data?.midtermExam)
                ? styles.success
                : styles.danger,
            value: data?.midtermExam
        },
        {
            label: 'Final Exam:',
            style: isPassingNumberGrade(data?.finalExam)
                ? styles.success
                : styles.danger,
            value: data?.finalExam
        },
        {
            label: 'Average:',
            style: isPassingNumberGrade(data?.average)
                ? styles.success
                : styles.danger,
            value: data?.average ? data?.average.toFixed(1) : 'N/A'
        },
        {
            label: 'Absentee:',
            style: styles.danger,
            value: data?.absentee
        },
        {
            label: 'Letter Grade:',
            style: isPassingLetterGrade(data?.note)
                ? styles.success
                : styles.danger,
            value: data?.note
        },
        {
            label: 'Info Note:',
            style: '',
            value: data?.infoNote
        },
        {
            label: 'Lesson:',
            style: styles.lessonName,
            value: data?.lessonName
        },
        {
            label: 'Birth Date:',
            style: '',
            value:
                data?.studentResponse?.birthDay &&
                moment(data?.studentResponse?.birthDay).format('LL')
        },
        {
            label: 'Contact:',
            style: '',
            value: data?.studentResponse?.phoneNumber
        },
        {
            label: 'Email:',
            style: styles.email,
            value: data?.studentResponse?.email
        }
    ];

    const id = data?.id || data?.userId;

    const fullName = `${data?.studentResponse?.name} ${data?.studentResponse?.surname}`;

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardHeader}>{fullName}</h3>
                {isAuthorized && (
                    <div className={styles.buttonsContainer}>
                        <EditButton
                            title={`Edit ${fullName}`}
                            href={`/dashboard/manage/${type}/edit/${id}`}
                        />
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
            <ul className={styles.cardBody}>
                {dataToMap.map((item, index) => (
                    <li
                        key={index}
                        className={`${styles.cardItem} ${item.style}`}
                    >
                        <span>{item.label}</span>
                        <span>{item.value}</span>
                    </li>
                ))}
            </ul>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
};