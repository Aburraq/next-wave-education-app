import styles from '@/styles/components/dashboard/cards/message-card.module.scss';

export const MessageCard = ({ data, orderNumber }) => {
    return (
        <div className={styles.cardContainer}>
            <h3 className={styles.cardHeader}>
                {data?.subject}{' '}
                <span className={styles.date}>{data?.date}</span>
            </h3>
            <div className={styles.cardBody}>
                <p className={styles.message}>{data?.message}</p>
                <p className={styles.nameEmail}>
                    <span className={styles.name}>{data?.name}</span>
                    <span className={styles.email}>{data?.email}</span>
                </p>
            </div>
            <div className={styles.orderNumber}>{orderNumber}</div>
        </div>
    );
};