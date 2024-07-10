'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { errorObject } from '@/utils/functions/error-object';
import { chooseLessonProgramSchema } from '@/utils/validations/choose-lesson-program-schema';
import { chooseLessonProgram } from '@/actions/lesson/choose-lesson-program.action';
import { colorfulLog } from '@halibal/colorful-log';

export const chooseLessonProgramAction = async (state, formData) => {
    const dataToValidate = {
        lessonProgramId: formData.get('lessonProgramId')
            ? formData.getAll('lessonProgramId')
            : []
    };

    const validationResult =
        chooseLessonProgramSchema.safeParse(dataToValidate);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        };
    }

    let check;

    try {
        const response = await chooseLessonProgram(validationResult.data);

        console.log(response);
        console.log(response.ok);

        const data = await response.json();

        colorfulLog('green', ['Data: ', data]);

        if (!response.ok)
            return errorObject(
                data.message ||
                    'There was an error choosing the lesson program!'
            );

        check = true;

        return {
            status: 'success',
            message: 'Lesson program chosen successfully!'
        };
    } catch (error) {
        return errorObject('There was an error choosing the lesson program!');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/lessons');
        redirect('/dashboard/lessons');
    }
};