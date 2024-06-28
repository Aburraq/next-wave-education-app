import { swalToast } from '@/utils/functions/swal/swal-toast';

export const handleDelete = ({
    cb,
    id,
    questionText = 'Are you sure you want to delete this data',
    successText = 'You have deleted the data successfully',
    errorText = 'Failed to delete the data'
}) => {
    try {
        swalToast({
            title: questionText,
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        }).then(async (response) => {
            if (!response.isConfirmed) return;
            const res = await cb(id);
            if (res.status === 'error') {
                return swalToast({
                    icon: 'error',
                    title: errorText
                });
            }
            swalToast({
                title: successText
            });
        });
    } catch (error) {
        swalToast({
            icon: 'error',
            title: errorText
        });
    }
};