'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { trimFormDataFields } from '@/utils/functions/trim-form-data-fields';
import { errorObject } from '@/utils/functions/error-object';
import { createStudentInformationSchema } from '@/utils/validations/create-student-information-schema';
import { updateStudentInformation } from '@/actions/student-information/update-student-information.action';

export const updateStudentInformationFormAction = async (state, formData) => {
    const trimmedData = trimFormDataFields(formData);

    const { id } = trimmedData;

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
        const response = await updateStudentInformation(
            validationResult.data,
            id
        );

        const data = await response.json();

        if (!response.ok)
            return errorObject(
                'There was an error updating the student information!',
                data
            );

        check = true;

        return {
            status: 'success',
            message: 'Student information updated successfully!'
        };
    } catch (error) {
        return errorObject(
            'There was an error updating the student information!'
        );
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/student-information');
        redirect('/dashboard/manage/student-information');
    }
};