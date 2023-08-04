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

const RenderLineChart = ({ labels, dataIn, userName }) => {
    // console.log('RenderLineChart labels')
    // console.log(labels)
    // console.log('RenderLineChart dataIn')
    // console.log(dataIn)
    const data = {
        // labels: ['2023-06-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05']
        labels: labels,
        // labels: [['2023-06-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05'],['2023-06-02', '2023-07-04', '2023-07-06', '2023-07-07', '2023-07-08']],
        datasets: [
            {
                // label: ['Data Set 1'],
                label: [userName],
                // data: [5, 10, 25, 6, 15],
                data: dataIn,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                stepped: 'before',
                pointStyle: 'rectRot',
                pointRadius: 5,
                pointBorderColor: 'rgb(75, 192, 192)',
                // labels:['2023-06-01', '2023-07-02', '2023-07-03', '2023-07-04', '2023-07-05']
            },
        ],
    };



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