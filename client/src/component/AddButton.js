import { Button, Col, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { openForm } from "../features/user/userSlice";
import { Link } from 'react-router-dom';

export const AddButton = ({ colWidthAddButton, divClassName }) => {

  const dispatch = useDispatch();

  return (
    <Col xs={colWidthAddButton}>
      <div className={divClassName}>
        <Button className='addButtonButton' variant='outline-primary'>
        {/* <Button className='addButtonButton' variant='outline-primary' onClick={()=>dispatch(openForm())}> */}
          <Link to="/form">
          {/* <Link to="/form" className='addButtonButton'> */}
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