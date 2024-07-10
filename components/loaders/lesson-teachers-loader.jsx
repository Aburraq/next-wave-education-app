import { NoDataAvailable } from '@/components/common/no-data-available';
import { getLessonProgramsAsStudent } from '@/actions/student/get-lesson-programs-as-student.action';
import { convertDataIntoTeachers } from '@/utils/functions/convert-data-into-teachers';
import { Avatar } from '@/components/common/avatar';

export const LessonTeachersLoader = async () => {
    const data = await getLessonProgramsAsStudent();
    const isDataAvailable =
        data &&
        data?.status !== 'error' &&
        Array.isArray(data) &&
        data?.length > 0;

    if (!isDataAvailable) return <NoDataAvailable />;

    const processedData = convertDataIntoTeachers(data);

    return processedData
        .splice(0, 3)
        .map((teacher, index) => (
            <Avatar
                key={index}
                height={125}
                width={125}
                src={teacher.profilePicture}
                title={`${teacher.name} ${teacher.surname}`}
                rounded
            />
        ));
};