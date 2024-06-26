'use server';

/**
 * Get user information
 * @param {string} JWT - JSON Web Token
 * @returns {Promise<Object>} - User information
 */

export const getUser = async (JWT) => {
    try {
        const response = await fetch(`${process.env.BASE_API_URL}/user/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: JWT
            }
        });

        if (!response.ok) return null;

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};