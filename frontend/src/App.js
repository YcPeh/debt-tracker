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
import ForgotPasswordScreen from "./screen/ForgotPasswordScreen";

function App() {
  const dispatch = useDispatch();
  const { selectedUserInfo } = useSelector((store) => store.user);
  const { transaction, transType } = useSelector((store) => store.transaction);

  return (
    <Routes>
      <Route path="/" element={<MainContainer />}>
        <Route index path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/forgotPassword" element={<ForgotPasswordScreen />} />
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
