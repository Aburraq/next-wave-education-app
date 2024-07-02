'use server';

import { auth } from '@/auth';

/**
 * Create an admin as a user with "ADMIN" role
 *
 * @param { birthDay: string, birthPlace: string, built_in: boolean, gender: string, name: string, password: string, phoneNumber: string, ssn: string, surname: string, username: string }
 * @returns
 */

export const createAdmin = async (payload) => {
    const session = await auth();

    const response = await fetch(`${process.env.BASE_API_URL}/admin/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(payload)
    });

    return response;
};
