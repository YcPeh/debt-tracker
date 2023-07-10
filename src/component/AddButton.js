import { Button, Col, Image } from "react-bootstrap"
// import '../styles.css';

export const AddButton = () => {
    return(
        <Col xs={4}>
            <div className='divContainerAddButton'>
              <Button className='addButtonButton' variant='outline-primary'>
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