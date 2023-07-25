import { Button, Image } from "react-bootstrap"
import { DeleteButton } from "./DeleteButton"

export const UserTopRightIcons = ({handleDelete,handlePhotoUpdate,handleFileChange,inputRef}) => {
    return (
        <div className="topRightUserIcons">
            <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />
            <Button className="change-photo" variant='outline-primary' onClick={handlePhotoUpdate}>
                <Image
                    className="change-photo-image"
                    src="change photo.png"
                    alt="Change Photo"
                    roundedCircle
                />
            </Button>
            <DeleteButton handleDelete={handleDelete}/>
            {/* <Button className="cross-button" variant='outline-primary' onClick={handleDelete}>
                <Image
                    className="cross-button-image"
                    src="cross button.png"
                    alt="Cross Button"
                    roundedCircle
                />
            </Button> */}
        </div>
    )

}