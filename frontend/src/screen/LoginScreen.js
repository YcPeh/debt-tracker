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
import Loader from "../component/Loader";
import axios from "axios";
import {
  initiliaseTransaction,
  loadLineChart,
} from "../features/transaction/transactionSlice";
import { initialiseUserInfo } from "../features/user/userSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { registrantInfo } = useSelector((store) => store.auth);

  const getData = async () => {
    try {
      const res = await axios.get("/api");
      console.log("res.data.data in Login Screen");
      console.log(res.data.data);
      const userInfo = res.data.data
        .filter((data) => data.registrantId === registrantInfo._id)
        .map(({ name, imageName, imageUrl, customId, _id }) => ({
          name,
          imageName,
          imageUrl,
          customId,
          _id,
        }));
      // console.log('initialising UseEffect')
      dispatch(initialiseUserInfo(userInfo));
      const res2 = await axios.get("/api/userTransaction");
      const transaction = res2.data.data
        .filter((data) => data.registrantId === registrantInfo._id)
        .map(
          ({
            userName,
            userNameCustomId,
            customId,
            title,
            date,
            category,
            type,
            currency,
            amount,
            description,
          }) => ({
            userName,
            userNameCustomId,
            customId,
            title,
            date,
            category,
            type,
            currency,
            amount,
            description,
          })
        );
      dispatch(initiliaseTransaction(transaction));
      // console.log('useEffect App js dispatch loadLineChart')
      dispatch(loadLineChart());
    } catch (error) {
      console.log(error, "it has an error");
    }
  };

  useEffect(() => {
    if (registrantInfo) {
      // console.log("registrantInfo in useEffect of loginScreen");
      // console.log(registrantInfo);
      const registrantId = registrantInfo._id;
      const registrantName = registrantInfo.name;
      const registrantEmail = registrantInfo.email;
      getData();
      navigate("/userMainPage", {
        state: { registrantId, registrantName, registrantEmail },
      });
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
      // navigate("/");
      console.log("registrantInfo in loginScreen");
      console.log(registrantInfo);
      const registrantId = registrantInfo._id;
      const registrantName = registrantInfo.name;
      const registrantEmail = registrantInfo.email;
      navigate("/userMainPage", {
        state: { registrantId, registrantName, registrantEmail },
      });
    } catch (err) {
      // console.log(err?.data?.message || err.error);
      // console.log(err);
      toast.error(err?.data?.message || err.error);
      // toast.error(err);
      console.log(err);
    }
  };

  const handleForgotPassword = async () => {
    // const isValidEmail = (email) => {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   return emailRegex.test(email);
    // }

    const res = await axios.post("/api/registrant/email", {
      email: email,
    });
    console.log("res");
    console.log(res);
    if (res.data.success === false) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
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
        {isLoading && <Loader />}
        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
        <Row className="py-3">
          <Col className="text-start">
            New User? <Link to="/register">Register</Link>
          </Col>
          <Col className="text-end">
            <a href="#" onClick={handleForgotPassword}>
              Forgot Password?
            </a>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
