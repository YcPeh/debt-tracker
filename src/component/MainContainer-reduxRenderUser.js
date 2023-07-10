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
  const { userInfo, userRows } = useSelector((store) => store.user);
  const firstRowRef = useRef();
  const dispatch = useDispatch();

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
        <Row key={i}  className='mb-5'>
          {columns.slice(i, i + 3)}
        </Row>
      );
      rows.push(row);
    }
    console.log(rows);
    return rows;
    
  };

  // useEffect(() => {
  //   const firstRowHeight = firstRowRef.current.offsetHeight;
  //   document.documentElement.style.setProperty('--row-height', `${firstRowHeight}px`);
  // }, []);

  useEffect(() => {
    const rows = renderUserColumns();
    dispatch(addUserInfo(rows));
  }, [userInfo])



  return (
    <Container>
      {userRows}
      <Row className='mb-5' style={{ height: 'var(--row-height)' }}>
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
    </Container>
  );
}
