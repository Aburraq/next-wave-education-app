'use server';

import { auth } from '@/auth';

/**
 * Create a manager as a user with "ADMIN" role
 *
 * @param
 * { birthDay: string, birthPlace: string, built_in: boolean, gender: string, name: string, password: string, phoneNumber: string, ssn: string, surname: string, username: string }
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

export const createManager = async (payload) => {
    const session = await auth();

    const response = await fetch(`${process.env.BASE_API_URL}/dean/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(payload)
    });

    return response;
};
