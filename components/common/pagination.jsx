import Link from 'next/link';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import styles from '@/styles/components/common/pagination.module.scss';

export const Pagination = ({ baseUrl, currentPage, size, totalPages }) => {
    
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;

    return (
        <div className={styles.pagination}>
            {/* FIRST PAGE */}
            <Link
                href={`${baseUrl}?size=${size}&page=1`}
                title="Go To First Page"
            >
                <IoChevronBackOutline size={30} />
                <IoChevronBackOutline size={30} />
            </Link>
            {/* PREVIOUS PAGE */}
            <Link
                href={`${baseUrl}?size=${size}&page=${previousPage}`}
                title="Go To Previous Page"
            >
                <IoChevronBackOutline size={30} />
            </Link>

            {/* CURRENT PAGE */}
            <div className={styles.pages}></div>

            {/* NEXT PAGE */}
            <Link
                href={`${baseUrl}?size=${size}&page=${nextPage}`}
                title="Go To Next Page"
            >
                <IoChevronForwardOutline size={30} />
            </Link>
            {/* LAST PAGE */}
            <Link
                href={`${baseUrl}?size=${size}&page=${totalPages}`}
                title="Go To Last Page"
            >
                <IoChevronForwardOutline size={30} />
                <IoChevronForwardOutline size={30} />
            </Link>
        </div>
    );
};