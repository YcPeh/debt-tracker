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
import { Header } from './Header';
import { Hero } from './Hero';
// import { UserTransaction } from './UserTransaction';

export const MainContainer = () => {

  const dispatch = useDispatch();
  const { userInfo, selectedUserInfo } = useSelector((store) => store.user);
  const { transaction, sortedSingleDateTransactionWithNettAmount, userNameForLineChart } = useSelector((store) => store.transaction);
  const location = useLocation();

  const dateList = sortedSingleDateTransactionWithNettAmount.map((date) => date.date);
  const amountList = sortedSingleDateTransactionWithNettAmount.map((amount) => amount.amount);

  return (
    <>
      <Header />
      <Hero />
      <Container>
        <Row>
          <Col xs={{ span: 11, offset: 0 }}>
            <RenderLineChart labels={dateList} dataIn={amountList} userName={userNameForLineChart} />
          </Col>
        </Row>
        <RenderUserProfiles />
      </Container>
    </>
  );

}
