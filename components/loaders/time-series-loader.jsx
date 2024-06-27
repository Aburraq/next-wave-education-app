import { getMeetingsByPage } from '@/actions/meeting/get-meetings-by-page.action';
import { getMessagesByPage } from '@/actions/message/get-messages-by-page.action';
import { NoDataAvailable } from '@/components/common/no-data-available';
import { LineChart } from '@/components/charts/line-chart';
import { aggregateMessagesByDate } from '@/utils/functions/aggregate-messages-by-date';

export const TimeSeriesLoader = async ({ role }) => {
    const data =
        role === 'TEACHER'
            ? await getMeetingsByPage({ page: 0, size: 1000 })
            : await getMessagesByPage({ page: 0, size: 1000 });

    const isDataAvailable =
        data &&
        data.status !== 'error' &&
        Array.isArray(data?.content) &&
        data?.content?.length > 0;

    if (!isDataAvailable) return <NoDataAvailable />;

    const aggregatedData = aggregateMessagesByDate(data?.content);

    return (
        <LineChart
            borderColor="#00bcd4"
            label={`Number of ${role === 'TEACHER' ? 'Meetings' : 'Messages'}`}
            labels={aggregatedData.map((item) => item[0])}
            data={aggregatedData.map((item) => item[1])}
        />
    );
};