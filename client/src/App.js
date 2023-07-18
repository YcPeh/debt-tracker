import { useState, useEffect } from "react";
import './App.css';
import { MainContainer } from './component/MainContainer';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { initialiseUserInfo } from "./features/user/userSlice";


function App() {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((store) => store.user);
  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        const userInfo = res.data.data.map(({name, imageName, customId, _id }) => ({name, imageName, customId, _id}))
        console.log('initialising')
        dispatch(initialiseUserInfo(userInfo));
      })
      .catch((err) => console.log(err, "it has an error"));
  },[]);


  return (
    <>
      <MainContainer/>
    </>
  );
}

export default App;
