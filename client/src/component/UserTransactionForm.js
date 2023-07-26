import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap"
import { UserTransaction } from "./UserTransaction";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addTransaction, calculateDebtRepaymentBalance, updateTransaction } from "../features/transaction/transactionSlice";

export const UserTransactionForm = () => {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { userNameCustomId,
        userName,
        title,
        category,
        type,
        currency,
        amount,
        description,
        customId, } = location.state || {};

    const [isEditMode, setIsEditMode] = useState(!!location.state?.title);

    const handleClose = () => {
        setShow(false);
        navigate('/userTransaction');
    }
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setShow(false);
            console.log('handleSubmit')
            // navigate('/userTransaction');
            navigate(`/userTransaction`, {state:userNameCustomId});
            const title = e.target.elements.title.value;
            const category = e.target.elements.category.value;
            const type = e.target.elements.type.value;
            const currency = e.target.elements.currency.value;
            const amount = e.target.elements.amount.value;
            const description = e.target.elements.description.value;

            console.log('customId inside handleSubmit')
            console.log(customId)
            if (isEditMode) {
                const data = {
                    userNameCustomId,
                    userName,
                    title,
                    category,
                    type,
                    currency,
                    amount,
                    description,
                    customId,
                };
                console.log('userNameCustomId to pass in calculateDebtRepaymentBalance after submit EDIT')
                console.log(userNameCustomId)
                dispatch(updateTransaction(data))
                dispatch(calculateDebtRepaymentBalance(userNameCustomId));
                const res = await axios.put(`http://localhost:5000/userTransaction/${customId}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } else {
                const customId = new Date().getTime().toString();

                const data = {
                    userNameCustomId,
                    userName,
                    title,
                    category,
                    type,
                    currency,
                    amount,
                    description,
                    customId,
                };
                dispatch(addTransaction(data))
                dispatch(calculateDebtRepaymentBalance(userNameCustomId));
                const res = await axios.post('http://localhost:5000/userTransaction', data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }

        } catch (error) {
            console.log(error)
        }
    }


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
                            <Form.Label column sm={2}>Title:</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={title} /></Col>
                        </Form.Group>
                        <FloatingLabel className="mb-3" controlId="category" label="Category">
                            <Form.Select aria-label="Floating label select example" defaultValue={category}>
                                <option value="Debts">Debts</option>
                                <option value="Repayments">Repayments</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="type" label="Type">
                            <Form.Select aria-label="Floating label select example" defaultValue={type}>
                                <option value="Consumables">Consumables</option>
                                <option value="Cash">Cash</option>
                                <option value="Online Transfer">Online Transfer</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="currency" label="Currency">
                            <Form.Select aria-label="Floating label select example" defaultValue={currency}>
                                <option value="RM">RM</option>
                                <option value="THB">THB</option>
                            </Form.Select>
                        </FloatingLabel>
                        <Form.Group as={Row} className="mb-3" controlId="amount">
                            <Form.Label column sm={2}>Amount:</Form.Label>
                            <Col sm={10}><Form.Control type="number" step="0.01" defaultValue={amount} /></Col>
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
    )
}