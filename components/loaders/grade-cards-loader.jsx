import { getStudentInformationAsStudent } from '@/actions/student/get-student-information-as-student.action';
import { NoDataAvailable } from '@/components/common/no-data-available';
import { GradeCard } from '@/components/cards/grade-card';

export const GradeCardsLoader = async () => {
    const data = await getStudentInformationAsStudent(0, 2);
    const isDataAvailable =
        data && data?.status !== 'error' && data?.content?.length > 0;

    if (!isDataAvailable) return <NoDataAvailable />;

    return data?.content.map((item, index) => (
        <GradeCard key={index} data={item} />
    ));
};