import { Button } from "react-bootstrap"
import { Line } from "react-chartjs-2"
import { LineChartCurrencyToggleButton } from "./LineChartCurrencyToggleButton"


export const LineChart = ({data,options}) => {
    
    
    
    return (
        <div style={{height:"50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"}}>
            <Line data={data} options={options} />
            <LineChartCurrencyToggleButton/>
            {/* <Button className="line-chart-currency-button">haha</Button> */}
        </div>
    )
}
