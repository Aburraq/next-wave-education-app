'use client';

import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

// register ChartJS plugins
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const ScatterChart = ({
    backgroundColor,
    data,
    label,
    xLabel,
    yLabel
}) => {
    const chartData = {
        datasets: [
            {
                label,
                data,
                backgroundColor
            }
        ]
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: xLabel
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: yLabel
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        maintainAspectRatio: false
    };

    return <Scatter data={chartData} options={options} />;
};