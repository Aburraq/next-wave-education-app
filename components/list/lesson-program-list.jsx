import { NoDataAvailable } from '@/components/common/no-data-available';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';
import { Pagination } from '@/components/common/pagination';
import { LessonProgramCard } from '@/components/cards/lesson-program-card';
import { getLessonProgramsByPage } from '@/actions/lesson/get-lesson-programs-by-page.action';
import styles from '@/styles/list.module.scss';

export const LessonProgramList = async ({ page, size, sort, type }) => {
    const data = await getLessonProgramsByPage({
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
                        <LessonProgramCard
                            key={index}
                            data={item}
                            authorized={true}
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
                baseUrl="/dashboard/manage/lesson-program"
                currentPage={+page}
                size={size}
                totalPages={data.totalPages}
            />
        </div>
    );
};