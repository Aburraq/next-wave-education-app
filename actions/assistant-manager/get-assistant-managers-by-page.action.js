'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';

/**
 * Get all assistant managers by page as a user with "ADMIN" | "MANAGER" role
 *
 * @param {number} page
 * @param {number} size
 * @param {string} sort
 * @param {string} type
 * @returns
 *
 */

export const getAssistantManagersByPage = async ({
    page = 0,
    size = 6,
    sort = 'name',
    type = 'desc'
}) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/vicedean/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok)
            return errorObject('Failed to get the assistant managers');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject('There was an error getting the assistant managers');
    }
};