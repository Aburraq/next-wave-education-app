'use server';

import moment from 'moment';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { trimFormDataFields } from '@/utils/functions/trim-form-data-fields';
import { errorObject } from '@/utils/functions/error-object';
import { updateMeeting } from '@/actions/meeting/update-meeting.action';
import { createMeetingSchema } from '@/utils/validations/create-meeting-schema';

export const updateMeetingFormAction = async (prevState, formData) => {
    const trimmedData = trimFormDataFields(formData);

    const { id } = trimmedData;

    const dataToValidate = {
        date: new Date(trimmedData.date),
        description: trimmedData.description,
        startTime: moment(trimmedData.startTime, 'HH:mm:ss').format('HH:mm'),
        stopTime: moment(trimmedData.stopTime, 'HH:mm:ss').format('HH:mm'),
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

    // useActionState, state does not work inside try catch block, it will only return undefined, if used inside

    try {
        const response = await updateMeeting(payload, id);

        const data = await response.json();

        if (!response.ok)
            return errorObject('There was an error updating the meeting', {
                common: data?.message
            });

        check = true;

        return {
            status: 'success',
            message: 'Meeting updated successfully!'
        };
    } catch (error) {
        return errorObject('There was an error updating the meeting');
    } finally {
        if (!check) return;
        revalidatePath('/dashboard/manage/meeting');
        redirect('/dashboard/manage/meeting');
    }
};