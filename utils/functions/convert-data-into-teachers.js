/**
 *  This function takes an array of objects and returns an array of teachers
 *
 * @param {*} data
 * @returns {Array} - An array of teachers
 *
 */

export const convertDataIntoTeachers = (data) => {
    if (!data) return [];

    let allTeachers = data.flatMap((item) => item.teachers);

    if (allTeachers.length === 0) return [];

    // remove duplicate teachers based on the userId
    const uniqueTeachers = Array.from(
        new Map(
            allTeachers.map((teacher) => [teacher.userId, teacher])
        ).values()
    );

    return uniqueTeachers;
};