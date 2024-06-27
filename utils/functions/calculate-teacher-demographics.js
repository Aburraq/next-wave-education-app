/**
 * Calculates and returns the demographics of a list of teachers.
 * The function aggregates data based on gender, birthPlace (converted to lowercase),
 * and advisor status. If the input is invalid or has a status of "error", the function returns null.
 *
 * @param {Object[]} data - The array of teacher objects to analyze. Each teacher object should include
 *                          properties for gender, birthPlace, and advisorTeacher status.
 * @returns {{gender: {MALE: number, FEMALE: number, OTHER: number}, birthPlace: {[key: string]: number}, advisorStatus: {advisor: number, nonAdvisor: number}} | null} An object containing demographic data, structured as follows:
 *   - `gender`: Object with counts of MALE, FEMALE, and OTHER.
 *   - `birthPlace`: Object with birthPlaces as keys (string, all lowercase) and their counts (number).
 *   - `advisorStatus`: Object with counts of advisor and nonAdvisor teachers.
 *   Returns `null` if the input data is invalid.
 */

export const calculateTeacherDemographics = (data) => {
    if (!data || data?.status === 'error') return null;

    const demographics = {
        gender: {
            MALE: 0,
            FEMALE: 0,
            OTHER: 0
        },
        birthPlace: {},
        advisorStatus: { advisor: 0, nonAdvisor: 0 }
    };

    data.forEach((item) => {
        // gender demographics
        if (item?.gender === 'MALE' || item?.gender === 'FEMALE') {
            demographics.gender[item?.gender]++;
        } else {
            demographics.gender.OTHER++;
        }

        // birthPlace demographics
        const birthPlace = item?.birthPlace?.toLowerCase();
        demographics.birthPlace[birthPlace] =
            (demographics.birthPlace[birthPlace] || 0) + 1;

        // advisor status demographics
        if (item?.advisorTeacher) {
            demographics.advisorStatus.advisor++;
        } else {
            demographics.advisorStatus.nonAdvisor++;
        }
    });

    return demographics;
};