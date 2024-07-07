'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';

/**
 *
 * Get a teacher by ID as a user with "ADMIN" | "ASSISTANTMANAGER" role
 * @param {string | number} id
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 *
 */

export const getTeacherById = async (id) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/teachers/getSavedTeacherById/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok) return errorObject('Failed to get the teacher by ID');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject('There was an error getting the teacher by ID');
    }
};