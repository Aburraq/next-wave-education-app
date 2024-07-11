'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';

/**
 * Get all advisor teachers as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 *
 */

export const getAdvisorTeachers = async () => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/advisorTeacher/getAll`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok)
            return errorObject('Failed to get the advisor teachers');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject('There was an error getting the advisor teachers');
    }
};
