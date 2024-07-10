import { PageTitle } from '@/components/common/page-title';
import { AdminForm } from '@/components/forms/admin-form';

export default function NewMeetingPage() {
    return (
        <>
            <PageTitle title="Create New Meeting" />
            <AdminForm buttonTitle="Manager" type="manager" />
        </>
    );
}