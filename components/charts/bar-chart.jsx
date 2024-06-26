'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// register ChartJS plugins
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const BarChart = ({ backgroundColor, data, labels, label }) => {
    const chartData = {
        labels,
        datasets: [
            {
                label,
                data,
                backgroundColor,
                borderColor: '#dbc4ff',
                borderWidth: 2,
                maxBarThickness: 50
            }
        ]
    };

    const options = {
        responsive: true,
        borderColor: '#dbc4ff',
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return <Bar data={chartData} options={options} />;
};