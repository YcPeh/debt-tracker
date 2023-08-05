import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { loadLineChart, toggleLineChartCurency } from '../features/transaction/transactionSlice';
// import '../styles.css';

export const LineChartCurrencyToggleButton = () => {
    const dispatch = useDispatch();
    const {userNameCustomIdForLineChart, userNameForLineChart, currencyForLineChart} = useSelector((store) => store.transaction);

    // const handleClick = () => {
    //     dispatch(toggleLineChartCurency())
    // }

  return (
    <Button className="line-chart-currency-button" onClick={() => {
        dispatch(toggleLineChartCurency())
        dispatch(loadLineChart({userNameCustomIdForLineChart,userNameForLineChart}))
    }}>{currencyForLineChart}</Button>
  )
}
