import { BarChart } from './BarChart';

const RenderBarChart = ({ totalDebt, remainingDebt, labels, currency }) => {
    // console.log('totalDebt')
    // console.log(totalDebt)
    // console.log('remainingDebt')
    // console.log(remainingDebt)
    const colorForRemainingDebt = remainingDebt > 0 ? 'red' : 'orange';
    const data = {
        labels: [labels],
        // labels: [''],
        datasets: [
            {
                label: [['Remaining Debt'], [`${currency} ${remainingDebt}`]],
                // label: ['Remaining Debt'],
                data: [remainingDebt],
                backgroundColor: colorForRemainingDebt,
                borderWidth: 1,
            },
            {
                label: [['Total Debt'], [`${currency} ${totalDebt}`]],
                // label: ['Total Debt'],
                data: [totalDebt],
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
                position: 'bottom',
                align: 'start',
                labels: {
                    boxHeight: 30,
                    // font: {
                    //     weight: 'bold',
                    // },
                },

            },
            title: {
                display: true,
                text: labels,
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: false,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return <BarChart data={data} options={options} />;
};

export default RenderBarChart;
