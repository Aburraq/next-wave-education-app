import { PageTitle } from '@/components/common/page-title';
import { AdminForm } from '@/components/forms/admin-form';

export default function NewManagerPage() {
    return (
        <>
            <PageTitle title="Create New Manager" />
            <AdminForm buttonTitle="Manager" type="manager" />
        </>
    );
}