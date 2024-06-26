import styles from '@/styles/components/common/no-data-available.module.scss';

export const NoDataAvailable = ({ text = 'No data available...' }) => {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <p className={styles.text}>{text}</p>
            </div>
        </div>
    );
};