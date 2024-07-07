import { getLessonPrograms } from '@/actions/lesson/get-lesson-programs.action';
import { getTeacherById } from '@/actions/teacher/get-teacher-by-id.action';
import { PageTitle } from '@/components/common/page-title';
import { UpdateTeacherForm } from '@/components/forms/update-teacher-form';
import { extractLessonPrograms } from '@/utils/functions/extract-lesson-programs';

export default async function EditTeacherPage({ params }) {
    const { slug } = params;

    const [teacherData, lessonProgramsData] = await Promise.all([
        getTeacherById(slug),
        getLessonPrograms()
    ]);

    const processedLessonProgramsData =
        extractLessonPrograms(lessonProgramsData);

    return (
        <>
            <PageTitle title={`Update Teacher - ${slug}`} />
            <UpdateTeacherForm
                data={teacherData}
                lessonProgramsData={processedLessonProgramsData}
                slug={slug}
            />
        </>
    );
}