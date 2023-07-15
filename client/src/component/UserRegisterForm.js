import { Button, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addUserAsync, addUserInfo, closeForm } from "../features/user/userSlice";



export const UserRegisterForm = () => {
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(closeForm());

        const name = e.target.elements.name.value;
        // const imageFile = e.target.elements.imageFile.files[0].name;
        const imageFile = e.target.elements.imageFile.files[0];

        // console.log(e.target.elements.imageFile.files)

        // dispatch(addUserInfo({ name: name, imageFile: imageFile }));

        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result;
            const fileData = new Uint8Array(result);

            let formData = new FormData();
            formData.append('name', name);

            // formData.append('image', new Blob({ data: fileData }, { contentType: fileData.contentType }));

            // formData.append('image', { data: fileData})
            // formData.append('image', { contentType: fileData.contentType})

            // const imageObject = {data: fileData, contentType: imageFile.type }

            formData.append('image', imageFile)

            // formData.append('image', fileData)

            // console.log('imageFile.type')
            // console.log(imageFile.type)
            
            // formData.append('image', new Blob([fileData]), 'image.png');

            // console.log('formData.get(\'image\')', formData.get('image'));  // Log the object



            // To see the contents of the object, you can use console.log with the object as an argument

            // console.log('image data:', formData.get('image').data);

            // console.log('content type:', formData.get('image').contentType);

            dispatch(addUserAsync({ nameData: name, imageData: fileData, formData: formData }));
        };

        reader.readAsArrayBuffer(imageFile);


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