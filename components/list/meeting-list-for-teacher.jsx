import { NoDataAvailable } from '@/components/common/no-data-available';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';
import { Pagination } from '@/components/common/pagination';
import { getMeetingsByPage } from '@/actions/meeting/get-meetings-by-page.action';
import { MeetingCard } from '@/components/cards/meeting-card';
import { deleteMeeting } from '@/actions/meeting/delete-meeting.action';
import styles from '@/styles/list.module.scss';

export const MeetingListForTeacher = async ({ page, size, sort, type }) => {
    const data = await getMeetingsByPage({
        page: page - 1,
        size,
        sort,
        type
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
                    data.content.map((item, index) => (
                        <MeetingCard
                            key={index}
                            data={item}
                            deleteAction={deleteMeeting}
                            isAuthorized
                            isEditButton
                            orderNumber={calculateOrderNumber(
                                page,
                                size,
                                index
                            )}
                            type="teacher"
                        />
                    ))
                ) : (
                    <NoDataAvailable />
                )}
            </div>
            <hr className={styles.hr} />
            <Pagination
                baseUrl="/dashboard/manage/manager"
                currentPage={+page}
                size={size}
                totalPages={data.totalPages}
            />
        </div>
    );
};