'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';
import { revalidatePath } from 'next/cache';

/**
 * Delete an admin as a user with "ADMIN" role
 *
 * @param {*} id
 * @returns
 */

export const deleteAdmin = async (id) => {
    if (!id) return errorObject('No ID provided');

    const session = await auth();

    let check = false;

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/admin/delete/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok) return errorObject('Failed to delete the admin');

        // following line will throw an error because the response is not JSON
        // const data = await response.json();

        check = true;
        return {
            status: 'success',
            message: 'Admin deleted successfully'
        };
    } catch (error) {
        return errorObject('There was an error deleting the admin');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/admin');
    }
};