'use server';

/**
 * Get the token by sending the payload to the server
 * @param {object} payload
 * @returns {object} user
 * @example
 * const payload = {
 *      username: String,
 *      password: String,
 * }
 */

export const login = async (payload) => {
    try {
        const response = await fetch(`${process.env.BASE_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) return null;

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};