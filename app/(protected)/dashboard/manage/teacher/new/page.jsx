import { getLessonPrograms } from '@/actions/lesson/get-lesson-programs.action';
import { PageTitle } from '@/components/common/page-title';
import { TeacherForm } from '@/components/forms/teacher-form';
import { extractLessonPrograms } from '@/utils/functions/extract-lesson-programs';

export default async function NewTeacherPage() {
    const data = await getLessonPrograms();

    const isDataAvailable =
        data &&
        data.status !== 'error' &&
        Array.isArray(data) &&
        data?.length > 0;

    const processedData = isDataAvailable ? extractLessonPrograms(data) : [];

    return (
        <>
            <PageTitle title="Create New Teacher" />
            <TeacherForm data={processedData} />
        </>
    );
}