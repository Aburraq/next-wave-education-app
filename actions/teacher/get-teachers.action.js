'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';

/**
 * Get all teachers as a user with "ADMIN" | "ASSISTANTMANAGER" | "TEACHER" role
 *
 * @returns
 */

export const getTeachers = async () => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/teachers/getAll`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok) return errorObject('Failed to get the teachers');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject('There was an error getting the teachers');
    }
};