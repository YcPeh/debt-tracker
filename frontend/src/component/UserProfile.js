import { Button, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  deleteUserInfo,
  initialiseUserInfo,
  selectUser,
  updateUserName,
  updateUserPhoto,
} from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { UserTopRightIcons } from "./UserTopRightIcons";
import {
  calculateDebtRepaymentBalance,
  loadLineChart,
} from "../features/transaction/transactionSlice";

export const UserProfile = ({ user, colWidthUser }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { registrantInfo } = useSelector((store) => store.auth);
  const { userInfo } = useSelector((store) => store.user);

  // useEffect(() => {
  //   getData(); // Call getData when userInfo changes
  // }, []);

  const getData = async () => {
    const res = await axios.get("/api");
    console.log("res.data.data in UserRegisterForm");
    console.log(res.data.data);
    const userInfo = res.data.data
      .filter((data) => data.registrantId === registrantInfo._id)
      .map(({ name, imageName, imageUrl, customId, _id }) => ({
        name,
        imageName,
        imageUrl,
        customId,
        _id,
      }));
    // console.log('initialising UseEffect')
    dispatch(initialiseUserInfo(userInfo));
  };

  const handleDelete = async () => {
    try {
      // await axios.delete(`http://localhost:5000/${user.customId}`);
      console.log("user before delete");
      console.log(user);
      await axios.delete(`/api/${user.customId}`, {
        data: {
          imageName: user.imageName,
        },
      });
      // await axios.delete("/api", {
      //   data: {
      //     imageName: user.imageName,
      //     customId: user.customId,
      //   },
      // });
      dispatch(deleteUserInfo(user.customId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameUpdate = async () => {
    try {
      if (user.name !== editedName) {
        dispatch(updateUserName({ customId: user.customId, name: editedName }));
        // const changedUser = { ...user, name: editedName };
        // dispatch(selectUser(changedUser));
        dispatch(
          loadLineChart({
            userNameCustomIdForLineChart: user.customId,
            userNameForLineChart: editedName,
          })
        );
      }
      // await axios.put(`http://localhost:5000/${user.customId}`, { name: editedName });
      await axios.put(`/api/${user.customId}`, { name: editedName });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    // console.log('handleUpdate')
    inputRef.current.click();
  };

  const handleFileChange = async (e) => {
    try {
      const imageFile = e.target.files && e.target.files[0];
      if (!imageFile) {
        return;
      }
      // console.log("before deleteImage");
      // await axios.post("/api/deleteImage", {
      //   imageName: imageFile.name,
      // });
      // navigate("/userMainPage");
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("imageNameToDelete", user.imageName);
      const res = await axios.put(`/api/${user.customId}/userPhoto`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getData();
      // navigate("/userMainPage");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleUserImageClick = () => {
    navigate(`/userTransaction`, {
      state: { userNameCustomId: user.customId, userName: user.name },
    });
    // navigate(`/userTransaction`, {state:transaction});
    // navigate('/userTransaction');
    dispatch(selectUser(user));
  };

  const handleLineChartClick = () => {
    // console.log('user in handleLineChartClick')
    // console.log(user)
    // console.log('user.customId in handleLineChartClick')
    // console.log(user.customId)
    // console.log('user.name in handleLineChartClick')
    // console.log(user.name)
    dispatch(
      loadLineChart({
        userNameCustomIdForLineChart: user.customId,
        userNameForLineChart: user.name,
      })
    );
  };
  // console.log("process.env.PUBLIC_URL");
  // console.log(process.env.PUBLIC_URL);
  // const imagePath = `${process.env.PUBLIC_URL}/uploads/${user.imageName}`;
  // const imagePath = `/uploads/${user.imageName}`;
  const imagePath = `${user.imageUrl}`;
  // const imagePath = `https://firebasestorage.googleapis.com/v0/b/debt-tracker-d5aaa.appspot.com/o/Users%2Fnetlify_2023-8-16_3%3A3%3A36.png?alt=media&token=c8d05f4f-08cf-4ed8-a728-50cdb270ec2a`;
  // console.log("user");
  // console.log(user);
  // console.log("imagePath");
  // console.log(imagePath);
  return (
    <Col xs={colWidthUser} className="userColumn">
      <div
        className="divContainerUser"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          className="userImage"
          src={imagePath}
          alt={user.name}
          roundedCircle
          onClick={handleUserImageClick}
        />
        {isHovered && (
          <UserTopRightIcons
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleFileChange={handleFileChange}
            inputRef={inputRef}
            handleLineChartClick={handleLineChartClick}
          />
        )}
        <h1>
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            onBlur={handleNameUpdate}
          />
        </h1>
      </div>
    </Col>
  );
};
