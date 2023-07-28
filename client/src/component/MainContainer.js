import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import '../styles.css';
import { UserProfile } from './UserProfile';
import { AddButton } from './AddButton';
import { UserRegisterForm } from './UserRegisterForm';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { RenderUserProfiles } from './RenderUserProfile';
import RenderLineChart from './RenderLineChart';
import { Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { loadLineChart } from '../features/transaction/transactionSlice';
// import { UserTransaction } from './UserTransaction';

export const MainContainer = () => {

  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.user);
  const { transaction,sortedSingleDateTransactionWithNettAmount, userNameForLineChart } = useSelector((store) => store.transaction);

  // useEffect(() => {
  //   dispatch(loadLineChart());
  // },[])

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
          <RenderLineChart labels={dateList} dataIn={amountList} userName={userNameForLineChart}/>
        </Col>
      </Row>
      {/* {console.log('inside return statement of MainContainer.js')} */}
      {/* {userInfo !== null && renderUserProfiles()} */}
      {/* {userInfo !== null && <RenderUserProfiles userInfo={userInfo}/>} */}
      <RenderUserProfiles />
    </Container>
  );

}
