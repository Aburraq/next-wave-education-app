/**
 *
 * @param {Array} {lessonId: number, lessonName: string, creditScore: number, compulsory: boolean}[]
 * @returns {Array<{value: string, label: string}> | []
 *
* @example {
* "lessonId": 54,
*  "lessonName": "Almanca",
*  "creditScore": 15,
*   "compulsory": true
* }
*/

export const extractLessonPrograms = (lessonProgramData) => {
   if (!lessonProgramData || lessonProgramData.status === 'error') return [];

   return lessonProgramData.map((item) => ({
       value: item.lessonProgramId,
       label: `Lesson Program ${item.lessonProgramId} - ${
           item.lessonName &&
           item.lessonName.map((lesson) => lesson.lessonName).join(', ')
       }`
   }));
};

// ['Lesson Program 55 - React.js, Next.js, Project'];