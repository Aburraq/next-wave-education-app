export const handleClickOutside = (event, ref, callback) => {
    if (ref.current && !ref.current.contains(event.target))
        return callback(false);
};