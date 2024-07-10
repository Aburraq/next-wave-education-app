'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';

/**
 * Get all meetings as a user with "STUDENT" role
 * @returns {PromiseResponse} A promise that resolves to the Response object from the fetch API call.
 *
 */

export const getMeetingsAsStudent = async () => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/meet/getAllMeetByStudent`,
            {
                headers: {
                    Authorization: `Bearer: ${session?.accessToken}`
                }
            }
        );

        if (!response.ok) {
            return errorObject('Failed to get the meetings for student');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject(
            'There was an error getting the meetings for student'
        );
    }
};
