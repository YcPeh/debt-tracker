import { useEffect } from "react";
import "./App.css";
import { MainContainer } from "./component/MainContainer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { initialiseUserInfo } from "./features/user/userSlice";
import { Routes, Route } from "react-router-dom";
import { UserRegisterForm } from "./component/UserRegisterForm";
import { UserTransaction } from "./component/UserTransaction";
import { NotFound } from "./component/NotFound";
import { UserTransactionForm } from "./component/UserTransactionForm";
import { UserTransactionRoutes } from "./component/UserTransactionRoutes";
import {
  initiliaseTransaction,
  loadLineChart,
} from "./features/transaction/transactionSlice";
import { UserMainPage } from "./component/UserMainPage";
import LoginScreen from "./screen/LoginScreen";
import HomeScreen from "./screen/HomeScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ProfileScreen from "./screen/ProfileScreen";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const { selectedUserInfo } = useSelector((store) => store.user);
  const { transaction, transType } = useSelector((store) => store.transaction);

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

  return (
    <Routes>
      <Route path="/" element={<MainContainer />}>
        <Route index path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} />
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/userMainPage" element={<UserMainPage />} />
          <Route
            path="/userTransaction/*"
            element={<UserTransactionRoutes />}
          />
          <Route path="/userRegisterForm" element={<UserRegisterForm />} />
          {/* <Route path="/userTransaction" element={<UserTransaction />} /> */}
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
