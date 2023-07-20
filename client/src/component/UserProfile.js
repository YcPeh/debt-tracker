import { Button, Col, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import '../styles.css';
import { useState } from "react";
import axios from "axios";
import { deleteUserInfo } from "../features/user/userSlice";

export const UserProfile = (user) => {
  const [isHovered, setIsHovered] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const dispatch = useDispatch();
  console.log('user')
  console.log(user)

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/${user.customId}`);
      dispatch(deleteUserInfo(user.customId))
    } catch (error) {
      console.log(error)
    }
  }

  const handleNameUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/${user.customId}`, { name: editedName });
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

  const imagePath = `${process.env.PUBLIC_URL}/uploads/${user.imageName}`
  return (
    <Col xs={user.colWidthUser} className="userColumn">
      <div className="divContainerUser" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Image
          className='userImage'
          src={imagePath}
          alt={user.name}
          roundedCircle
        />
        {isHovered && (
          <div className="topRightUserIcons">
            <Button className="change-photo" variant='outline-primary'>
            <Image
                className="change-photo-image"
                src="change photo.png"
                alt="Change Photo"
                roundedCircle
              />
            </Button>
            <Button className="cross-button" variant='outline-primary' onClick={handleDelete}>
              <Image
                className="cross-button-image"
                src="cross button.png"
                alt="Cross Button"
                roundedCircle
              />
            </Button>
          </div>
        )}
        <h5><input type="text" value={editedName} onChange={handleNameChange} onBlur={handleNameUpdate} /></h5>
      </div>

    </Col>
  )
}