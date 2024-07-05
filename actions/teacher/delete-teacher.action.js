'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';
import { revalidatePath } from 'next/cache';

/**
 * Delete a teacher as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {string | number} id
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 *
 */

export const deleteTeacher = async (id) => {
    if (!id) return errorObject('No ID provided');

    const session = await auth();

    let check = false;

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/teachers/delete/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok) return errorObject('Failed to delete the teacher');

        // following line will throw an error because the response is not JSON
        // const data = await response.json();

        check = true;
        return {
            status: 'success',
            message: 'Teacher deleted successfully'
        };
    } catch (error) {
        return errorObject('There was an error deleting the teacher');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/teacher');
    }
};