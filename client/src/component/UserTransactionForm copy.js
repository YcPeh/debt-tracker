import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap"
import { UserTransaction } from "./UserTransaction";
import { useLocation, useNavigate } from "react-router-dom";

export const UserTransactionForm = () => {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const {category} = location.state || {};


    const handleClose = () => {
        setShow(false);
        navigate('/userTransaction');
    }
    const handleShow = () => setShow(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setShow(false);

        console.log('e.target')
        console.log(e.target)
        console.log('e.target.title')
        console.log(e.target.title)
        console.log('e.target.elements')
        console.log(e.target.elements)
        const title = e.target.elements.title.value;
        const category = e.target.elements.category.value;
        const type = e.target.elements.type.value;
        const currency = e.target.elements.currency.value;
        const description = e.target.elements.description.value;
        console.log('title')
        console.log(title)
        console.log('category')
        console.log(category)
        console.log('type')
        console.log(type)
        console.log('currency')
        console.log(currency)
        console.log('description')
        console.log(description)

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
                            <Col sm={10}><Form.Control type="text" /></Col>
                        </Form.Group>
                        <FloatingLabel className="mb-3" controlId="category" label="Category">
                            <Form.Select aria-label="Floating label select example" defaultValue={category}>
                                <option value="debts">Debts</option>
                                <option value="repayments">Repayments</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="type" label="Type">
                            <Form.Select aria-label="Floating label select example">
                                <option value="consumables">Consumables</option>
                                <option value="cash">Cash</option>
                                <option value="onlineTransfer">Online Transfer</option>
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="currency" label="Currency">
                            <Form.Select aria-label="Floating label select example">
                                <option value="rm">RM</option>
                                <option value="thb">THB</option>
                            </Form.Select>
                        </FloatingLabel>
                        <Form.Group as={Row} className="mb-3" controlId="amount">
                            <Form.Label column sm={2}>Amount:</Form.Label>
                            <Col sm={10}><Form.Control type="number" /></Col>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" rows={4} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}