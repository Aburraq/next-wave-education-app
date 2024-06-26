import styles from '@/styles/pages/unauthorized-page.module.scss';
import Image from 'next/image';
import Gandalf from "@/public/assets/images/unauthorized.png"
import Link from 'next/link';

export default function UnauthorizedPage() {

    const session = {
        user: {
            role: 'admin'
        }
    };

    return (
        <div className={styles.container}>
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={styles.blob}></div>
            ))}
            <div className={styles.contentContainer}>
                <h1 className={styles.title}>You shall not pass</h1>
                <p className={styles.description}>
                    This page is beyond any of you.
                </p>
                {session?.user?.role &&
                    session?.user?.role.toLocaleLowerCase() === 'admin' && (
                        <p className={styles.description}>
                            For even the very authorized cannot see all pages.
                        </p>
                    )}
            </div>
            <Image src={Gandalf} alt='Gandalf cannot allow us to pass' title='You shall not pass' className={styles.image}/>
            <Link href={"/dashboard"} title='Fly back to safety!' className={styles.back}>Fly Back to Safety!</Link>
        </div>
    );
}
