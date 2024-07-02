'use server';

import moment from 'moment';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { trimFormDataFields } from '@/utils/functions/trim-form-data-fields';
import { createAdminSchema } from '@/utils/validations/create-admin-schema';
import { createAdmin } from '@/actions/admin/create-admin.action';
import { errorObject } from '@/utils/functions/error-object';

export const createAdminFormAction = async (state, formData) => {
    const trimmedData = trimFormDataFields(formData);
    const validationResult = createAdminSchema.safeParse(trimmedData);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        };
    }

    const payload = {
        ...validationResult.data,
        birthDay: moment(validationResult.data.birthDay).format('YYYY-MM-DD')
    };

    let check;

    try {
        const response = await createAdmin(payload);

        const data = await response.json();

        if (!response.ok) {
            errorObject('There was an error creating the admin', data);
        }

        check = true;

        return {
            status: 'success',
            message: 'Admin created successfully!'
        };
    } catch (error) {
        return errorObject('There was an error creating the admin');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/admin');
        redirect('/dashboard/manage/admin');
    }
};