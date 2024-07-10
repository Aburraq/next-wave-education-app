'use server';

import { auth } from '@/auth';

/**
 * Create a meeting as a user with "TEACHER" role, and user must be advisor teacher
 *
 * @param {Object} payload - The payload for creating an admin
 * @param {string} payload.date - The date of the meeting
 * @param {string} payload.description - The description of the meeting
 * @param {string} payload.startTime - The start time of the meeting
 * @param {string} payload.stopTime - The stop time of the meeting
 * @param {number[]} payload.studentIds - The IDs of the students attending the meeting
 *
 * @example
 * const payload = {
 *      "date": "yyyy-MM-dd",
 *      "description": "string",
 *      "startTime": "HH:mm",
 *      "stopTime": "HH:mm",
 *      "studentIds": [0]
 * }
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 */

export const createMeeting = async (payload) => {
    const session = await auth();

    const response = await fetch(`${process.env.BASE_API_URL}/meet/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(payload)
    });

    return response;
};