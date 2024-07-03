import { PageTitle } from '@/components/common/page-title';
import { EducationTermForm } from '@/components/forms/education-term-from';

export default function NewEducationTermPage() {
    return (
        <>
            <PageTitle title="Create New Education Term" />
            <EducationTermForm />
        </>
    );
}