import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import '../styles.css';
import { UserProfile } from './UserProfile';
import { AddButton } from './AddButton';
import { UserRegisterForm } from './UserRegisterForm';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { RenderUserProfiles } from './RenderUserProfile';
// import { UserTransaction } from './UserTransaction';

export const MainContainer = () => {
  

  const { userInfo } = useSelector((store) => store.user);
  return (
    <Container>
        {console.log('inside return statement of MainContainer.js')}
        {/* {userInfo !== null && renderUserProfiles()} */}
        {/* {userInfo !== null && <RenderUserProfiles userInfo={userInfo}/>} */}
        <RenderUserProfiles/>
    </Container>
  );

}
