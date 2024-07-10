'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';
import { revalidatePath } from 'next/cache';

/**
 * Delete a student information as a user with "TEACHER" role
 *
 * @param {string | number} id
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 *
 */

export const deleteStudentInformation = async (id) => {
    if (!id) return errorObject('No ID provided');

    const session = await auth();

    let check = false;

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/studentInfo/delete/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok)
            return errorObject('Failed to delete the student information');

        // following line will throw an error because the response is not JSON
        // const data = await response.json();

        check = true;
        return {
            status: 'success',
            message: 'Student information deleted successfully'
        };
    } catch (error) {
        return errorObject(
            'There was an error deleting the student information'
        );
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/student-information');
    }
};