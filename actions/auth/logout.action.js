'use server';

import { signOut } from '@/auth';

export const logout = async () => {
    try {
        await signOut({ redirect: '/login' });
    } catch (error) {
        throw error;
    }
};