'use client';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import styles from '@/styles/components/common/breadcrumb.module.scss';

export const Breadcrumb = () => {
    const segments = useSelectedLayoutSegments();



    const breadcrumbItems = segments.reduce((acc, segment, index, arr) => {
        if (
            (segment.startsWith('(') && segment.endsWith(')')) ||
            segment === 'manage'
        ) {
            return acc;
        }

        // replacing the dashes with spaces for display
        const displaySegment = segment.replace(/-/g, ' ');

        // construct the url, including all segments up to this one
        const pathSegments = arr.slice(0, index + 1);

        let path = '';

        for (let i = 0; i < pathSegments.length; i++) {
            if (
                !pathSegments[i].startsWith('(') &&
                !pathSegments[i].endsWith(')')
            ) {
                path += `/${pathSegments[i]}`;
            } else {
                path += `/${pathSegments[i].slice(1, -1)}`;
            }
        }

        acc.push(
            <li key={index} className={styles.breadcrumbItem}>
                <Link
                    className={styles.breadcrumbLink}
                    href={path}
                    title={`Go To ${displaySegment}`}
                >
                    {displaySegment}
                </Link>
            </li>

        );

        return acc;

    }, []);

    return (
        <nav aria-label="breadcrumb">
            <ul className={styles.breadcrumbList}>{breadcrumbItems}</ul>
        </nav>
    );
};