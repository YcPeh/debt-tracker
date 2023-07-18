import { Button, Col, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import '../styles.css';
import { useState } from "react";
import axios from "axios";

export const UserProfile = (user) => {
  // const {colWidthUser} = useSelector((store) => store.user)
  // const colWidthUser = usersNum === 1 ? 6 : 4
  // console.log(user)
  // console.log(colWidthUser)
  const [isHovered, setIsHovered] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      // console.log(user._id);
      await axios.delete(`http://localhost:5000/${user._id}`);
    } catch (error) {
      console.log(error)
    }
  }

  const handleNameUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/${user._id}`, { name: editedName });
      // Optionally, you can update the user profile in the Redux store with the edited name
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

  const base64String = btoa(
    String.fromCharCode(...new Uint8Array(user.image.data.data))
  );
  return (
    <Col xs={user.colWidthUser} className="userColumn">
      <div className="divContainerUser" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Image
          className='userImage'
          src={`data:image/png;base64,${base64String}`}
          alt={user.name}
          roundedCircle
        />
        {isHovered && (
          <Button className="cross-button" variant='outline-primary' onClick={handleDelete}>
            <Image
              className="cross-button-image"
              src="cross button.png"
              alt="Cross Button"
              roundedCircle
            />
          </Button>
        )}
        <h5><input type="text" value={editedName} onChange={handleNameChange} onBlur={handleNameUpdate} /></h5>
      </div>

    </Col>
  )
}