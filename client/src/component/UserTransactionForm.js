import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { UserTransaction } from "./UserTransaction";
import { useNavigate } from "react-router-dom";

export const UserTransactionForm = () => {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();
    const handleClose = () => {
        setShow(false);
        navigate('/userTransaction');
    }
    const handleShow = () => setShow(true);
    return (
        <>
        {/* <UserTransaction/> */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}