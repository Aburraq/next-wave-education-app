'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';

/**
 * Get all student informations by page as a user with "TEACHER" role
 *
 * @param {number} page
 * @param {number} size
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 */

export const getStudentInformationByPageAsTeacher = async ({
    page = 0,
    size = 6
}) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/studentInfo/getAllForTeacher?page=${page}&size=${size}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok)
            return errorObject(
                'Failed to get the student information for teacher'
            );

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject(
            'There was an error getting the student information for teacher'
        );
    }
};