'use server';

import { auth } from '@/auth';

/**
 * Create a student as a user with "ADMIN" | "ASSISTANTMANAGER" role
 *
 * @param {Object} payload - The payload for creating an admin
 * @param {string} payload.advisorTeacherId - The ID of the advisor teacher
 * @param {string} payload.birthDay - The birth date in the format "yyyy-MM-dd"
 * @param {string} payload.birthPlace - The birth place of the user
 * @param {string} payload.email - The email address of the user
 * @param {string} payload.fatherName - The father's name of the user
 * @param {string} payload.gender - The gender of the user ("MALE" | "FEMALE")
 * @param {string} payload.motherName - The mother's name of the user
 * @param {string} payload.name - The name of the user
 * @param {string} payload.password - The password for the user
 * @param {string} payload.phoneNumber - The phone number in the format "xxx-xxx-xxxx"
 * @param {string} payload.ssn - The Social Security Number in the format "xxx-xx-xxxx"
 * @param {string} payload.surname - The surname of the user
 * @param {string} payload.username - The username for the user
 *
 * @example
 * const payload = {
 *      "advisorTeacherId": Number,
 *      "birthDay": "yyyy-MM-dd",
 *      "birthPlace": String,
 *      "email": String,
 *      "fatherName": String,
 *      "gender": "MALE" | "FEMALE",
 *      "motherName": String,
 *      "name": String,
 *      "password": String,
 *      "phoneNumber": String,
 *      "ssn": String,
 *      "surname": String,
 *      "username": String
 * }
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 */
export const createStudent = async (payload) => {
    const session = await auth();

    const response = await fetch(`${process.env.BASE_API_URL}/students/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(payload)
    });

    return response;
};