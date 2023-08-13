import { Button, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { openForm } from "../features/user/userSlice";
import { Link } from "react-router-dom";

export const AddButton = ({
  colWidthAddButton,
  divClassName,
  linkToRoute,
  propsToPass,
}) => {
  const dispatch = useDispatch();
  // console.log("propsToPass");
  // console.log(propsToPass);
  return (
    <Col xs={colWidthAddButton} className="add-button-column">
      <div className={divClassName}>
        <Button className="addButtonButton" variant="outline-primary">
          {/* <Button className='addButtonButton' variant='outline-primary' onClick={()=>dispatch(openForm())}> */}
          <Link to={linkToRoute} state={propsToPass}>
            {/* <Link to="/form" className='addButtonButton'> */}
            <Image
              className="addButtonImage"
              src="/AddButton.png"
              alt="Add Button"
              roundedCircle
            />
          </Link>
        </Button>
      </div>
    </Col>
  );
};
