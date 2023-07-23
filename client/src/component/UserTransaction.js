import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { AddButton } from "./AddButton";
import { useSelector } from "react-redux";

export const UserTransaction = () => {
    // const location = useLocation();
    // const user = location.state || {}; 
    // const { name, customId } = user;
    const {selectedUserInfo} = useSelector((store) => store.user);

    

    const {name, customId} = selectedUserInfo || {};
    if (!name || !customId) {
        return <div>Loading...</div>
    }

    console.log('selectedUserInfo in UserTransaction')
    console.log(selectedUserInfo)

    return (
        <Container fluid>
            <Row>
                <Col xs={12}><center><h1>{name}</h1></center></Col>
            </Row>
            <div className="hl"></div>

            <div className="user-transaction-content">
                <section className="left-section">
                    <Row className="UserTransactionTitles">
                        <Col xs={10}>
                            <h1>Debts</h1>
                        </Col>
                        <Col xs={2}>
                            <AddButton divClassName={'divContainerAddButtonTransaction'} linkToRoute={'/userTransaction/userTransactionForm'}/>
                        </Col>
                    </Row>
                    <Row>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Accordion Item #1</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Accordion Item #2</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Row>
                </section>
                <div className="vl"></div>
                <section className="right-section">
                    <p>haha</p>
                    <p>haha</p>
                    <p>haha</p>
                </section>

            </div>
            {console.log('UserTransaction end')}
        </Container>
        
    );
}