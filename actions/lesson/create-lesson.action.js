'use server';

import { auth } from '@/auth';

/**
 * Create an assistant manager as a user with "ADMIN" | "MANAGER" role
 *
 * @param {Object} payload - The payload for creating an admin manager
 * @param {boolean} payload.compulsory - The compulsory status of the lesson (true | false)
 * @param {number} payload.creditScore - The credit score of the lesson
 * @param {string} payload.lessonName - The name of the lesson
 *
 * @example
 * const payload = {
 *          "compulsory": true | false,
 *          "creditScore": number,
 *          "lessonName": string
 * }
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 */

export const createLesson = async (payload) => {
    const session = await auth();

    const response = await fetch(`${process.env.BASE_API_URL}/lessons/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(payload)
    });

    return response;
};