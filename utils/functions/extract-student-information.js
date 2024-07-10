/**
 * Extracts student information from the data array and returns an array of value and label pairs.
 *
 * @param {Array} data
 * @returns {Object[]}
 *
 */

export const extractStudentInformation = (data) => {
    if (!data || data?.status === "error") return [];

    return data.map((studentInformation) => ({
        value: studentInformation.userId || studentInformation.id,
        label: `${studentInformation.name} ${studentInformation.surname}`
    }));
};