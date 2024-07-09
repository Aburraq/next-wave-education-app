'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';

/**
 * Get all lessons by page as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {number} page
 * @param {number} size
 * @param {string} sort
 * @param {string} type
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 *
 */

export const getLessonsByPage = async ({
    page = 0,
    size = 6,
    sort = 'lessonName',
    type = 'asc'
}) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/lessons/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok) return errorObject('Failed to get the lessons');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject('There was an error getting the lessons');
    }
};