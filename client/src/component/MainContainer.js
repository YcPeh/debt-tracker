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
  console.log('userInfo inside MainContainer.js but outside of Routes and Container')
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
          <UserProfile key={user.customId} {...user} colWidthUser={colWidthUser}/>
        ))
  
        const addButtonSameRow = (userInfo.length - i <= 3)
        
        const row = (
          <Row key={rows.length} className='mb-5'>
            {user3Columns}
            {addButtonSameRow && 
              <AddButton colWidthAddButton={colWidthAddButton} divClassName={'divContainerAddButton'}/>
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


  // return (
  //   userInfo !== null && (
  //   <Container>
  //     {showForm ? <UserRegisterForm/>
  //     : renderUserProfiles()}
  //   </Container>
  //   )
  // );

  // Can work most
  return (
    <Container>
      {/* <Routes> */}
        {console.log('inside Routes of MainContainer.js')}
        {userInfo !== null && renderUserProfiles()}
        {/* <Route path="/form" element={<UserRegisterForm />} /> */}
        {/* <Route path="/userTransaction" element={<UserTransaction />} /> */}
      {/* </Routes> */}
    </Container>
  );

  // return (
  //   <Container>
  //     <Routes>
  //       {console.log('inside Routes of MainContainer.js')}
  //       {userInfo !== null && (showForm ? <Route path="/form" element={<UserRegisterForm />} />
  //       : <Route path="/" element={renderUserProfiles()} />)}
  //     </Routes>
  //   </Container>
  // );

  // return (
  //   <Container>
  //     {console.log('inside <Container> of MainContainer.js')}
  //     {console.log('userInfo beside Routes')}
  //     {console.log(userInfo)}
  //     {userInfo !== null && (showForm ? navigate('/form')
  //      : navigate('/'))}
  //     <Routes>
  //       <Route path="/" element={renderUserProfiles()} />
  //       <Route path="/form" element={<UserRegisterForm />} />
  //     </Routes>
  //   </Container>
  // );
}
