import { Button, Image } from "react-bootstrap"

export const EditButton = ({ handleUpdate }) => {
    return (
        <Button className="change-photo" variant='outline-primary' onClick={handleUpdate}>
            <Image
                className="change-photo-image"
                src="change photo.png"
                alt="Change Photo"
                roundedCircle
            />
        </Button>
    )
}