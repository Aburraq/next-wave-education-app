export const toggleItemSelection = (itemValue, callback) => {
    callback((prevSelectedItems) => {
        if (prevSelectedItems.includes(itemValue))
            return prevSelectedItems.filter(
                (prevSelectedItem) => prevSelectedItem !== itemValue
            );
        else return [...prevSelectedItems, itemValue];
    });
};