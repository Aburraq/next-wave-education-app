import Image from 'next/image';
import styles from '@/styles/components/common/avatar.module.scss';

export const Avatar = ({
    width = 80,
    height = 80,
    rounded = false,
    src,
    title
}) => {
    const roundedStyle = rounded ? styles.rounded : '';

    if (!src)
        return (
            <div
                className={`${styles.avatar} ${styles.noImage} ${roundedStyle}`}
                title={title}
            >
                {title[0]}
            </div>
        );

    return (
        <Image
            className={`${styles.avatar} ${roundedStyle}`}
            src={src}
            width={width}
            height={height}
            alt={title}
            title={title}
        />
    );
};