import { getLessons } from '@/actions/lesson/get-lessons.action';
import { BarChart } from '@/components/charts/bar-chart';
import { NoDataAvailable } from '@/components/common/no-data-available';

export const CreditScoreLoader = async () => {
    const data = await getLessons();
    const isDataAvailable = data && data.status !== 'error' && data.length > 0;

    if (!isDataAvailable) return <NoDataAvailable />;

    return (
        <BarChart
            backgroundColor="#ff9393"
            data={data?.map((item) => item?.creditScore)}
            label="Credit Score"
            labels={data?.map((item) => item?.lessonName)}
        />
    );
};