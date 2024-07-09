import { NoDataAvailable } from '@/components/common/no-data-available';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';
import { Pagination } from '@/components/common/pagination';
import { getLessonsByPage } from '@/actions/lesson/get-lessons-by-page.action';
import { LessonCard } from '@/components/cards/lesson-card';
import { deleteLesson } from '@/actions/lesson/delete-lesson.action';
import styles from '@/styles/list.module.scss';

export const LessonList = async ({ page, size, sort, type }) => {
    const data = await getLessonsByPage({
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
                        <LessonCard
                            key={index}
                            data={item}
                            deleteAction={deleteLesson}
                            orderNumber={calculateOrderNumber(
                                page,
                                size,
                                index
                            )}
                        />
                    ))
                ) : (
                    <NoDataAvailable />
                )}
            </div>
            <hr className={styles.hr} />
            <Pagination
                baseUrl="/dashboard/manage/lesson"
                currentPage={+page}
                size={size}
                totalPages={data.totalPages}
            />
        </div>
    );
};