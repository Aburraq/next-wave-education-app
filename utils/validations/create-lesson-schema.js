import { z } from 'zod';

export const createLessonSchema = z.object({
    creditScore: z
        .number()
        .min(1, { message: 'Credit score must be at least 1' })
        .max(8, { message: 'Credit score must be at most 8' }),
    lessonName: z
        .string()
        .min(1, { message: 'Lesson name is required' })
        .max(16, { message: 'Lesson name must be at most 16 characters' })
});