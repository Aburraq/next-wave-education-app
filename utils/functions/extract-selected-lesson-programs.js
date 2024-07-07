/**
 * Extracts selected lesson programs from the provided lesson programs data.
 *
 * @param {Array<Object>} lessonProgramsData - The lesson programs data, an array of objects.
 * @param {number} lessonProgramsData[].id - The unique identifier of the lesson program.
 * @param {Array<Object>} lessonProgramsData[].lesson - An array of lesson objects.
 * @param {string} lessonProgramsData[].lesson[].lessonName - The name of the lesson.
 *
 * @example
 * const lessonProgramsData = [
 *   {
 *     id: 1,
 *     lesson: [
 *       { lessonName: 'Math' },
 *       { lessonName: 'Science' }
 *     ]
 *   },
 *   {
 *     id: 2,
 *     lesson: [
 *       { lessonName: 'History' },
 *       { lessonName: 'Art' }
 *     ]
 *   }
 * ];
 *
 * const result = extractSelectedLessonPrograms(lessonProgramsData);
 * // result:
 * // [
 * //   { value: 1, label: 'Lesson Program 1 - Math, Science' },
 * //   { value: 2, label: 'Lesson Program 2 - History, Art' }
 * // ]
 *
 * @returns {Array<Object>} An array of objects with the following properties:
 *   - {number} value - The unique identifier of the lesson program.
 *   - {string} label - A label string in the format "Lesson Program {id} - {lessonName1}, {lessonName2}, ...".
 */
export const extractSelectedLessonPrograms = (lessonProgramsData) => {
    if (!lessonProgramsData) return [];

    return lessonProgramsData.map((item) => ({
        value: item.id,
        label: `Lesson Program ${item.id} - ${item.lesson
            .map((lesson) => lesson.lessonName)
            .join(', ')}`
    }));
};