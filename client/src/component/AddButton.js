import { Button, Col, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { openForm } from "../features/user/userSlice";
// import '../styles.css';

export const AddButton = ({colWidthAddButton}) => {
  // console.log('input')
  // console.log(input)
  const dispatch = useDispatch();
  // const colWidthAddButton = 1;
  // const {colWidthAddButton} = useSelector((store) => store.user)
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