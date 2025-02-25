'use server';

import { auth } from '@/auth';

/**
 * Update an assistant manager as a user with "ADMIN" | "MANAGER" role
 *
 * @param {object} payload
 * { birthDay: string, birthPlace: string, built_in: boolean, gender: string, name: string, password: string, phoneNumber: string, ssn: string, surname: string, username: string }
 * @param {string} id - The assistant manager's id
 *
 * @example
 * const payload = {
 *      "birthDay": "yyyy-MM-dd",
 *      "birthPlace": String,
 *      "gender": "MALE" | "FEMALE",
 *      "name": String,
 *      "password": String,
 *      "phoneNumber": String (format: "xxx-xxx-xxxx"),
 *      "ssn": String (format: "xxx-xx-xxxx"),
 *      "surname": String,
 *      "username": String
 * }
 * @returns {Promise<Response>}
 */

export const updateAssistantManager = async (payload, id) => {
    const session = await auth();

    const response = await fetch(
        `${process.env.BASE_API_URL}/vicedean/update/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.accessToken}`
            },
            body: JSON.stringify(payload)
        }
    );

    return response;
};
