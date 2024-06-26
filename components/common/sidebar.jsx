import { auth } from "@/auth";
import styles from "@/styles/components/common/sidebar.module.scss";
import Image from "next/image";
import IconGraduation from "@/public/assets/images/icon-graduation.svg";
import { SidebarLinks } from "@/components/common/sidebar-links";
import { LogoutButton } from "@/components/common/logout-button";

export const Sidebar = async () => {

    const session = await auth();

  return (
    <nav className={styles.container}>
        <div className={styles.avatarContainer}>
            <div className={styles.avatarInnerContainer}>
                <Image 
                    src={IconGraduation}
                    alt="Graduation Cap Icon"
                    title={`${session?.user?.name} ${session?.user?.surname}`}
                    className={styles.avatar} />
            </div>
        </div>

        <div className={styles.linksContainer}>
            <SidebarLinks role={session?.user?.role} />
        </div>
        <div className={styles.logoutContainer}>
            <LogoutButton />
        </div>
    </nav>
  )
}
