'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';

/**
 * Get all lesson programs by page as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {number} page
 * @param {number} size
 * @param {string} sort
 * @param {string} type
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 *
 */

export const getLessonProgramsByPage = async ({
    page = 0,
    size = 6,
    sort = 'day',
    type = 'asc'
}) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/lessonPrograms/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok)
            return errorObject('Failed to get the lesson programs');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject('There was an error getting the lesson programs');
    }
};