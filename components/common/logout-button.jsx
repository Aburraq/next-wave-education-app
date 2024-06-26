'use client';

import { logout } from '@/actions/auth/logout.action';
import { swalToast } from '@/utils/functions/swal/swal-toast';
import { IoIosLogOut } from 'react-icons/io';
import styles from '@/styles/components/common/logout-button.module.scss';

export const LogoutButton = () => {
    const handleClick = async () => {
        try {
            swalToast({
                title: 'Are you sure you want to logout?',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            }).then(async (response) => {
                if (!response.isConfirmed) return;
                await logout();
                swalToast({
                    title: 'You have been logged out successfully.'
                });
            });
        } catch (error) {
            swalToast({
                title: 'There was a problem logging you out. Please try again later.',
                icon: 'error'
            });
        }
    };

    return (
        <button
            type="button"
            title="Logout"
            className={styles.button}
            onClick={handleClick}
        >
            <span>
                <IoIosLogOut size={30} />
            </span>
            <span>Logout</span>
        </button>
    );
};