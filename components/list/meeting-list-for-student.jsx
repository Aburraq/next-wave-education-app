import { NoDataAvailable } from '@/components/common/no-data-available';
import styles from '@/styles/list.module.scss';
import { getMeetingsAsStudent } from '@/actions/student/get-meetings-as-student.action';
import { MeetingCard } from '@/components/cards/meeting-card';

export const MeetingListForStudent = async () => {
    const data = await getMeetingsAsStudent();


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
                        <MeetingCard
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
