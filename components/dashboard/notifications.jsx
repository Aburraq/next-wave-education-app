import styles from '@/styles/components/dashboard/notifications.module.scss';
import { IoNotifications } from 'react-icons/io5';

export const Notifications = () => {
    const notificationCount = 3;
    const title = `You have ${notificationCount} notification${
        notificationCount > 1 ? 's' : ''
    }`;

    return (
        <div className={styles.container} title={title}>
            <IoNotifications  size={24} className={styles.icon} />
            {notificationCount > 0 && (
                <div className={styles.badge}>{notificationCount}</div>
            )}
        </div>
    );
};