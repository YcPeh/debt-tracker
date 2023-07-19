import { Button, Col, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { openForm } from "../features/user/userSlice";

export const AddButton = ({colWidthAddButton}) => {

  const dispatch = useDispatch();

  return (
    <Col xs={colWidthAddButton}>
      <div className='divContainerAddButton'>
        <Button className='addButtonButton' variant='outline-primary' onClick={()=>dispatch(openForm())}>
          <Image
            className='addButtonImage'
            src='AddButton.png'
            alt='Add Button'
            roundedCircle
          />
        </Button>
      </div>
    </Col>
  )
}