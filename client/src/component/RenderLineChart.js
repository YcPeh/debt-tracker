import {
    Chart as ChartJS,
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { LineChart } from './LineChart'

ChartJS.register(
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

const RenderLineChart = ({labels,dataIn}) => {
    console.log('RenderLineChart labels')
    console.log(labels)
    console.log('RenderLineChart dataIn')
    console.log(dataIn)
    const data = {
        // labels: ['2023-06-01', '2023-06-01', '2023-07-02', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-04', '2023-07-04', '2023-07-05'],
        labels: labels,
        datasets: [
            {
                label: 'Data Set 1',
                // data: [5, 10, 25, 6, 15, 30, 4, 12, 20],
                data: dataIn,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                stepped: 'before',
            },
        ],
    };
    
    
    // const calculateCumulativeSum = (data) => {
    //     const labels = [];
    //     const cumulativeSum = [];
    
    //     for (let i = 0; i < data.labels.length; i++) {
    //         const date = data.labels[i];
    //         const value = data.datasets[0].data[i];
    
    //         if (!labels.includes(date)) {
    //             labels.push(date);
    //             cumulativeSum.push(value);
    //         } else {
    //             const index = labels.indexOf(date);
    //             cumulativeSum[index] = cumulativeSum[index] + value;
    //         }
    //     }
    
    //     return { labels, datasets: [{ ...data.datasets[0], data: cumulativeSum }] };
    // };
    
    
    // const data = calculateCumulativeSum(originalData);


    const options = {
        scales: {
            x: {
                type: 'time', // Use time scale on the x-axis
                time: {
                    unit: 'day', // Set the time unit (day, week, month, etc.)
                    displayFormats: {
                        day: 'd MMM yyyy', // Format for displaying dates on the x-axis
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    // color: 'black', // Set the color of the x-axis grid to black
                    color: (context) => (context.tick.value === 0 ? 'black' : 'rgba(0, 0, 0, 0.1)'),
                },
            },
        },
    };

    return (
        <LineChart data={data} options={options} />
    )
}

export default RenderLineChart