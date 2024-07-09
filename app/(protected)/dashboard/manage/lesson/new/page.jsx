import { PageTitle } from '@/components/common/page-title';
import { LessonForm } from '@/components/forms/lesson-form';

export default async function NewLessonPage() {
    return (
        <>
            <PageTitle title="Create New Lesson" />
            <LessonForm />
        </>
    );
}