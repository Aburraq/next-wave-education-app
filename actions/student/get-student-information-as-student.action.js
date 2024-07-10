'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';

/**
 *
 * Get the student information as a user with "STUDENT" role
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 *
 */

export const getStudentInformationAsStudent = async ({
    page = 0,
    size = 6
}) => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/studentInfo/getAllByStudent?page=${page}&size=${size}`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok)
            return errorObject(
                'Failed to get the the student information for student'
            );

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject(
            'There was an error getting the the student information for student'
        );
    }
};