'use server';

import { auth } from '@/auth';

/**
 * Update a teacher as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {Object} payload - The payload for creating an admin
 * @param {string} payload.birthDay - The birth date in the format "yyyy-MM-dd"
 * @param {string} payload.birthPlace - The birth place of the user
 * @param {string} payload.email - The email address of the user
 * @param {string} payload.gender - The gender of the user ("MALE" | "FEMALE")
 * @param {boolean} payload.isAdvisorTeacher - Whether the user is an advisor teacher
 * @param {number[]} payload.lessonsIdList - The list of lesson ids
 * @param {string} payload.name - The name of the user
 * @param {string} payload.password - The password for the user
 * @param {string} payload.phoneNumber - The phone number in the format "xxx-xxx-xxxx"
 * @param {string} payload.ssn - The Social Security Number in the format "xxx-xx-xxxx"
 * @param {string} payload.surname - The surname of the user
 * @param {string} payload.username - The username for the user
 *
 * @param {string | number} id - The manager's id
 *
 * @example
 * const payload = {
 *      "birthDay": "yyyy-MM-dd",
 *      "birthPlace": String,
 *      "email": String,
 *      "gender": "MALE" | "FEMALE",
 *      "isAdvisorTeacher": Boolean,
 *      "lessonsIdList": [Number],
 *      "name": String,
 *      "password": String,
 *      "phoneNumber": String,
 *      "ssn": String,
 *      "surname": String,
 *      "username": String
 * }
 * const id = "123" | 123;
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 */

export const updateTeacher = async (payload, id) => {
    const session = await auth();

    const response = await fetch(
        `${process.env.BASE_API_URL}/teachers/update/${id}`,
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