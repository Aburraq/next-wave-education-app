import { isPassingNumberGrade } from '@/utils/functions/is-passing-number-grade';
import { isPassingLetterGrade } from '@/utils/functions/is-passing-letter-grade';
import styles from '@/styles/components/cards/grade-card.module.scss';

export const GradeCard = ({ data }) => {
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
            label: "Teacher's Note:",
            style: '',
            value: data?.infoNote
        },
        {
            label: 'Lesson Type:',
            style: data?.compulsory ? styles.danger : styles.success,
            value: data?.compulsory ? 'Compulsory' : 'Elective'
        }
    ];

    return (
        <div className={styles.cardContainer}>
            <h3 className={styles.cardHeader}>{data?.lessonName}</h3>
            <div className={styles.cardBody}>
                {dataToMap.slice(0, 4).map((item, index) => (
                    <div key={index} className={`${styles.info} ${item.style}`}>
                        <span className={styles.label}>{item.label}</span>
                        <span className={item.style}>{item.value}</span>
                    </div>
                ))}
                {dataToMap.slice(4).map((item, index) => (
                    <div
                        key={index}
                        className={`${styles.cardItem} ${item.style}`}
                    >
                        <span className={styles.noteTitle}>{item.label}</span>
                        <span>
                            {item.value ? item.value : 'No Data Available'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};