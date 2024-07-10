import { NoDataAvailable } from '@/components/common/no-data-available';
import { getMeetingsAsStudent } from '@/actions/student/get-meetings-as-student.action';
import { MeetingCard } from '@/components/cards/meeting-card';

export const MeetingNoticeLoader = async () => {
    const data = await getMeetingsAsStudent();
    console.log(data);
    const isDataAvailable =
        data &&
        data?.status !== 'error' &&
        Array.isArray(data) &&
        data?.length > 0;

    if (!isDataAvailable) return <NoDataAvailable />;

    return data.map((item, index) => <MeetingCard key={index} data={item} />);
};
