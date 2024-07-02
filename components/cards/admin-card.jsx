import styles from '@/styles/components/dashboard/cards/admin-card.module.scss';
import { DeleteButton } from '@/components/common/delete-button';
import { deleteAdmin } from '@/actions/admin/delete-admin.action';
import { EditButton } from '@/components/common/edit-button';

export const AdminCard = ({
    data,
    deleteAction = deleteAdmin,
    orderNumber,
    isEditButton,
    type = 'admin'
}) => {
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

    const id = data?.id || data?.userId;

    const fullName = `${data?.name} ${data?.surname}`;

    return (
        <div
            className={`${styles.cardContainer} ${
                data.built_in ? styles.builtIn : ''
            }`}
        >
            <div className={styles.cardHeader}>
                @{data.username}
                <div className={styles.buttonsContainer}>
                    {isEditButton && (
                        <EditButton
                            title={`Edit ${fullName}`}
                            href={`/dashboard/manage/${type}/edit/${id}`}
                        />
                    )}
                    <DeleteButton
                        cb={deleteAction}
                        id={id}
                        title={`Delete ${fullName}`}
                        simple
                        builtIn={data.built_in}
                        errorText={`Failed to delete ${fullName}`}
                        questionText={`Are you sure you want to delete ${fullName}?`}
                        successText={`${fullName} deleted successfully`}
                    />
                </div>
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