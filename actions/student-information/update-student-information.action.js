'use server';

import { auth } from '@/auth';

/**
 * Update a student information as a user with "TEACHER" role
 *
 * @param {Object} payload - The payload for creating an admin
 * @param {Number} payload.absentee - The absentee of the student
 * @param {Number} payload.educationTermId - The education term id of the student
 * @param {Number} payload.finalExam - The final exam of the student
 * @param {String} payload.infoNote - The info note of the student
 * @param {Number} payload.lessonId - The lesson id of the student
 * @param {Number} payload.midtermExam - The midterm exam of the student
 * @param {Number} payload.studentId - The student id of the student
 * @param {Number} id - The id of the student information
 *
 * @example
 * const payload = {
 *      "absentee": Number,
 *      "educationTermId": Number,
 *      "finalExam": Number,
 *      "infoNote": String,
 *      "lessonId": Number,
 *      "midtermExam": Number,
 *      "studentId": Number
 * }
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 */
export const updateStudentInformation = async (payload, id) => {
    const session = await auth();

    const response = await fetch(
        `${process.env.BASE_API_URL}/studentInfo/update/${id}`,
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