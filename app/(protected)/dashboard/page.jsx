import { auth } from '@/auth';
import { Notifications } from '@/components/dashboard/notifications';
import { ShortcutLinks } from '@/components/dashboard/shortcut-links';
import { UserInformation } from '@/components/dashboard/user-information';
import styles from '@/styles/pages/dashboard-page.module.scss';

export default async function DashboardPage() {
    const session = await auth();

    const role = session?.user?.role;

    const isStudent = role === 'STUDENT';

    return (
        <main className={styles.container}>
            <div className={styles.topbarContainer}>
                <ShortcutLinks role={role} isStudent={isStudent} />
                <div className={styles.informationContainer}>
                    <UserInformation
                        fullName={`${session?.user?.name} ${session?.user?.surname}`}
                        role={role}
                    />
                    <Notifications />
                </div>
            </div>
            {/* <DashboardBanner /> */}
            <div className={styles.contentContainer}>
                <div className={styles.contentOne}>
                    <div className={styles.flexItemOne}>
                        {isStudent ? (
                            <>{/* <GradeCards /> */}</>
                        ) : (
                            <>{/* <CreditScoreDistribution /> */}</>
                        )}
                    </div>
                    <div className={styles.flexItemTwo}>
                        {isStudent ? (
                            <>{/* <LessonTeachers /> */}</>
                        ) : (
                            <>{/* <TeacherDemographics /> */}</>
                        )}
                    </div>
                </div>
                <div className={styles.contentTwo}>
                    <div className={styles.flexItemOne}>
                        {isStudent ? (
                            <>{/* <LessonPrograms /> */}</>
                        ) : (
                            <>{/* <TimeSeriesChart /> */}</>
                        )}
                    </div>
                    <div className={styles.flexItemTwo}>
                        {isStudent ? (
                            <>{/* <MeetingNotice /> */}</>
                        ) : (
                            <>{/* <StudentPerformanceScatterPlot /> */}</>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}