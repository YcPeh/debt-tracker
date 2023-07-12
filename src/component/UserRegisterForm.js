import { Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addUserInfo, closeForm } from "../features/user/userSlice";



export const UserRegisterForm = () => {
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(closeForm());

        const name = e.target.elements.name.value;
        const imageFile = e.target.elements.imageFile.files[0].name;

        dispatch(addUserInfo({ name: name, path: imageFile }));
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