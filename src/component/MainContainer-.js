import { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { addUserInfo } from '../features/user/userSlice';
import { Button } from 'react-bootstrap';
import '../styles.css'


export function MainContainer() {
  const { userInfo } = useSelector((store) => store.user)

  const renderUserColumns = () => {
    const columns = userInfo.map((user) => (
      <Col key={user.id} xs={4}>
        <div className='userImageContainer'>
          <Image
            className='userImage'
            src={user.path}
            alt={user.name}
            roundedCircle
          />
        </div>
      </Col>
    ));

    const rows = [];
    for (let i = 0; i < columns.length; i += 3) {
      const row = (
        <Row key={i} className='mb-5'>
          {columns.slice(i, i + 3)}
        </Row>
      );
      rows.push(row);
    }

    return rows;
  };

  return (
    <Container>
      {renderUserColumns()}
      <Row className='mb-5'>
        {/* {userInfo.map((user) => (
                    <Col className='userImageContainerColumn' key={user.id} xs={6} md={4}>
                        <div className='userImageContainer'>
                            <Image
                                className='userImage'
                                src={user.path}
                                alt={user.name}
                                roundedCircle
                            />
                        </div>
                    </Col>
                ))} */}
        <div className='userImageContainerColumn'>
          <Col className='userAddImageContainerColumn' xs={4}>
            <Button className='userAddImageContainer' variant="outline-primary">
              <Image
                className='userAddImage'
                src="AddButton.png"
                alt="Add Button"
                roundedCircle
              />
            </Button>
          </Col>
        </div>

      </Row>
    </Container>
  )
}