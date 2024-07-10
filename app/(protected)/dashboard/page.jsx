import { auth } from '@/auth';
import { CreditScoreDistribution } from '@/components/dashboard/credit-score-distribution';
import { DashboardBanner } from '@/components/dashboard/dashboard-banner';
import { Grades } from '@/components/dashboard/grades';
import { LessonPrograms } from '@/components/dashboard/lesson-programs';
import { LessonTeachers } from '@/components/dashboard/lesson-teachers';
import { MeetingNotice } from '@/components/dashboard/meeting-notice';
import { Notifications } from '@/components/dashboard/notifications';
import { PerformanceScatterPlot } from '@/components/dashboard/performance-scatter-plot';
import { ShortcutLinks } from '@/components/dashboard/shortcut-links';
import { TeacherDemographics } from '@/components/dashboard/teacher-demographics';
import { TimeSeriesChart } from '@/components/dashboard/time-series-chart';
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
            <DashboardBanner
                fullName={`${session?.user?.name} ${session?.user?.surname}`}
            />
            <div className={styles.contentContainer}>
                <div className={styles.contentOne}>
                    <div className={styles.flexItemOne}>
                        {isStudent ? <Grades /> : <CreditScoreDistribution />}
                    </div>
                    <div className={styles.flexItemTwo}>
                        {isStudent ? (
                            <LessonTeachers />
                        ) : (
                            <TeacherDemographics />
                        )}
                    </div>
                </div>
                <div className={styles.contentTwo}>
                    <div className={styles.flexItemOne}>
                        {isStudent ? (
                            <LessonPrograms />
                        ) : (
                            <TimeSeriesChart role={role} />
                        )}
                    </div>
                    <div className={styles.flexItemTwo}>
                        {isStudent ? (
                            <MeetingNotice />
                        ) : (
                            <PerformanceScatterPlot />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}