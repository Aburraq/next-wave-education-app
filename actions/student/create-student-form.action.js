'use server';

import moment from 'moment';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { trimFormDataFields } from '@/utils/functions/trim-form-data-fields';
import { errorObject } from '@/utils/functions/error-object';
import { createStudentSchema } from '@/utils/validations/create-student-schema';
import { createStudent } from '@/actions/student/create-student.action';

export const createStudentFormAction = async (state, formData) => {
    const trimmedData = trimFormDataFields(formData);
    const validationResult = createStudentSchema.safeParse(trimmedData);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        };
    }

    // remove the confirmPassword field from the payload
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, birthDay, ...rest } = validationResult.data;

    const payload = {
        ...rest,
        birthDay: moment(birthDay).format('YYYY-MM-DD')
    };

    let check;

    try {
        const response = await createStudent(payload);

        const data = await response.json();

        if (!response.ok) {
            errorObject('There was an error creating the student!', data);
        }

        check = true;

        return {
            status: 'success',
            message: 'Student created successfully!'
        };
    } catch (error) {
        return errorObject('There was an error creating the student!');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/student');
        redirect('/dashboard/manage/student');
    }
};