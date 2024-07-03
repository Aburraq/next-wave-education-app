'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';

/**
 * Get all education terms as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 *
 */

export const getEducationTerms = async () => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/educationTerms/getAll`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok)
            return errorObject('Failed to get the education terms');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject('There was an error getting the education terms');
    }
};