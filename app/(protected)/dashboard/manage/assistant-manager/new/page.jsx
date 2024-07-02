import { PageTitle } from '@/components/common/page-title';
import { AdminForm } from '@/components/forms/admin-form';

export default function NewAssistantManagerPage() {
    return (
        <>
            <PageTitle title="Create New Assistant Manager" />
            <AdminForm
                buttonTitle="Assistant Manager"
                type="assistant-manager"
            />
        </>
    );
}