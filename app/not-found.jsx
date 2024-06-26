import styles from '@/styles/pages/not-found.module.scss';
import Image from 'next/image';
import Loki from "@/public/assets/images/not-found.png";

export default function NotFoundPage() {
    return (
        <div className={styles.container}>
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={styles.blob}></div>
            ))}
            <div className={styles.contentContainer}>
                <h1 className={styles.title}>
                    Oops! I have never seen this page in my life before...
                </h1>
                <p className={styles.description}>
                    If you think there is a mistake, please pray to the gods of
                    Asgard and try again.
                </p>
            </div>
            <Image src={Loki} className={styles.image} alt='Loki thinking' title='Loki thinking'/>
        </div>
    );
}
