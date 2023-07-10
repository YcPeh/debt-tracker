import { useEffect, useRef } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { addUserInfo } from '../features/user/userSlice';
import { Button } from 'react-bootstrap';
import '../styles.css';

export function MainContainer() {
  const { userInfo } = useSelector((store) => store.user);
  // const firstRowRef = useRef();

  // useEffect(() => {
  //   const firstRowHeight = firstRowRef.current.offsetHeight;
  //   document.documentElement.style.setProperty('--row-height', `${firstRowHeight}px`);
  // }, []);

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
    let remainingColumns = columns;
    for (let i = 0; i < columns.length; i += 3) {
      remainingColumns = columns.slice(i+3)
      if (remainingColumns.length <= 0) {
        const row = (
          <Row className='mb-5'>
          {columns.slice(i, i + 3)}
          <Col xs={4}>
            <div className='userImageContainer'>
              <Button className='userAddImageContainer' variant="outline-primary">
                <Image
                  className='userAddImage'
                  src="AddButton.png"
                  alt="Add Button"
                  roundedCircle
                />
              </Button>
            </div>
          </Col>
        </Row>
        );
        rows.push(row);
      } else{
        const row = (
          <Row key={i} className='mb-5'>
            {columns.slice(i, i + 3)}
          </Row>
        );
        rows.push(row);
      }
      
      
    }

    return rows;
  };

  return (
    <Container>
      {renderUserColumns()}
      {/* <Row className='mb-5' style={{ height: 'var(--row-height)' }}>
        <Col xs={4}>
          <div className='userImageContainer'>
            <Button className='userAddImageContainer' variant="outline-primary">
              <Image
                className='userAddImage'
                src="AddButton.png"
                alt="Add Button"
                roundedCircle
              />
            </Button>
          </div>
        </Col>
      </Row> */}
    </Container>
  );
}
