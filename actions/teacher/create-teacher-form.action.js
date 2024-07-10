'use server';

import moment from 'moment';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { trimFormDataFields } from '@/utils/functions/trim-form-data-fields';
import { errorObject } from '@/utils/functions/error-object';
import { createTeacher } from '@/actions/teacher/create-teacher.action';
import { createTeacherSchema } from '@/utils/validations/create-teacher-schema';

export const createTeacherFormAction = async (state, formData) => {
    const trimmedData = trimFormDataFields(formData);

    const updatedData = {
        ...trimmedData,
        isAdvisorTeacher: trimmedData.isAdvisorTeacher === 'on' ? true : false,
        lessonsIdList: trimmedData.lessonsIdList
            ? trimmedData.lessonsIdList.split(',')
            : []
    };


    const validationResult = createTeacherSchema.safeParse(updatedData);

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
        birthDay: moment(birthDay).format('YYYY-MM-DD'),
        isAdvisorTeacher: updatedData.isAdvisorTeacher
    };

    let check;

    try {
        const response = await createTeacher(payload);

        const data = await response.json();

        if (!response.ok) {
            errorObject('There was an error creating the teacher!', data);
        }

        check = true;

        return {
            status: 'success',
            message: 'Teacher created successfully!'
        };
    } catch (error) {
        return errorObject('There was an error creating the teacher!');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/teacher');
        redirect('/dashboard/manage/teacher');
    }
};