
export const trimFormDataFields = (formData) => {
    const trimmedEntries = Array.from(formData.entries()).map(
        ([key, value]) => {
            return [key, typeof value === 'string' ? value.trim() : value];
        }
    );

    return Object.fromEntries(trimmedEntries);
};