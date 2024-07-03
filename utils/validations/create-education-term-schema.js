import { z } from 'zod';
import moment from 'moment';

export const createEducationTermSchema = z
    .object({
        endDate: z.coerce
            .date()
            .min(new Date(), { message: 'Choose a date in the future' }),
        lastRegistrationDate: z.coerce
            .date()
            .min(new Date(), { message: 'Choose a date in the future' }),
        startDate: z.coerce
            .date()
            .min(new Date(), { message: 'Choose a date in the future' }),
        term: z.string().min(1, { message: 'You must select a term' })
    })
    .refine(
        (data) => {
            const start = moment(data.startDate);
            const end = moment(data.endDate);

            return start.isBefore(end);
        },
        {
            path: ['startDate', 'endDate'],
            message: 'Start date must be before the end date'
        }
    )
    .refine(
        (data) => {
            const start = moment(data.startDate);
            const lastRegistrationDate = moment(data.lastRegistrationDate);

            // check if the last registration date is at least 15 days before the start date of the semester
            return start.diff(lastRegistrationDate, 'days') >= 15;
        },
        {
            path: ['startDate', 'lastRegistrationDate'],
            message:
                'Last registration date must be at least 15 days before the start date'
        }
    );