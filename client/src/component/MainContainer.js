import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import '../styles.css';
import { UserProfile } from './UserProfile';
import { AddButton } from './AddButton';
import { UserRegisterForm } from './UserRegisterForm';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { RenderUserProfiles } from './RenderUserProfile';
import RenderLineChart from './RenderLineChart';
import { Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { initiliaseTransaction, loadLineChart } from '../features/transaction/transactionSlice';
// import { UserTransaction } from './UserTransaction';

export const MainContainer = () => {

  const dispatch = useDispatch();
  const { userInfo, selectedUserInfo } = useSelector((store) => store.user);
  const { transaction, sortedSingleDateTransactionWithNettAmount, userNameForLineChart } = useSelector((store) => store.transaction);
  const location = useLocation();
  // console.log('location.state in MainContainer')
  // console.log(location.state)
  // console.log('userNameForLineChart in MainContainer')
  // console.log(userNameForLineChart)
  // const userNameForLineChart = location.state || {}


  // useEffect(() => {
  //   let userNameCustomId;
  //   let userNameForLineChart;
  //   if (selectedUserInfo.length > 0) {
  //     console.log('userInfo')
  //     console.log(selectedUserInfo)
  //     console.log('userInfo.length')
  //     console.log(selectedUserInfo.length)
  //     setTimeout(() => {
  //       userNameCustomId = selectedUserInfo.customId;
  //       userNameForLineChart = selectedUserInfo.name;
  //       console.log('useEffect in MainContainer delay')
  //       console.log('userNameCustomId')
  //       console.log(userNameCustomId)
  //       console.log('userNameForLineChart')
  //       console.log(userNameForLineChart)
  //       dispatch(loadLineChart(userNameCustomId, userNameForLineChart));
  //     }, 500)
  //   }
  // });

  // useEffect(() => {
  //   let userNameCustomId;
  //   let userNameForLineChart;
  //   console.log('userInfo')
  //   console.log(userInfo)

  //   if (Array.isArray(userInfo) && userInfo.length === 0) {
  //     console.log('if')
  //     userNameCustomId = '';
  //     userNameForLineChart = '';
  //   } else {
  //     console.log('else')
  //     console.log('userInfo in else')
  //     console.log(userInfo)
  //     userNameCustomId = userInfo[0].customId;
  //     userNameForLineChart = userInfo[0].name;
  //   }

  //   console.log('userNameCustomId')
  //   console.log(userNameCustomId)
  //   console.log('userNameForLineChart')
  //   console.log(userNameForLineChart)
  //   dispatch(loadLineChart({ userNameCustomId: userNameCustomId, userNameForLineChart: userNameForLineChart }));
  // }, [])

  // const getSortedDateTransaction = (transaction) => {
  //   const trimmedData = transaction.filter((trans) => trans.userNameCustomId === '1690575496106')
  //   .map((trans) => {
  //     return {
  //       date: trans.date.substring(0, 10),
  //       amount: trans.amount,
  //       category: trans.category,
  //       userName: trans.userName,
  //     }
  //   });
  //   trimmedData.sort((a, b) => a.date.localeCompare(b.date));
  //   return trimmedData
  // };

  // const getNettAmount = (transaction) => {
  //   let nett = 0;
  //   const result = transaction.map((trans) => {
  //     if (trans.category === 'Debts') {
  //       nett += trans.amount;
  //     } else if (trans.category === 'Repayments') {
  //       nett -= trans.amount;
  //     }
  //     return {
  //       date: trans.date,
  //       category: trans.category,
  //       amount: nett,
  //       userName: trans.userName,
  //     };
  //   });
  //   return result;
  // };

  // const getSingleDate = (data) => {
  //   const result = [];
  //   let numOfDateSame = 0
  //   data.forEach((item, index) => {
  //     result.push(item);
  //     if (index >= 1 && result[index - numOfDateSame - 1].date === result[index - numOfDateSame].date) {
  //       result.splice(index - numOfDateSame - 1, 1)
  //       numOfDateSame += 1;
  //     }
  //   })
  //   return result
  // };

  // const sortedDateTransaction = getSortedDateTransaction(transaction);
  // const sortedDateTransactionWithNettAmount = getNettAmount(sortedDateTransaction);
  // const sortedSingleDateTransactionWithNettAmount = getSingleDate(sortedDateTransactionWithNettAmount);

  // console.log('sortedDateTransaction')
  // console.log(sortedDateTransaction)
  // console.log('sortedDateTransactionWithNettAmount')
  // console.log(sortedDateTransactionWithNettAmount)
  // console.log('sortedSingleDateTransactionWithNettAmount')
  // console.log(sortedSingleDateTransactionWithNettAmount)

  const dateList = sortedSingleDateTransactionWithNettAmount.map((date) => date.date);
  const amountList = sortedSingleDateTransactionWithNettAmount.map((amount) => amount.amount);

  return (
    <Container>
      <Row>
        <Col xs={{ span: 12, offset: 0 }}>
          <RenderLineChart labels={dateList} dataIn={amountList} userName={userNameForLineChart} />
        </Col>
      </Row>
      {/* {console.log('inside return statement of MainContainer.js')} */}
      {/* {userInfo !== null && renderUserProfiles()} */}
      {/* {userInfo !== null && <RenderUserProfiles userInfo={userInfo}/>} */}
      <RenderUserProfiles />
    </Container>
  );

}
