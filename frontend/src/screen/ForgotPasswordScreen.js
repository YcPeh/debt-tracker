import axios from "axios";
import { Button, Card, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

const ForgotPasswordScreen = () => {
  const location = useLocation();
  // console.log("location in forgot password");
  // console.log(location);
  // const {email}  = location.state
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Password is sent to your email</h1>
          <p></p>
          <div className="d-flex">
            <LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary">Register</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};
export default ForgotPasswordScreen;
