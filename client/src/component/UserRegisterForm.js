import { Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addUserAsync, addUserInfo, closeForm, refreshUser } from "../features/user/userSlice";
import axios from "axios";



export const UserRegisterForm = () => {
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            dispatch(closeForm());
            const name = e.target.elements.name.value;
            const imageFile = e.target.elements.imageFile.files[0];
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', imageFile)
            // Make the API request
            await axios.post('http://localhost:5000', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log('in try')
        } catch (error) {
            // Handle any errors
            // console.log('in catch')
            console.log(error);
        }

    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="" />
            </Form.Group>
            <Form.Group controlId="imageFile" className="mb-3">
                <Form.Label>Image File</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}