import styles from '@/styles/components/dashboard/cards/admin-card.module.scss';
import { DeleteButton } from '@/components/common/delete-button';
import { deleteAdmin } from '@/actions/admin/delete-admin.action';

export const AdminCard = ({ data, orderNumber }) => {
    const dataToMap = [
        { label: 'Full Name:', value: `${data?.name} ${data?.surname}` },
        { label: 'SSN:', value: data?.ssn },
        {
            label: 'Birthday:',
            value: `${data?.birthDay} (${data?.birthPlace})`
        },
        { label: 'Phone:', value: data?.phoneNumber },
        { label: 'Gender:', value: data?.gender }
    ];

    const fullName = `${data?.name} ${data?.surname}`;

    return (
        <div
            className={`${styles.cardContainer} ${
                data.built_in ? styles.builtIn : ''
            }`}
        >
            <div className={styles.cardHeader}>
                @{data.username}
                <DeleteButton
                    cb={deleteAdmin}
                    id={data.id}
                    title={`Delete ${fullName}`}
                    simple
                    builtIn={data.built_in}
                    errorText={`Failed to delete ${fullName}`}
                    questionText={`Are you sure you want to delete ${fullName}?`}
                    successText={`${fullName} deleted successfully`}
                />
            </div>
            <div className={styles.cardBody}>
                {dataToMap.map((item, index) => (
                    <div key={index} className={styles.detail}>
                        <span className={styles.detailLabel}>{item.label}</span>
                        <span className={styles.detailValue}>
                            {item.value || 'N/A'}
                        </span>
                    </div>
                ))}
            </div>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
};