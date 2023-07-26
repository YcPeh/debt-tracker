import React from 'react';
import { BarChart } from './BarChart';

const RenderPieChart = ({ totalDebt, remainingDebt, labels }) => {
    // console.log('totalDebt')
    // console.log(totalDebt)
    // console.log('remainingDebt')
    // console.log(remainingDebt)
    const colorForRemainingDebt = remainingDebt > 0 ? 'red' : 'orange';
    const data = {
        labels: [labels],
        datasets: [
            {
                label: 'Remaining Debt',
                data: [remainingDebt],
                // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                backgroundColor: colorForRemainingDebt,
                borderWidth: 1,
            },
            {
                label: 'Total Debt',
                data: [totalDebt],
                // backgroundColor: 'rgba(54, 162, 235, 0.5)',
                backgroundColor: 'blue',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        aspectRatio: 0.7,
        indexAxis: 'x',
        plugins: {
            legend: {
                // display: false,
                position: 'bottom',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
        // layout: {
        //     padding: {
        //         top: 50, // Increase top padding to make the chart taller
        //     },
        // },
        responsive: true,
        // interaction: {
        //     mode: 'index',
        //     intersect: true
        // },
        maintainAspectRatio: false,
    };

    return <BarChart data={data} options={options} />;
};

export default RenderBarChart;
