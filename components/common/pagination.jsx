import Link from 'next/link';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import styles from '@/styles/components/common/pagination.module.scss';

export const Pagination = ({ baseUrl, currentPage, size, totalPages }) => {
    
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;

    const renderDirectPageLinks = () => {
        return Array.from({ length: totalPages }, (_, index) => (
            <Link
                className={`${styles.pageItem} ${
                    currentPage === index + 1 ? styles.active : ''
                }`}
                key={`page-${index + 1}`}
                href={`${baseUrl}?size=${size}&page=${index + 1}`}
                title={`Go To Page ${index + 1}`}
            >
                {index + 1}
            </Link>
        ));
    };

    const renderPaginationWithEllipsis = () => {
        let startPage, endPage;

        if (currentPage <= 3) {
            startPage = 2;
            endPage = 4;
        } else if (currentPage >= totalPages - 2) {
            startPage = totalPages - 3;
            endPage = totalPages - 1;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        return (
            <>
                <Link
                    className={`${styles.pageItem} ${
                        currentPage === 1 ? styles.active : ''
                    }`}
                    key={`page-1`}
                    href={`${baseUrl}?size=${size}&page=1`}
                    title="Go To Page 1"
                >
                    1
                </Link>
                <span className={styles.ellipsis}>...</span>
                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, index) => startPage + index
                ).map((page) => (
                    <Link
                        className={`${styles.pageItem} ${
                            currentPage === page ? styles.active : ''
                        }`}
                        key={`page-${page}`}
                        href={`${baseUrl}?size=${size}&page=${page}`}
                        title={`Go To Page ${page}`}
                    >
                        {page}
                    </Link>
                ))}
                <span className={styles.ellipsis}>...</span>
                <Link
                    className={`${styles.pageItem} ${
                        currentPage === totalPages ? styles.active : ''
                    }`}
                    key={`page-${totalPages}`}
                    href={`${baseUrl}?size=${size}&page=${totalPages}`}
                    title={`Go To Page ${totalPages}`}
                >
                    {totalPages}
                </Link>
            </>
        );
    };

    return (
        <div className={styles.pagination}>
            {/* FIRST PAGE */}
            <Link
                className={`${styles.prev} ${styles.first} ${
                    currentPage === 1 ? styles.disabled : ''
                }`}
                href={`${baseUrl}?size=${size}&page=1`}
                title="Go To First Page"
            >
                <IoChevronBackOutline size={30} />
                <IoChevronBackOutline size={30} />
            </Link>
            {/* PREVIOUS PAGE */}
            <Link
                className={`${styles.prev} ${
                    currentPage === 1 ? styles.disabled : ''
                }`}
                href={`${baseUrl}?size=${size}&page=${previousPage}`}
                title="Go To Previous Page"
            >
                <IoChevronBackOutline size={30} />
            </Link>

            {/* CURRENT PAGE */}
            <div className={styles.pages}>
                {totalPages < 5
                    ? renderDirectPageLinks()
                    : renderPaginationWithEllipsis()}
            </div>

            {/* NEXT PAGE */}
            <Link
                className={`${styles.next} ${
                    currentPage === totalPages ? styles.disabled : ''
                }`}
                href={`${baseUrl}?size=${size}&page=${nextPage}`}
                title="Go To Next Page"
            >
                <IoChevronForwardOutline size={30} />
            </Link>
            {/* LAST PAGE */}
            <Link
                className={`${styles.next} ${styles.last} ${
                    currentPage === totalPages ? styles.disabled : ''
                }`}
                href={`${baseUrl}?size=${size}&page=${totalPages}`}
                title="Go To Last Page"
            >
                <IoChevronForwardOutline size={30} />
                <IoChevronForwardOutline size={30} />
            </Link>
        </div>
    );
};