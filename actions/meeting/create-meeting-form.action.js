'use server';

import moment from 'moment';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { trimFormDataFields } from '@/utils/functions/trim-form-data-fields';
import { errorObject } from '@/utils/functions/error-object';
import { createMeeting } from '@/actions/meeting/create-meeting.action';
import { createMeetingSchema } from '@/utils/validations/create-meeting-schema';

export const createMeetingFormAction = async (state, formData) => {
    const trimmedData = trimFormDataFields(formData);

    const dataToValidate = {
        ...trimmedData,
        date: new Date(trimmedData.date),
        studentIds: trimmedData.studentIds
            ? [...trimmedData.studentIds.split(',')]
            : []
    };

    const validationResult = createMeetingSchema.safeParse(dataToValidate);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        };
    }

    const payload = {
        ...validationResult.data,
        date: moment(validationResult.data.date).format('YYYY-MM-DD')
    };

    let check;

    try {
        const response = await createMeeting(payload);

        const data = await response.json();

        if (!response.ok)
            return errorObject(
                'There was an error creating the meeting!',
                data
            );

        check = true;

        return {
            status: 'success',
            message: 'Meeting created successfully!'
        };
    } catch (error) {
        return errorObject('There was an error creating the meeting');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/meeting');
        redirect('/dashboard/manage/meeting');
    }
};