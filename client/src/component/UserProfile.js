import { Button, Col, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import '../styles.css';
import { useState, useRef } from "react";
import axios from "axios";
import { deleteUserInfo, updateUserPhoto } from "../features/user/userSlice";

export const UserProfile = (user) => {
  const [isHovered, setIsHovered] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  console.log('user in UserProfile.js')
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
  
  const handlePhotoUpdate = async (e) => {
    console.log('handlePhotoUpdate')
    inputRef.current.click();
  }

  const handleFileChange = async (e) => {
    try {
      const imageFile = e.target.files && e.target.files[0];
      if (!imageFile) {
        return;
      }
      // console.log('imageFile is', imageFile)
      // console.log(e.target.files);;
      // e.target.value = null;
      // console.log(e.target.files);
      console.log(imageFile);
      console.log(imageFile.name);
      dispatch(updateUserPhoto({ imageName: imageFile.name, customId: user.customId }));
      const formData = new FormData();
      formData.append("image", imageFile);
      // formData.append("imageName", imageFile.name);
      const res = await axios.put(`http://localhost:5000/${user.customId}/userPhoto`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
      console.log('res')
      console.log(res)
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
        <h1><input type="text" value={editedName} onChange={handleNameChange} onBlur={handleNameUpdate} /></h1>
      </div>

    </Col>
  )
}