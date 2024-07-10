import { getStudentsAsAdvisorTeacher } from '@/actions/student/get-students-as-advisor-teacher.action';
import { PageTitle } from '@/components/common/page-title';
import { MeetingForm } from '@/components/forms/meeting-form';

export default async function NewMeetingPage() {

    const data = await getStudentsAsAdvisorTeacher();

    return (
        <>
            <PageTitle title="Create New Meeting" />
            <MeetingForm data={data} />
        </>
    );
}