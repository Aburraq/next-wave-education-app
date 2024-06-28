'use server';

import { auth } from '@/auth';

/**
 * Get all student informations by page as a user with "ADMIN" role
 *
 * @param {number} page
 * @param {number} size
 *
 * @returns
 *
 */

export const getStudentInformationByPageAsAdmin = async ({
    page = 0,
    size = 20
}) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/studentInfo/getAllForAdmin?page=${page}&size=${size}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok)
            return errorObject('Failed to get the student information');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject(
            'There was an error getting the student information'
        );
    }
};