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
    while (remainingColumns.length > 0) {
      const slicedColumns = remainingColumns.slice(0, 3);
      const addAddButton = slicedColumns.length < 3 && remainingColumns.length <= 3;
  
      const row = (
        <Row key={rows.length} className='mb-5'>
          {slicedColumns}
          {addAddButton && (
            <Col xs={4}>
              <div className='userImageContainer'>
                <Button className='userAddImageContainer' variant='outline-primary'>
                  <Image
                    className='userAddImage'
                    src='AddButton.png'
                    alt='Add Button'
                    roundedCircle
                  />
                </Button>
              </div>
            </Col>
          )}
        </Row>
      );
      rows.push(row);
  
      remainingColumns = remainingColumns.slice(3);
    }
  
    return rows;
  };
  

  return (
    <Container>
      {renderUserColumns()}
    </Container>
  );
}
