'use server';

import { auth } from '@/auth';

/**
 * Get all meetings as a user with "TEACHER" role
 *
 * @param {number} page
 * @param {number} size
 * @param {string} sort
 * @param {string} type
 * @returns
 *
 */

export const getMeetingsByPage = async ({
    page = 0,
    size = 20,
    sort = 'date',
    type = 'desc'
}) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/meet/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok) return errorObject('Failed to get the meetings');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject('There was an error getting the meetings');
    }
};