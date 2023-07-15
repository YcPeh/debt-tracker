import { useState, useEffect } from "react";
import './App.css';
import { MainContainer } from './component/MainContainer';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { initialiseUserInfo } from "./features/user/userSlice";


function App() {
  const [data, setData] = useState([]);
  const {userInfo} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        setData(res.data.data);
        dispatch(initialiseUserInfo(res.data.data));
      })
      .catch((err) => console.log(err, "it has an error"));
  },[userInfo]);

  // console.log('hihi');
  // console.log(data);

  return (
    <>
      <MainContainer/>
    </>
  );
}

export default App;
