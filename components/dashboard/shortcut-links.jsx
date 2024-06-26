import { sidebarData } from '@/data/sidebar-data';
import { filterAndSortDataByTitle } from '@/utils/functions/filter-and-sort-data-by-title';
import { PlusLink } from '@/components/common/plus-links';
import styles from '@/styles/components/dashboard/shortcut-links.module.scss';

export const ShortcutLinks = async ({ role, isStudent }) => {
    // if the user is a student, we don't want to show any shortcuts, because student role doesn't have any shortcut creation functionality
    const sortedData = filterAndSortDataByTitle(
        sidebarData,
        isStudent ? '' : role
    );

    // after sorting the data also filter it by checking if the route is message. If that is the case, simply remove it from the list
    const filteredData = sortedData.filter((item) => {
        return (
            item.pathname !== '/dashboard/manage/message' &&
            item.pathname !== '/dashboard'
        );
    });

    return (
        <div className={styles.container}>
            {filteredData.map((item, index) => (
                <PlusLink
                    key={index}
                    href={`${item.pathname}/new`}
                    title={item.title}
                >
                    {item.icon}
                </PlusLink>
            ))}
        </div>
    );
};