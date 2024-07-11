'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { trimFormDataFields } from '@/utils/functions/trim-form-data-fields';
import { errorObject } from '@/utils/functions/error-object';
import { createStudentInformation } from '@/actions/student-information/create-student-information.action';
import { createStudentInformationSchema } from '@/utils/validations/create-student-information-schema';

export const createStudentInformationFormAction = async (state, formData) => {
    const trimmedData = trimFormDataFields(formData);

    const dataToValidate = {
        ...trimmedData,
        absentee: +trimmedData.absentee,
        finalExam: +trimmedData.finalExam,
        midtermExam: +trimmedData.midtermExam
    };

    const validationResult =
        createStudentInformationSchema.safeParse(dataToValidate);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        };
    }

    let check;

    try {
        const response = await createStudentInformation(validationResult.data);

        const data = await response.json();


        if (!response.ok)
            return errorObject(
                'There was an error creating the student information!',
                data
            );

        check = true;

        return {
            status: 'success',
            message: 'Student information created successfully!'
        };
    } catch (error) {
        return errorObject(
            'There was an error creating the student information!'
        );
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/student-information');
        redirect('/dashboard/manage/student-information');
    }
};