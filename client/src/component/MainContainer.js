import { useEffect, useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { addUserInfo, setColWidth } from '../features/user/userSlice';
import { Button } from 'react-bootstrap';
import '../styles.css';
import { UserProfile } from './UserProfile';
import { AddButton } from './AddButton';
import { UserRegisterForm } from './UserRegisterForm';

export const MainContainer = () => {
  const { userInfo, showForm } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(setColWidth(userNum));
  // }, [userNum]);

  // const [userNum, setUsersNum] = useState(0)

  const renderUserProfiles = () => {
    const rows = [];
    if (userInfo.length > 0) {
      for (let i = 0; i < userInfo.length; i += 3) {
        const usersNum = userInfo.slice(i, i + 3).length

        let colWidthUser;
        let colWidthAddButton;
        if (usersNum === 1) {
          colWidthUser = 6;
          colWidthAddButton = 6;
        } else if (usersNum === 3) {
          colWidthUser = 4;
          colWidthAddButton = 12;
        } else {
          colWidthUser = 4;
          colWidthAddButton = 4;
        }

        const user3Columns = userInfo.slice(i, i + 3).map((user) => (
          <UserProfile key={user.id} {...user} colWidthUser={colWidthUser}/>
        ))
  
        const addButtonSameRow = (userInfo.length - i <= 3)
        
        const row = (
          <Row key={rows.length} className='mb-5'>
            {user3Columns}
            {addButtonSameRow && 
              <AddButton colWidthAddButton={colWidthAddButton} />
            }
          </Row>
        )
        rows.push(row);
      }
      return rows;
    } else{
      const row = (
        <Row key={rows.length} className='mb-5'>
            <AddButton/>
        </Row>
      )
      rows.push(row);
    }
    return rows;
  };


  return (
    <Container>
      {showForm ? <UserRegisterForm/>
      : renderUserProfiles()}
    </Container>
  );
}
