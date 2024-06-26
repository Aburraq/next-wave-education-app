import { Breadcrumb } from '@/components/common/breadcrumb';
import { Sidebar } from '@/components/common/sidebar';
import styles from '@/styles/layouts/protected-layout.module.scss';

export default function ProtectedLayout({ children }) {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.content}>
                <header>
                    <Breadcrumb />
                </header>
                {children}
            </div>
        </div>
    );
}
