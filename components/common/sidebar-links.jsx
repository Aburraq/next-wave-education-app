'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarData } from '@/data/sidebar-data';
import { filterAndSortDataByTitle } from '@/utils/functions/filter-and-sort-data-by-title';
import styles from '@/styles/components/common/sidebar-links.module.scss';

export const SidebarLinks = ({ role }) => {
    const pathname = usePathname();
    const sortedData = filterAndSortDataByTitle(sidebarData, role);

    return (
        sortedData &&
        sortedData.map((item) => (
            <Link
                key={item._id}
                href={item.pathname}
                className={`${styles.linkItem} ${
                    pathname === item.pathname ? styles.activeLink : ''
                }`}
                title={`Go To ${item.title}`}
            >
                <span>{item.icon}</span>
                <span>{item.title}</span>
            </Link>
        ))
    );
};