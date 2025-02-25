import { DeleteButton } from '@/components/common/delete-button';
import { deleteAdmin } from '@/actions/admin/delete-admin.action';
import { EditButton } from '@/components/common/edit-button';
import styles from '@/styles/components/cards/admin-card.module.scss';

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

    if (type === 'student') {
        dataToMap.push(
            { label: 'Email:', value: data?.email },
            { label: 'Student Number:', value: data?.studentNumber },
            {
                label: 'Advisor:',
                value: `${data?.advisorTeacherName} ${data?.advisorTeacherSurname}`
            }
        );
    } else if (type === 'teacher') {
        dataToMap.push(
            { label: 'Email:', value: data?.email },
            {
                label: 'Advisor Teacher',
                value: data?.advisorTeacher ? 'Yes' : 'No'
            }
        );
    }

    const id = data?.id || data?.userId;

    const fullName = `${data?.name} ${data?.surname}`;

    return (
        <div
            className={`${styles.cardContainer} ${
                data.built_in ? styles.builtIn : ''
            } ${styles[type]}`}
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
                    <div
                        key={index}
                        className={`${styles.detail} ${
                            type === 'teacher' && index === dataToMap.length - 1
                                ? data?.advisorTeacher
                                    ? styles.success
                                    : styles.danger
                                : ''
                        }`}
                    >
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