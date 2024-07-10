import { NoDataAvailable } from '@/components/common/no-data-available';
import { getLessonProgramsAsStudent } from '@/actions/student/get-lesson-programs-as-student.action';
import { LessonProgramCard } from '@/components/cards/lesson-program-card';

export const LessonProgramsLoader = async () => {
    const data = await getLessonProgramsAsStudent();
    const isDataAvailable =
        data &&
        data?.status !== 'error' &&
        Array.isArray(data) &&
        data?.length > 0;

    if (!isDataAvailable) return <NoDataAvailable />;

    return data
        .splice(0, 2)
        .map((lessonProgram, index) => (
            <LessonProgramCard key={index} data={lessonProgram} />
        ));
};