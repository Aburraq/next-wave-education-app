'use server';

import moment from 'moment';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { trimFormDataFields } from '@/utils/functions/trim-form-data-fields';
import { errorObject } from '@/utils/functions/error-object';
import { updateStudent } from '@/actions/student/update-student.action';
import { createStudentSchema } from '@/utils/validations/create-student-schema';

export const updateStudentFormAction = async (state, formData) => {
    const trimmedData = trimFormDataFields(formData);
    const { id } = trimmedData;
    const validationResult = createStudentSchema.safeParse(trimmedData);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        };
    }

    // remove the confirmPassword field from the payload
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...rest } = validationResult.data;

    const payload = {
        ...rest,
        birthDay: moment(validationResult.data.birthDay).format('YYYY-MM-DD')
    };

    let check;

    try {
        const response = await updateStudent(payload, id);

        const data = await response.json();

        if (!response.ok) {
            errorObject('There was an error updating the student', data);
        }

        check = true;

        return {
            status: 'success',
            message: 'Student updated successfully!'
        };
    } catch (error) {
        return errorObject('There was an error updating the student');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/student');
        redirect('/dashboard/manage/student');
    }
};