import { brand } from '@/constants/brand';
import moment from 'moment';
import Image from 'next/image';
import styles from '@/styles/components/dashboard/dashboard-banner.module.scss';

export const DashboardBanner = ({ fullName }) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.date}>
                    <span>{moment().format('LL')}</span>
                    <span>{moment().format('dddd')}</span>
                </div>
                <div>
                    <h1 className={styles.title}>
                        Welcome to your dashboard, {fullName}!
                    </h1>
                    <p className={styles.description}>
                        Here you can view your recent activity, manage your
                        account, and access your courses.
                    </p>
                </div>
            </div>
            <div className={styles.imageContainer}>
                <Image
                    src="/assets/images/logo.png"
                    width={400}
                    height={200}
                    alt={brand.name}
                    title={brand.name}
                    className={styles.image}
                />
            </div>
        </div>
    );
};