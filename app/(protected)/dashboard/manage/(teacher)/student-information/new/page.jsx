import { getEducationTerms } from '@/actions/education-term/get-education-terms.action';
import { getLessons } from '@/actions/lesson/get-lessons.action';
import { getStudentsAsAdvisorTeacher } from '@/actions/student/get-students-as-advisor-teacher.action';
import { PageTitle } from '@/components/common/page-title';
import { StudentInformationForm } from '@/components/forms/student-information-form';

export default async function NewStudentInformationPage() {
    const [studentsData, lessonsData, educationTermsData] = await Promise.all([
        getStudentsAsAdvisorTeacher(),
        getLessons(),
        getEducationTerms()
    ]);

    // fetch1 => 5s
    // fetch2 => 3s
    // fetch3 => 10s
    // const firstData = await fetch1();
    // const secondData = await fetch2();
    // const thirdData = await fetch3();
    // this will take 18s to complete

    // const [firstData, secondData, thirdData] = await Promise.all([fetch1(), fetch2(), fetch3()]);
    // this will take 10s to complete, that's why i used it.

    return (
        <>
            <PageTitle title="Create New Student Information" />
            <StudentInformationForm
                educationTermsData={educationTermsData}
                lessonsData={lessonsData}
                studentsData={studentsData}
            />
        </>
    );
}