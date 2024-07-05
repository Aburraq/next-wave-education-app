import { getAssistantManagerById } from '@/actions/assistant-manager/get-assistant-manager-by-id.action';
import { PageTitle } from '@/components/common/page-title';
import { UpdateManagerForm } from '@/components/forms/update-manager-form';
import { UpdateStudentForm } from '@/components/forms/update-student-form';

export default async function EditAssistantManagerPage({ params }) {
    const { slug } = params;

    const data = await getAssistantManagerById(slug);
    return (
        <>
            <PageTitle title={`Update Assistant Manager - ${slug}`} />
            <UpdateStudentForm
                data={data}
                slug={slug}
                type="assistant-manager"
            />
        </>
    );
}