import Swal from 'sweetalert2';

/**
 * Show a toast message
 * @param {boolean} showConfirmButton - Show the confirm button - by default it is false
 * @param {boolean} showCancelButton - Show the cancel button - by default it is false
 * @param {string} title - The title of the toast - by default it is empty
 * @param {string} icon - The icon of the toast (success, error, warning, info, question)
 * @param {number} timer - The time to show the toast in milliseconds, by default it is 4 seconds
 * @param {string} text - The text of the toast - by default it is empty
 */

export const swalToast = ({
    showConfirmButton = false,
    showCancelButton = false,
    title = '',
    icon = 'success',
    timer = 4000,
    text = ''
}) => {
    return Swal.fire({
        icon, // success, error, warning, info, question
        text,
        title,
        timer,
        showConfirmButton,
        showCancelButton
    });
};