'use server';

import moment from 'moment';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { trimFormDataFields } from '@/utils/functions/trim-form-data-fields';
import { createAdminSchema } from '@/utils/validations/create-admin-schema';
import { errorObject } from '@/utils/functions/error-object';
import { createAssistantManager } from '@/actions/assistant-manager/create-assistant-manager.action';

export const createAssistantManagerFormAction = async (state, formData) => {
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
        const response = await createAssistantManager(payload);

        const data = await response.json();

        if (!response.ok) {
            errorObject(
                'There was an error creating the assistant manager',
                data
            );
        }

        check = true;

        return {
            status: 'success',
            message: 'Assistant manager created successfully!'
        };
    } catch (error) {
        return errorObject('There was an error creating the assistant manager');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/assistant-manager');
        redirect('/dashboard/manage/assistant-manager');
    }
};