import { getEducationTerms } from '@/actions/education-term/get-education-terms.action';
import { getLessons } from '@/actions/lesson/get-lessons.action';
import { getStudentInformationById } from '@/actions/student-information/get-student-information-by-id.action';
import { getStudentsAsAdvisorTeacher } from '@/actions/student/get-students-as-advisor-teacher.action';
import { PageTitle } from '@/components/common/page-title';
import { UpdateStudentInformationForm } from '@/components/forms/update-student-information-form';

export default async function EditStudentInformationPage({ params }) {
    const { slug } = params;

    const [data, studentsData, lessonsData, educationTermsData] =
        await Promise.all([
            getStudentInformationById(slug),
            getStudentsAsAdvisorTeacher(),
            getLessons(),
            getEducationTerms()
        ]);

    return (
        <>
            <PageTitle title={`Update Student Information - ${slug}`} />
            <UpdateStudentInformationForm
                data={data}
                educationTermsData={educationTermsData}
                lessonsData={lessonsData}
                studentsData={studentsData}
            />
        </>
    );
}