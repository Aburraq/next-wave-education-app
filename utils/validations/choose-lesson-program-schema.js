import { z } from 'zod';
import { timeRegex } from '@/utils/regex/time.regex';
import moment from 'moment';

export const chooseLessonProgramSchema = z
    .object({
        day: z.enum([
            'MONDAY',
            'TUESDAY',
            'WEDNESDAY',
            'THURSDAY',
            'FRIDAY',
            'SATURDAY',
            'SUNDAY'
        ]),
        educationTermId: z
            .string()
            .min(1, { message: 'Education term must be selected' }),
        lessonIdList: z.string().array().nonempty({
            message: 'Select at least one lesson to create a lesson program'
        }),
        startTime: z
            .string()
            .min(1, { message: 'Start time must be selected' })
            .regex(timeRegex, { message: 'Invalid time format' }),
        stopTime: z
            .string()
            .min(1, { message: 'End time must be selected' })
            .regex(timeRegex, { message: 'Invalid time format' })
    })
    .refine(
        (data) => {
            const start = moment(data.startTime, 'HH:mm');
            const end = moment(data.stopTime, 'HH:mm');

            return start.isBefore(end);
        },
        {
            message: 'Start time must be before end time',
            path: ['startTime', 'stopTime']
        }
    );