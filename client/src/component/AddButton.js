import { Button, Col, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { openForm } from "../features/user/userSlice";
import { Link } from 'react-router-dom';

export const AddButton = ({ colWidthAddButton }) => {

  const dispatch = useDispatch();

  return (
    <Col xs={colWidthAddButton}>
      <div className='divContainerAddButton'>
        <Button className='addButtonButton' variant='outline-primary' onClick={()=>dispatch(openForm())}>
          <Link to="/form">
            <Image
              className='addButtonImage'
              src='AddButton.png'
              alt='Add Button'
              roundedCircle
            />
          </Link>
        </Button>
      </div>
    </Col>
  )
}