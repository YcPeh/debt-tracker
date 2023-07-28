import { Line } from "react-chartjs-2"


export const LineChart = ({data,options}) => {
    
    
    
    return (
        // <div style={{height:"50vh", width: "100vw"}}>
        <div style={{height:"50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"}}>
            <Line data={data} options={options} />
        </div>
    )
}
