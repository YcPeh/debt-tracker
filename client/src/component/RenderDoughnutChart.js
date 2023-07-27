import { DoughnutChart } from './DoughnutChart';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const RenderDoughnutChart = ({ ConsumablesRM,
    CashRM,
    OnlineTransferRM,
    ConsumablesTHB,
    CashTHB,
    OnlineTransferTHB,
    title,}) => {
    
    const data = {
        labels: ['Consumables','Cash','Online Transfer'],
        datasets: [
            {
                label: 'RM',
                data: [ConsumablesRM, CashRM, OnlineTransferRM],
                // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                backgroundColor: ['red','orange','blue'],
                borderWidth: 1,
            },
            {
                label: 'THB',
                data: [ConsumablesTHB, CashTHB, OnlineTransferTHB],
                // backgroundColor: 'rgba(255, 99, 132, 0.5)',
                backgroundColor: ['red','orange','blue'],
                borderWidth: 1,
            },
            

        ],
    };

    const options = {
        elements: {
            arc: {
                borderWidth: 80,
            },
        },
        // cutoutPercentage: 60,
        cutout: '60%',
        aspectRatio: 0.7,
        plugins: {
            legend: {
                position: 'bottom',
                padding: 25,
                align: 'start',
                labels:{
                    boxHeight:30,
                }
            },
            title: {
                display: true,
                text: title,
                font: {
                  size: 18, 
                  weight: 'bold',
                },
              },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw: (chart, args, pluginOptions) => {
            const { ctx, data } = chart;
            const fontSize = '10px'; // Set the desired font size in rem units
    
            ctx.save();
            ctx.font = `bold ${fontSize} sans-serif`;
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
    
            const outer1Y = chart.getDatasetMeta(0).data[0].y - parseFloat(fontSize)*2;
            const outer2Y = chart.getDatasetMeta(0).data[0].y - parseFloat(fontSize);
            const inner1Y = chart.getDatasetMeta(0).data[0].y + parseFloat(fontSize); // Add the font size to the y-coordinate
            const inner2Y = chart.getDatasetMeta(0).data[0].y + parseFloat(fontSize)*2; // Add the font size to the y-coordinate
    
            ctx.fillText(`outer total:`, chart.getDatasetMeta(0).data[0].x, outer1Y);
            ctx.fillText(`RM ${data.datasets[0].data.reduce((total, current) => total + current, 0)}`, chart.getDatasetMeta(0).data[0].x, outer2Y);
            ctx.fillText(`inner total:`, chart.getDatasetMeta(0).data[0].x, inner1Y);
            ctx.fillText(`THB ${data.datasets[1].data.reduce((total, current) => total + current, 0)}`, chart.getDatasetMeta(0).data[0].x, inner2Y);
        }
    }
    const plugins = [textCenter];

    return <DoughnutChart data={data} options={options} plugins={plugins} />;
};

export default RenderDoughnutChart;
