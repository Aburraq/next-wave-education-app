/**
 *
 * @param {Array} {lessonId: number, lessonName: string, creditScore: number, compulsory: boolean}[]
 * @returns {Array<{value: string, label: string}> | []
 *
* {
"lessonId": 54,
"lessonName": "Almanca",
"creditScore": 15,
"compulsory": true
}
*/

export const extractLessons = (lessonsData) => {
if (!lessonsData || lessonsData.status === 'error') return [];

return lessonsData.map((item) => ({
    value: item.lessonId,
    label: item.lessonName
}));
};