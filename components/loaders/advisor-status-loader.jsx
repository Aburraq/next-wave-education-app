import { getTeachers } from '@/actions/teacher/get-teachers.action';
import { NoDataAvailable } from '@/components/common/no-data-available';
import { PieChart } from '@/components/charts/pie-chart';
import { calculateTeacherDemographics } from '@/utils/functions/calculate-teacher-demographics';

export const AdvisorStatusLoader = async () => {
    const data = await getTeachers();
    const isDataAvailable = data && data.status !== 'error' && data.length > 0;

    if (!isDataAvailable) return <NoDataAvailable />;

    const teachers = calculateTeacherDemographics(data);

    return (
        <PieChart
            backgroundColors={['#99ff99', '#ff9393']}
            chartData={[
                teachers?.advisorStatus?.advisor,
                teachers?.advisorStatus?.nonAdvisor
            ]}
            labels={['Advisor', 'Non-Advisor']}
        />
    );
};