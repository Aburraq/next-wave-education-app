'use server';

import { auth } from '@/auth';

/**
 * Create an assistant manager as a user with "ADMIN" | "MANAGER" role
 *
 * @param {Object} payload - The payload for creating an admin manager
 * @param {string} payload.endDate - End date in the format "yyyy-MM-dd"
 * @param {string} payload.lastRegistrationDate - Last registration date in the format "yyyy-MM-dd"
 * @param {boolean} payload.startDate - Start date in the format "yyyy-MM-dd"
 * @param {string} payload.term - The term of the semester ("FALL_SEMESTER" | "SPRING_SEMESTER")
 *
 * @example
 * const payload = {
 *      "endDate": "yyyy-MM-dd",
 *      "lastRegistrationDate": "yyyy-MM-dd",
 *      "startDate": "yyyy-MM-dd",
 *      "term": "FALL_SEMESTER"
 * }
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 */

export const createEducationTerm = async (payload) => {
    const session = await auth();

    const response = await fetch(`${process.env.BASE_API_URL}/educationTerms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(payload)
    });

    return response;
};