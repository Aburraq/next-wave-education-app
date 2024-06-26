import styles from '@/styles/components/dashboard/user-information.module.scss';
import { Avatar } from '@/components/common/avatar';

export const UserInformation = ({ fullName, role }) => {
    return (
        <div className={styles.container}>
            <Avatar title={fullName} rounded />
            <div>
                <h3 className={styles.title}>{fullName}</h3>
                <p className={styles.type}>
                    <span>Account Type:</span>
                    <span>{role}</span>
                </p>
            </div>
        </div>
    );
};