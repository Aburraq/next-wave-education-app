import Link from 'next/link';
import styles from '@/styles/components/common/link-title.module.scss';

export const LinkTitle = ({ href = '/', title = 'Home' }) => {
    return (
        <h2 className={styles.heading}>
            <Link href={href} title={`Go To ${title}`} className={styles.link}>
                {title}
            </Link>
        </h2>
    );
};