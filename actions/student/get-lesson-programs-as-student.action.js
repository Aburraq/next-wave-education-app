'use server';

import { auth } from '@/auth';
import { errorObject } from '@/utils/functions/error-object';

/**
 * Get all lesson programs as a user with "ADMIN" | "ASSISTANTMANAGER" | "TEACHER" role
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 *
 */

export const getLessonProgramsAsStudent = async () => {
    const session = await auth();

    try {
        const response = await fetch(
            `${process.env.BASE_API_URL}/lessonPrograms/getAllLessonProgramByStudent`,
            {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            }
        );

        if (!response.ok)
            return errorObject('Failed to get the lesson programs for student');

        const data = await response.json();
        return data;
    } catch (error) {
        return errorObject(
            'There was an error getting the lesson programs for student'
        );
    }
};