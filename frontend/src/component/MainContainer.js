import { Outlet } from "react-router-dom";
import "../styles.css";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { UserMainPage } from "./UserMainPage";
// import { UserTransaction } from './UserTransaction';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MainContainer = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Outlet />
      {/* <UserMainPage /> */}
    </>
  );
};
