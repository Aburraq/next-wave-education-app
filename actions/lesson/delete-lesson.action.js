'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';
import { revalidatePath } from 'next/cache';

/**
 * Delete a lesson as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {string | number} id
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 *
 */

export const deleteLesson = async (id) => {
    if (!id) return errorObject('No ID provided');

    const session = await auth();

    let check = false;

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/lessons/delete/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok) return errorObject('Failed to delete the lesson');

        // following line will throw an error because the response is not JSON
        // const data = await response.json();

        check = true;
        return {
            status: 'success',
            message: 'Lesson deleted successfully'
        };
    } catch (error) {
        return errorObject('There was an error deleting the lesson');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/lesson');
    }
};