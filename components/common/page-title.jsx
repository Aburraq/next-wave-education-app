import styles from '@/styles/components/common/page-title.module.scss';

export const PageTitle = ({ title }) => {
    return <h1 className={styles.heading}>{title}</h1>;
};
