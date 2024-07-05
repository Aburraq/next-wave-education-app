'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';

/**
 *
 * Get a student by ID as a user with "ADMIN" | "ASSISTANTMANAGER" role
 * @param {string | number} id
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 *
 */

export const getStudentById = async (id) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/students/getStudentById/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok) return errorObject('Failed to get the student by ID');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject('There was an error getting the student by ID');
    }
};