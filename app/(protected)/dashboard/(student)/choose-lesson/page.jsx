import { getLessonPrograms } from '@/actions/lesson/get-lesson-programs.action';
import { NoDataAvailable } from '@/components/common/no-data-available';
import { PageTitle } from '@/components/common/page-title';
import { ChooseLessonForm } from '@/components/forms/choose-lesson-form';
import styles from '@/styles/page.module.scss';

export default async function ChooseLessonPage() {
    const data = await getLessonPrograms();

    const isDataAvailable =
        data &&
        data?.status !== 'error' &&
        Array.isArray(data) &&
        data?.length > 0;

    return (
        <>
            <PageTitle title="Choose Lessons" />
            <div className={styles.container}>
                {isDataAvailable ? (
                    <ChooseLessonForm data={data} />
                ) : (
                    <NoDataAvailable />
                )}
            </div>
        </>
    );
}