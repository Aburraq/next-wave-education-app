import styles from '@/styles/components/common/skeleton-loader.module.scss';
import { LoaderRing } from '@/components/common/loader-ring';

export const SkeletonLoader = ({ flex, height, width, isRing, rounded }) => {
    const isRounded = rounded ? styles.rounded : '';
    const skeletonStyles = {
        flex,
        height,
        width
    };

    return (
        <div
            className={`${styles.skeleton} ${isRounded}`}
            style={skeletonStyles}
        >
            {isRing && <LoaderRing text="..." />}
        </div>
    );
};