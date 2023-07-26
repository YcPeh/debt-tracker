import React from 'react';
import { BarChart } from './BarChart';

const RenderBarChart = ({ totalDebt, remainingDebt, labels }) => {
    console.log('totalDebt')
    console.log(totalDebt)
    console.log('remainingDebt')
    console.log(remainingDebt)
    const colorForRemainingDebt = remainingDebt > 0 ? 'red' : 'orange';
    const data = {
        labels: [labels],
        datasets: [
            {
                label: `Remaining Debt (${remainingDebt})`,
                data: [remainingDebt],
                // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                backgroundColor: colorForRemainingDebt,
                borderWidth: 1,
            },
            {
                label: `Total Debt  (${totalDebt})`,
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
                // align: 'start',
            },
            title: {
                display: false,
                // text: `Remaining Debt: ${remainingDebt}\nTotal Debt: ${totalDebt}`,
                // padding: { top: 10, bottom: 30 }, // Adjust the padding as needed
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
        callbacks: {
            footer: (context) => {
                const data = context.dataset.data;
                if (data.length > 0) {
                    const remainingDebt = data[0];
                    const totalDebt = data[1];
                    return `Remaining Debt: ${remainingDebt}\nTotal Debt: ${totalDebt}`;
                }
                return '';
            },
        },
    };

    return <BarChart data={data} options={options} />;
};

export default RenderBarChart;
