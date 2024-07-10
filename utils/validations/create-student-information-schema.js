import { z } from 'zod';

export const createStudentInformationSchema = z.object({
    absentee: z
        .number()
        .gt(0, { message: 'Absentee cannot be less than 0' })
        .lt(100, { message: 'Absentee cannot be more than 100' }),
    educationTermId: z
        .string()
        .min(1, { message: 'Education term id cannot be empty' }),
    finalExam: z
        .number()
        .gt(0, { message: 'Final exam cannot be less than 0' })
        .lt(100, { message: 'Final exam cannot be more than 100' }),
    infoNote: z
        .string()
        .min(1, { message: 'Info note cannot be empty' })
        .max(255, { message: 'Info note cannot be more than 255 characters' }),
    lessonId: z.string().min(1, { message: 'Lesson id cannot be empty' }),
    midtermExam: z
        .number()
        .gt(0, { message: 'Midterm exam cannot be less than 0' })
        .lt(100, { message: 'Midterm exam cannot be more than 100' }),
    studentId: z.string().min(1, { message: 'Student id cannot be empty' })
});