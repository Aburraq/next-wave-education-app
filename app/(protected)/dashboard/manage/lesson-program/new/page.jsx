import { getEducationTerms } from '@/actions/education-term/get-education-terms.action';
import { getLessons } from '@/actions/lesson/get-lessons.action';
import { PageTitle } from '@/components/common/page-title';
import { LessonProgramForm } from '@/components/forms/lesson-program-form';

export default async function NewEducationTermPage() {
    
    const [educationTermsData, lessonsData] = await Promise.all([
        getEducationTerms(),
        getLessons()
    ]);

    return (
        <>
            <PageTitle title="Create New Education Term" />
            <LessonProgramForm
                educationTermsData={educationTermsData}
                lessonsData={lessonsData}
            />
        </>
    );
}