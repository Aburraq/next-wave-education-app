'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { trimFormDataFields } from '@/utils/functions/trim-form-data-fields';
import { errorObject } from '@/utils/functions/error-object';
import { createLessonSchema } from '@/utils/validations/create-lesson-schema';
import { createLesson } from '@/actions/lesson/create-lesson.action';

export const createLessonFormAction = async (state, formData) => {
    const trimmedData = trimFormDataFields(formData);

    const { compulsory, creditScore, lessonName } = trimmedData;

    const dataToValidate = {
        creditScore: +creditScore,
        lessonName
    };

    const validationResult = createLessonSchema.safeParse(dataToValidate);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        };
    }

    const payload = {
        ...validationResult.data,
        compulsory: compulsory === 'on' ? true : false
    };

    let check;

    try {
        const response = await createLesson(payload);

        const data = await response.json();

        if (!response.ok) {
            errorObject('There was an error creating the lesson!', data);
        }

        check = true;

        return {
            status: 'success',
            message: 'Lesson created successfully!'
        };
    } catch (error) {
        return errorObject('There was an error creating the lesson!');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/lesson');
        redirect('/dashboard/manage/lesson');
    }
};