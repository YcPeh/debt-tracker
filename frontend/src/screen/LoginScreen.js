import React, { useEffect } from "react";
import { useState } from "react";
import FormContainer from "../component/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../features/register/registrantApiSlice";
import { setCredentials } from "../features/register/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { registrantInfo } = useSelector((store) => store.auth);

  useEffect(() => {
    if (registrantInfo) {
      navigate("/");
    }
  }, [navigate, registrantInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("login submitHandler");
    try {
      const res = await login({ email, password }).unwrap();
      console.log("res");
      console.log(res);
      // dispatch(setCredentials({ ...res }));
      dispatch(setCredentials(res));
      navigate("/");
    } catch (err) {
      // console.log(err?.data?.message || err.error);
      // console.log(err);
      toast.error(err?.data?.message || err.error);
      // toast.error(err);
      console.log(err);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
        <Row className="py-3">
          <Col>
            New User? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;