import { getStudentInformationByPageAsAdmin } from '@/actions/student-information/get-student-information-by-page-as-admin.action';
import { NoDataAvailable } from '@/components/common/no-data-available';
import { ScatterChart } from '@/components/charts/scatter-chart';

export const PerformanceScatterLoader = async () => {
    const data = await getStudentInformationByPageAsAdmin({ size: 1000 });

    const isDataAvailable =
        data &&
        data.status !== 'error' &&
        Array.isArray(data?.content) &&
        data?.content?.length > 0;

    if (!isDataAvailable) return <NoDataAvailable />;

    const scatterData = data?.content?.map((item) => ({
        x: item?.absentee,
        y: item?.average
    }));

    return (
        <ScatterChart
            backgroundColor="rgba(255, 99, 132, 1)"
            data={scatterData}
            label="Student Performance"
            xLabel="Absenteeism"
            yLabel="Average Score (%)"
        />
    );
};