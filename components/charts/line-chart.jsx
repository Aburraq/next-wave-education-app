'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// register ChartJS plugins
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

export const LineChart = ({ borderColor, data, label, labels }) => {
    const chartData = {
        labels,
        datasets: [
            {
                label,
                data,
                borderColor,
                tension: 0.1
            }
        ]
    };

    const options = {
        responsive: true
    };

    return <Line data={chartData} options={options} />;
};