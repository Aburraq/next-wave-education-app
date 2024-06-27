'use server';

import { auth } from '@/auth';

/**
 * Get all messages as a user with "ADMIN" | "MANAGER" | "ASSISTANTMANAGER" role
 *
 * @param {number} page
 * @param {number} size
 * @param {string} sort
 * @param {string} type
 * @returns
 *
 */

export const getMessagesByPage = async ({
    page = 0,
    size = 20,
    sort = 'date',
    type = 'desc'
}) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/contactMessages/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok) return errorObject('Failed to get the messages');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject('There was an error getting the messages');
    }
};
