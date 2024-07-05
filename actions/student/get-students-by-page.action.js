'use server';

import { auth } from '@/auth';

/**
 * Get all students as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {number} page
 * @param {number} size
 * @param {string} sort
 * @param {string} type
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 */

export const getStudentsByPage = async ({
    page = 0,
    size = 20,
    sort = 'name',
    type = 'desc'
}) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/students/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok) return errorObject('Failed to get the students');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject('There was an error getting the students');
    }
};