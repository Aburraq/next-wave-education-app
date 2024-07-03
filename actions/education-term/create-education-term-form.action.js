'use server';

import moment from 'moment';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { trimFormDataFields } from '@/utils/functions/trim-form-data-fields';
import { errorObject } from '@/utils/functions/error-object';
import { createEducationTerm } from '@/actions/education-term/create-education-term.action';
import { createEducationTermSchema } from '@/utils/validations/create-education-term-schema';

export const createEducationTermAction = async (state, formData) => {
    const trimmedData = trimFormDataFields(formData);
    const validationResult = createEducationTermSchema.safeParse(trimmedData);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        };
    }

    const payload = {
        endDate: moment(validationResult.data.endDate).format('YYYY-MM-DD'),
        lastRegistrationDate: moment(
            validationResult.data.lastRegistrationDate
        ).format('YYYY-MM-DD'),
        startDate: moment(validationResult.data.startDate).format('YYYY-MM-DD'),
        term: validationResult.data.term
    };

    let check;

    try {
        const response = await createEducationTerm(payload);

        const data = await response.json();

        if (!response.ok) {
            errorObject(
                'There was an error creating the education term!',
                data
            );
        }

        check = true;

        return {
            status: 'success',
            message: 'Education term created successfully!'
        };
    } catch (error) {
        return errorObject('There was an error creating the education term!');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/education-term');
        redirect('/dashboard/manage/education-term');
    }
};