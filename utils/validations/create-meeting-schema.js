import { z } from 'zod';
import { lowercaseRegex } from '@/utils/regex/lowercase.regex';
import { uppercaseRegex } from '@/utils/regex/uppercase.regex';
import { numbersRegex } from '@/utils/regex/numbers.regex';
import { phoneRegex } from '@/utils/regex/phone.regex';
import { ssnRegex } from '@/utils/regex/ssn.regex';
import { timeRegex } from '@/utils/regex/time.regex';
import moment from 'moment';

export const createMeetingSchema = z
    .object({
        date: z.coerce.date().min(new Date(), {
            message: 'You must select a date in the future'
        }),
        description: z
            .string()
            .min(2, {
                message: 'Description must be at least 2 characters long'
            })
            .max(16, { message: 'Description is too long' }),
        startTime: z
            .string()
            .min(1, { message: 'You must select a start time for the meeting' })
            .regex(timeRegex, { message: 'Invalid time format' }),
        stopTime: z
            .string()
            .min(1, { message: 'You must select an end time for the meeting' })
            .regex(timeRegex, { message: 'Invalid time format' }),
        studentIds: z
            .string()
            .array()
            .nonempty({ message: 'Select at least one student' })
    })
    .refine(
        (data) => {
            const start = moment(data.startTime, 'HH:mm');
            const end = moment(data.stopTime, 'HH:mm');

            // check if the start time is strictly before the end time
            return start.isBefore(end);
        },
        {
            message: 'Start time must be before end time',
            path: ['startTime', 'stopTime']
        }
    );