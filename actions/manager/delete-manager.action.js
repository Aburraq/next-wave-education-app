'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';
import { revalidatePath } from 'next/cache';

/**
 * Delete a manager as a user with "ADMIN" role
 *
 * @param {*} id
 * @returns
 */

export const deleteManager = async (id) => {
    if (!id) return errorObject('No ID provided');

    const session = await auth();

    let check = false;

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/dean/delete/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok) return errorObject('Failed to delete the manager');

        // following line will throw an error because the response is not JSON
        // const data = await response.json();

        check = true;
        return {
            status: 'success',
            message: 'Manager deleted successfully'
        };
    } catch (error) {
        return errorObject('There was an error deleting the manager');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/manager');
    }
};