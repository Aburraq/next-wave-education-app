import { NoDataAvailable } from '@/components/common/no-data-available';
import { calculateOrderNumber } from '@/utils/functions/calculate-order-number';
import { Pagination } from '@/components/common/pagination';
import { getEducationTermsByPage } from '@/actions/education-term/get-education-terms-by-page.action';
import { EducationTermCard } from '@/components/cards/education-term-card';
import styles from '@/styles/list.module.scss';

export const EducationTermList = async ({ page, size, sort, type }) => {
    const data = await getEducationTermsByPage({
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
                        <EducationTermCard
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
                baseUrl="/dashboard/manage/education-term"
                currentPage={+page}
                size={size}
                totalPages={data.totalPages}
            />
        </div>
    );
};