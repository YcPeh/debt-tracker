import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import "../styles.css";
import { UserProfile } from "./UserProfile";
import { AddButton } from "./AddButton";
import { UserRegisterForm } from "./UserRegisterForm";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RenderUserProfiles } from "./RenderUserProfile";
import RenderLineChart from "./RenderLineChart";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import {
  initiliaseTransaction,
  loadLineChart,
} from "../features/transaction/transactionSlice";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { initialiseUserInfo } from "../features/user/userSlice";
import axios from "axios";
// import { UserTransaction } from './UserTransaction';

export const UserMainPage = () => {
  const dispatch = useDispatch();
  const { userInfo, selectedUserInfo } = useSelector((store) => store.user);
  const {
    transaction,
    sortedSingleDateTransactionWithNettAmount,
    userNameForLineChart,
  } = useSelector((store) => store.transaction);
  const location = useLocation();
  // console.log("location.state UserMainPage");
  // console.log(location.state);
  const { registrantId, registrantName, registrantEmail } =
    location.state || {};

  // const getData = async () => {
  //   try {
  //     // const res = await axios.get("http://localhost:5000");
  //     const res = await axios.get("/api");
  //     const userInfo = res.data.data.map(
  //       ({ name, imageName, customId, _id }) => ({
  //         name,
  //         imageName,
  //         customId,
  //         _id,
  //       })
  //     );
  //     // console.log('initialising UseEffect')
  //     dispatch(initialiseUserInfo(userInfo));
  //     // const res2 = await axios.get("http://localhost:5000/userTransaction");
  //     const res2 = await axios.get("/api/userTransaction");
  //     const transaction = res2.data.data.map(
  //       ({
  //         userName,
  //         userNameCustomId,
  //         customId,
  //         title,
  //         date,
  //         category,
  //         type,
  //         currency,
  //         amount,
  //         description,
  //       }) => ({
  //         userName,
  //         userNameCustomId,
  //         customId,
  //         title,
  //         date,
  //         category,
  //         type,
  //         currency,
  //         amount,
  //         description,
  //       })
  //     );
  //     dispatch(initiliaseTransaction(transaction));
  //     // console.log('useEffect App js dispatch loadLineChart')
  //     dispatch(loadLineChart());
  //   } catch (error) {
  //     console.log(error, "it has an error");
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const dateList = sortedSingleDateTransactionWithNettAmount.map(
    (date) => date.date
  );
  const amountList = sortedSingleDateTransactionWithNettAmount.map(
    (amount) => amount.amount
  );

  return (
    <>
      <Container>
        <Row>
          <Col xs={{ span: 11, offset: 0 }}>
            <RenderLineChart
              labels={dateList}
              dataIn={amountList}
              userName={userNameForLineChart}
            />
          </Col>
        </Row>
        <RenderUserProfiles />
      </Container>
    </>
  );
};
