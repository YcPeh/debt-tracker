import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import '../styles.css';

export const BarChart = ({ data, options }) => {
    return (
        // <div className='bar-chart'>
        <div style={{height:"50vh"}}>
            <Pie data={data} options={options} />
        </div>
        // </div>

    )
}
