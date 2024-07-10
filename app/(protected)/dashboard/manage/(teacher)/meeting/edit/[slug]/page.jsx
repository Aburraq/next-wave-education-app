import { getManagerById } from '@/actions/manager/get-manager-by-id.action';
import { PageTitle } from '@/components/common/page-title';
import { UpdateManagerForm } from '@/components/forms/update-manager-form';

export default async function EditManagerPage({ params }) {
    const { slug } = params;

    const data = await getManagerById(slug);
    return (
        <>
            <PageTitle title={`Update Manager - ${slug}`} />
            <UpdateManagerForm data={data} slug={slug} />
        </>
    );
}