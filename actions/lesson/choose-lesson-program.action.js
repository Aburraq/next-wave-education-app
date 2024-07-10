'use server';

import { auth } from '@/auth';

/**
 * Choose a lesson program as a user with "STUDENT" role
 *
 * @param {Object} payload - The payload for creating an admin manager
 * @param {string[] | number[]} payload.lessonProgramId - The lesson program ID array
 *
 * @example
 * {
 *  "lessonProgramId": [ 0 ]
 * }
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 */

export const chooseLessonProgram = async (payload) => {
    const session = await auth();

    const response = await fetch(
        `${process.env.BASE_API_URL}/students/chooseLesson`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify(payload)
        }
    );

    return response;
};