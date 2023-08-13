import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addUserInfo,
  closeForm,
  initialiseUserInfo,
} from "../features/user/userSlice";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  initiliaseTransaction,
  loadLineChart,
} from "../features/transaction/transactionSlice";
import { useState } from "react";
// import { checkDeleteLocalUserImage } from "../../../backend/controller/userController";

export const UserRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location.state in UserRegisterForm");
  console.log(location.state);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSubmitting(true);
      const name = e.target.elements.name.value;
      const imageFile = e.target.elements.imageFile.files[0];
      const imageFileName = e.target.elements.imageFile.files[0].name;
      const timeForCustomId = new Date().getTime().toString();

      await axios.post("/api/deleteImage", {
        imageName: imageFileName,
      });

      dispatch(
        addUserInfo({
          name: name,
          imageName: imageFileName,
          customId: timeForCustomId,
        })
      );
      console.log("after dispatch addUserInfo");

      navigate("/userMainPage");
      console.log("after navigate to userMainPage");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", imageFile);
      formData.append("customId", timeForCustomId);

      const res = await axios.post("/api", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("after axios post");
    } catch (error) {
      console.log("Submit form fail");
      console.log(error);
    } finally {
      setSubmitting(false); // Reset the submitting state
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group controlId="imageFile" className="mb-3">
          <Form.Label>Image File</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        {/* <Link to="/"> */}
        <Button variant="primary" type="submit">
          {submitting ? "Submitting..." : "Submit"}
        </Button>
        {/* </Link> */}
      </Form>
    </Container>
  );
};
