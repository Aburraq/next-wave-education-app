import { brand } from '@/constants/brand';
import styles from '@/styles/layouts/auth-layout.module.scss';
import Image from 'next/image';

export default function AuthLayout({ children }) {
    
    return (
        <div className={styles.container}>
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={styles.blob}></div>
            ))}
            <div className={styles.contentContainer}>
                <Image
                    src={'/assets/images/logo.png'}
                    width={500}
                    height={200}
                    alt={brand.name}
                    title={brand.name}
                    className={styles.image}
                />
                <Image
                    src={'/assets/images/logo-only-text.png'}
                    width={500}
                    height={64}
                    alt={brand.name}
                    title={brand.name}
                    className={styles.image}
                />
                <h1 className={styles.title}>Your Path to Progress</h1>
                <p className={styles.description}>
                    Sign in to explore a realm of resources, track your
                    educational progress, and connect with your courses and
                    peers.
                </p>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}
