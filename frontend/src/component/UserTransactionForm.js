import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { UserTransaction } from "./UserTransaction";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  calculateDebtRepaymentBalance,
  updateTransaction,
} from "../features/transaction/transactionSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const UserTransactionForm = () => {
  const { registrantInfo } = useSelector((store) => store.auth);
  const [show, setShow] = useState(true);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateConverted, setDateConverted] = useState();

  // console.log("selectedDate");
  // console.log(selectedDate);
  // console.log("dateConverted");
  // console.log(dateConverted);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    userNameCustomId,
    userName,
    title,
    date,
    category,
    type,
    currency,
    amount,
    description,
    customId,
    // registrantId,
  } = location.state || {};
  const registrantId = registrantInfo._id;
  //   console.log("registrantId in UserTransactionForm");
  //   console.log(registrantId);
  useEffect(() => {
    console.log("date");
    console.log(date);
    if (date !== undefined) {
      const dateString = date.replace(",", ".");
      setDateConverted(new Date(dateString));
      console.log("dateConverted IS set");
    } else {
      console.log("dateConverted NOT set");
    }
  }, [date]);

  const [isEditMode, setIsEditMode] = useState(!!location.state?.title);

  const handleClose = () => {
    setShow(false);
    // navigate('/userTransaction');
    navigate("/userTransaction", { state: { userNameCustomId, userName } });
  };
  // const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      handleClose();
      // console.log("selectedDate");
      // console.log(selectedDate);
      console.log("dateConverted");
      console.log(dateConverted);
      const title = e.target.elements.title.value;
      const timeZone = "Asia/Kuala_Lumpur";
      const options = {
        timeZone: timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        // millisecond: 'numeric',
        fractionalSecondDigits: 3,
      };
      // const date = selectedDate.toLocaleString("sv-SE", options);
      const date = dateConverted.toLocaleString("sv-SE", options);
      const category = e.target.elements.category.value;
      const type = e.target.elements.type.value;
      const currency = e.target.elements.currency.value;
      const amount = parseFloat(e.target.elements.amount.value);
      const description = e.target.elements.description.value;

      if (isEditMode) {
        const data = {
          userNameCustomId,
          registrantId,
          userName,
          title,
          date,
          category,
          type,
          currency,
          amount,
          description,
          customId,
        };
        dispatch(updateTransaction(data));
        dispatch(calculateDebtRepaymentBalance(userNameCustomId));
        // const res = await axios.put(`http://localhost:5000/userTransaction/${customId}`, data, {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
        const res = await axios.put(`/api/userTransaction/${customId}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        const customId = new Date().getTime().toString();

        const data = {
          userNameCustomId,
          registrantId,
          userName,
          title,
          date,
          category,
          type,
          currency,
          amount,
          description,
          customId,
        };
        dispatch(addTransaction(data));
        dispatch(calculateDebtRepaymentBalance(userNameCustomId));
        // const res = await axios.post('http://localhost:5000/userTransaction', data, {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // });
        const res = await axios.post("/api/userTransaction", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <UserTransaction/> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Transaction Modal Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column sm={2}>
                Title:
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" defaultValue={title} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="date">
              <Form.Label column sm={2}>
                Date:
              </Form.Label>
              <Col sm={10}>
                <DatePicker
                  // selected={selectedDate}
                  // selected={(date === undefined) ? selectedDate : date}
                  // selected={
                  //   dateConverted === undefined ? selectedDate : dateConverted
                  // }
                  selected={dateConverted}
                  onChange={(date) => {
                    // setSelectedDate(date);
                    setDateConverted(date);
                  }}
                  dateFormat="yyyy-MM-dd"
                  className="date"
                  // value={date}
                  // value={dateConverted}
                  // value={selectedDate}
                />
              </Col>
            </Form.Group>
            <FloatingLabel
              className="mb-3"
              controlId="category"
              label="Category"
            >
              <Form.Select
                aria-label="Floating label select example"
                defaultValue={category}
              >
                <option value="Debts">Debts</option>
                <option value="Repayments">Repayments</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="type" label="Type">
              <Form.Select
                aria-label="Floating label select example"
                defaultValue={type}
              >
                <option value="Consumables">Consumables</option>
                <option value="Cash">Cash</option>
                <option value="Online Transfer">Online Transfer</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel
              className="mb-3"
              controlId="currency"
              label="Currency"
            >
              <Form.Select
                aria-label="Floating label select example"
                defaultValue={currency}
              >
                <option value="RM">RM</option>
                <option value="THB">THB</option>
              </Form.Select>
            </FloatingLabel>
            <Form.Group as={Row} className="mb-3" controlId="amount">
              <Form.Label column sm={2}>
                Amount:
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="number" step="0.01" defaultValue={amount} />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control as="textarea" rows={4} defaultValue={description} />
            </Form.Group>
            <Form.Group as={Row}>
              <Col className="p-0" xs={{ span: 2, offset: 8 }}>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Col>
              <Col className="p-0" xs={{ span: 2, offset: 0 }}>
                {isEditMode ? (
                  <Button variant="primary" type="submit">
                    Edit
                  </Button>
                ) : (
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                )}
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
