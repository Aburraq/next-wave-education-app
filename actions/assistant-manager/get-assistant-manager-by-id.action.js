'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';

/**
 * Get an assistant manager by ID as a user with "ADMIN" | "MANAGER" role
 * @param {string | number} id
 * @returns
 */

export const getAssistantManagerById = async (id) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/vicedean/getViceDeanById/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok)
            return errorObject('Failed to get the assistant manager');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject('There was an error getting the assistant manager');
    }
};