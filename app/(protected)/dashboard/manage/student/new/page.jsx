import { getAdvisorTeachers } from '@/actions/advisor-teacher/get-advisor-teachers.action';
import { PageTitle } from '@/components/common/page-title';
import { StudentForm } from '@/components/forms/student-form';

export default async function NewStudentPage() {
    const data = await getAdvisorTeachers();

    const isDataAvailable =
        data &&
        data.status !== 'error' &&
        Array.isArray(data) &&
        data?.length > 0;

    return (
        <>
            <PageTitle title="Create New Student" />
            <StudentForm data={isDataAvailable ? data : null} />
        </>
    );
}