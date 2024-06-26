import { getLessons } from '@/actions/lesson/get-lessons.action';
import { BarChart } from '@/components/charts/bar-chart';

export const CreditScoreLoader = async () => {
    const data = await getLessons();

    const isDataAvailable = data && data.status !== 'error';

    if (!isDataAvailable) return <>No Data Available</>;

    return (
        <BarChart
            backgroundColor="#ff9393"
            data={data?.map((item) => item?.creditScore)}
        />
    );
};
