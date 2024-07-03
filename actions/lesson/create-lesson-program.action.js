'use server';

import { auth } from '@/auth';

/**
 * Create a lesson program as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {Object} payload - The payload for creating an admin manager
 * @param {string} payload.day - The day of the week ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")
 * @param {string} payload.educationTermId - The ID of the education term
 * @param {boolean} payload.lessonIdList - The list of lesson IDs
 * @param {string} payload.startTime - Start time of the lesson program
 * @param {string} payload.stopTime - End time of the lesson program
 *
 * @example
 * const payload = {
 *      "day": "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY",
 *      "educationTermId": Number,
 *      "lessonIdList": [Number],
 *      "startTime": "HH:mm",
 *      "stopTime": "HH:mm"
 * }
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 */

export const createLessonProgram = async (payload) => {
    const session = await auth();

    const response = await fetch(
        `${process.env.BASE_API_URL}/lessonPrograms/save`,
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