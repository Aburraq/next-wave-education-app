import { getMeetingById } from '@/actions/meeting/get-meeting-by-id.action';
import { getStudentsAsAdvisorTeacher } from '@/actions/student/get-students-as-advisor-teacher.action';
import { PageTitle } from '@/components/common/page-title';
import { UpdateMeetingForm } from '@/components/forms/update-meeting-form';

export default async function EditMeetingPage({ params }) {
    const { slug } = params;

    const [data, studentsData] = await Promise.all([
        getMeetingById(slug),
        getStudentsAsAdvisorTeacher()
    ]);

    return (
        <>
            <PageTitle title={`Update Meeting - ${slug}`} />
            <UpdateMeetingForm
                data={data}
                slug={slug}
                studentsData={studentsData}
            />
        </>
    );
}