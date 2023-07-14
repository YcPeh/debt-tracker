import { useState, useEffect } from "react";
import axios from "axios";


export const userInfo = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  },[]);

  console.log('hihi');
  console.log(data.data);

  return (
    // <>
    //   {/* <MainContainer/> */}
    //   {Array.isArray(data.data) && data.data.map((singleData) => {
    //     const base64String = btoa(
    //       String.fromCharCode(...new Uint8Array(singleData.image.data.data))
    //     );
    //     return (
    //       <>
    //       <img src={`data:image/png;base64,${base64String}`} width="300"/>
    //       <h5>{JSON.stringify(singleData.name)}</h5>
    //       </>
    //     )
    //   })}
    // </>
    data.data
  );
}

