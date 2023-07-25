import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import '../styles.css';
import { UserProfile } from './UserProfile';
import { AddButton } from './AddButton';
import { UserRegisterForm } from './UserRegisterForm';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import { UserTransaction } from './UserTransaction';

export const MainContainer = () => {
  const { userInfo, showForm } = useSelector((store) => store.user);
  const navigate = useNavigate();
  console.log('userInfo inside MainContainer.js but outside of return statement')
  console.log(userInfo)
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
        console.log('renderUserProfiles for loop')
        const user3Columns = userInfo.slice(i, i + 3).map((user) => (
          <UserProfile key={user.customId} user={user} colWidthUser={colWidthUser}/>
        ))
  
        const addButtonSameRow = (userInfo.length - i <= 3)
        
        const row = (
          <Row key={rows.length} className='mb-5'>
            {user3Columns}
            {addButtonSameRow && 
              <AddButton colWidthAddButton={colWidthAddButton} divClassName={'divContainerAddButton'} linkToRoute={'/userRegisterForm'}/>
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
        {console.log('inside return statement of MainContainer.js')}
        {userInfo !== null && renderUserProfiles()}
    </Container>
  );

}
