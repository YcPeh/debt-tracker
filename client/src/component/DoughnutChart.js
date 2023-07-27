import { Doughnut  } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import '../styles.css';

export const DoughnutChart = ({ data, options, plugins }) => {
    return (
        // <div className='bar-chart'>
        <div style={{height:"50vh"}}>
            <Doughnut  data={data} options={options} plugins={plugins} />
        </div>
        // </div>

    )
}
