import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
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
  const { registrantInfo } = useSelector((store) => store.auth);
  const registrantId = registrantInfo._id;
  const [submitting, setSubmitting] = useState(false);

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
          registrantId: registrantId,
        })
      );
      console.log("after dispatch addUserInfo");

      navigate("/userMainPage");
      console.log("after navigate to userMainPage");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", imageFile);
      formData.append("customId", timeForCustomId);
      formData.append("registrantId", registrantId);

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
