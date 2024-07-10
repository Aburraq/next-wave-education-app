/**
 * Check if a number grade is passing
 *
 * @param {string | number} grade
 * @param {string | number} threshold
 * @returns {boolean}
 *
 */

export const isPassingNumberGrade = (grade = 0, threshold = 50) =>
    +grade >= +threshold;