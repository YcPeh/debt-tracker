import { useEffect, useRef } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { addUserInfo } from '../features/user/userSlice';
import { Button } from 'react-bootstrap';
import '../styles.css';
import { UserProfile } from './UserProfile';
import { AddButton } from './AddButton';

export const MainContainer = () => {
  const { userInfo } = useSelector((store) => store.user);
  // const firstRowRef = useRef();

  // useEffect(() => {
  //   const firstRowHeight = firstRowRef.current.offsetHeight;
  //   document.documentElement.style.setProperty('--row-height', `${firstRowHeight}px`);
  // }, []);


  const renderUserProfiles = () => {
    const rows = [];
    for (let i = 0; i < userInfo.length; i += 3) {
      const user3Columns = userInfo.slice(i, i + 3).map((user) => (
        <UserProfile {...user}/>
      ))

      const addButtonSameRow = (userInfo.length - i <= 3)
        
      const row = (
        <Row key={rows.length} className='mb-5'>
          {user3Columns}
          {addButtonSameRow && 
            <AddButton/>
          }
        </Row>
      )
      rows.push(row);
    }
    return rows;
  };

  


  return (
    <Container>
      {renderUserProfiles()}
    </Container>
  );
}
