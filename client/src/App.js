import { useEffect } from "react";
import './App.css';
import { MainContainer } from './component/MainContainer';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { initialiseUserInfo } from "./features/user/userSlice";
import { Routes, Route } from 'react-router-dom';
import { UserRegisterForm } from "./component/UserRegisterForm";


function App() {
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:5000');
      const userInfo = res.data.data.map(({ name, imageName, customId, _id }) => ({ name, imageName, customId, _id }))
      console.log('initialising UseEffect')
      dispatch(initialiseUserInfo(userInfo));
    } catch (error) {
      console.log(error, "it has an error");
    }

  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000")
  //     .then((res) => {
  //       const userInfo = res.data.data.map(({name, imageName, customId, _id }) => ({name, imageName, customId, _id}))
  //       console.log('initialising UseEffect')
  //       dispatch(initialiseUserInfo(userInfo));
  //     })
  //     .catch((err) => console.log(err, "it has an error"));
  // },[]);


  return (
    // <>
    //   <MainContainer/>
    // </>
    <Routes>
      {console.log('inside Routes in App.js')}
      <Route path='/*' element={<MainContainer />} />
    </Routes>
  );
}

export default App;
