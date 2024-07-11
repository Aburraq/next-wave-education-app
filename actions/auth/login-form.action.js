'use server';

import { signIn } from '@/auth';
import { DEFAULT_REDIRECT_PATH } from '@/routes';
import { trimFormDataFields } from '@/utils/functions/trim-form-data-fields';
import { loginSchema } from '@/utils/validations/login-schema';
import { AuthError } from 'next-auth';

export const loginFormAction = async (state, formData) => {
    const trimmedData = trimFormDataFields(formData);
    const validationResult = loginSchema.safeParse(trimmedData);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        };
    }

    const { password, username } = validationResult.data;

    try {
        await signIn('credentials', {
            password,
            username,
            redirectTo: DEFAULT_REDIRECT_PATH
        });
    } catch (error) {
        if (error instanceof AuthError) {
            if (
                error.type === 'CredentialsSignIn' ||
                error.type === 'CallbackRouteError'
            ) {
                return {
                    errors: { common: 'Invalid username or password!' }
                };
            } else {
                return {
                    errors: {
                        common: 'An error occurred! Please try again later.'
                    }
                };
            }
        }

        throw error;
    }
};
