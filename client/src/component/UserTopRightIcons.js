import { Button, Image } from "react-bootstrap"
import { DeleteButton } from "./DeleteButton"
import { EditButton } from "./EditButton"

export const UserTopRightIcons = ({handleDelete,handleUpdate,handleFileChange,inputRef}) => {
    return (
        <div className="topRightUserIcons">
            <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />
            <EditButton handleUpdate={handleUpdate}/>
            {/* <Button className="change-photo" variant='outline-primary' onClick={handleUpdate}>
                <Image
                    className="change-photo-image"
                    src="change photo.png"
                    alt="Change Photo"
                    roundedCircle
                />
            </Button> */}
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