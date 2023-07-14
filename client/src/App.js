import { useState, useEffect } from "react";
import './App.css';
import { MainContainer } from './component/MainContainer';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { initialiseUserInfo } from "./features/user/userSlice";


function App() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        setData(res.data.data);
        dispatch(initialiseUserInfo(res.data.data));
      })
      .catch((err) => console.log(err, "it has an error"));
  },[]);

  console.log('hihi');
  console.log(data);

  return (
    <>
      <MainContainer/>
      <br /><br />
      <h1>Test</h1>
      <br /><br />
      {Array.isArray(data) && data.map((singleData) => {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(singleData.image.data.data))
        );
        return (
          <>
          <img src={`data:image/png;base64,${base64String}`} width="300"/>
          {/* <h5>{JSON.stringify(singleData.name)}</h5> */}
          <h5>{singleData.name}</h5>
          </>
        )
      })}
    </>
  );
}

export default App;
