import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addUserInfo, closeForm } from "../features/user/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserRegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("submitting form");
      console.log("e");
      console.log(e);

      // navigate('/');
      // console.log('navigate to /');

      const name = e.target.elements.name.value;
      const imageFile = e.target.elements.imageFile.files[0];
      const imageFileName = e.target.elements.imageFile.files[0].name;
      const timeForCustomId = new Date().getTime().toString();

      // dispatch(addUserInfo({ name: name, imageName: imageFileName, customId: timeForCustomId }));
      // console.log('dispatch addUserInfo');

      // dispatch(closeForm())

      navigate("/");
      // console.log('navigate to /');

      dispatch(
        addUserInfo({
          name: name,
          imageName: imageFileName,
          customId: timeForCustomId,
        })
      );
      // console.log('dispatch addUserInfo');

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", imageFile);
      formData.append("customId", timeForCustomId);

      // const res = await axios.post('http://localhost:5000', formData, {
      //     headers: {
      //         "Content-Type": "multipart/form-data",
      //     },
      // });
      const res = await axios.post("/api", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log("Submit form fail");
      console.log(error);
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
          Submit
        </Button>
        {/* </Link> */}
      </Form>
    </Container>
  );
};
