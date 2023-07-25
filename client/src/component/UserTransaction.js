import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { AddButton } from "./AddButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { deleteTransaction, initiliaseTransaction } from "../features/transaction/transactionSlice";
import { DeleteButton } from "./DeleteButton";

export const UserTransaction = () =>{ 
    // const location = useLocation();
    // const user = location.state || {}; 
    // console.log('user in UserTransaction')
    // console.log(user)
    const { selectedUserInfo } = useSelector((store) => store.user);
    const { transaction } = useSelector((store) => store.transaction);
    console.log('transaction in UserTransaction start')
    console.log(transaction)
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/userTransaction')
            const transaction = res.data.data.map(({
                userName, userNameCustomId, customId, title, category, type, currency, amount, description,
            }) => ({
                userName, userNameCustomId, customId, title, category, type, currency, amount, description,
            }));
            dispatch(initiliaseTransaction(transaction));
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        getData();
    }, []);


    const { name, customId } = selectedUserInfo || {};
    if (!name || !customId) {
        return <div>Loading selectedUserInfo from Redux store, go check redux console...</div>
    }

    const handleDelete = async (customId) => {
        try {
            console.log('customId in handleDelete of UserTransaction')
            console.log(customId)
            await axios.delete(`http://localhost:5000/userTransaction/${customId}`);
            dispatch(deleteTransaction(customId))
        } catch (error) {
            console.log(error)
        }
    }

    const handleTransaction = (category) => {
        return (
            transaction && transaction.map((trans, index) => {
                if (trans.userNameCustomId === selectedUserInfo.customId) {
                    if (trans.category === category) {
                        const bodyInfo = [
                            { label: 'type', value: trans.type },
                            { label: 'category', value: trans.category },
                            { label: 'description', value: trans.description },
                        ];
                        return (
                            <Accordion key={trans.customId}>
                                <Accordion.Item eventKey={trans.customId}>
                                    <Row>
                                        <Col className="p-0 d-flex justify-content-center align-items-center" xs={{ span: 2, offset: 0 }}>
                                            <DeleteButton handleDelete={()=>handleDelete(trans.customId)} key={trans.customId}/>
                                        </Col>
                                        <Col xs={{ span: 10, offset: 0 }}>
                                            <Accordion.Header>
                                                <Col className="p-0 d-flex justify-content-center" xs={{ span: 6, offset: 0 }}>
                                                    {trans.title}
                                                </Col>
                                                <Col className="p-0 d-flex justify-content-center" xs={{ span: 1, offset: 0 }}>
                                                    |
                                                </Col>
                                                <Col className="p-0 d-flex justify-content-center" xs={{ span: 3, offset: 0 }}>
                                                    {trans.currency} {trans.amount}
                                                </Col>
                                            </Accordion.Header>
                                        </Col>
                                    </Row>
                                    <Accordion.Body>
                                        {bodyInfo.map((info, innerIndex) => (
                                            <Row key={innerIndex}>
                                                <Col className="p-0 d-flex justify-content-end" xs={{ span: 3, offset: 0 }}>
                                                    {info.label}
                                                </Col>
                                                <Col className="p-0 d-flex justify-content-center" xs={{ span: 1, offset: 0 }}>
                                                    :
                                                </Col>
                                                <Col className="p-0 d-flex justify-content-start" xs={{ span: 8, offset: 0 }}>
                                                    {info.value}
                                                </Col>
                                            </Row>
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )
                    }
                }
            })
        )
    }
    console.log('transaction in UserTransaction end (before return)')

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
                            <AddButton divClassName={'divContainerAddButtonTransaction'} linkToRoute={'/userTransaction/userTransactionForm'} propsToPass={{ category: 'Debts', userNameCustomId: customId, userName: name }} />
                        </Col>
                    </Row>
                    <Row>
                        {handleTransaction('Debts')}
                    </Row>
                </section>
                <div className="vl"></div>
                <section className="right-section">
                    <Row className="UserTransactionTitles">
                        <Col xs={10}>
                            <h1>Repayments</h1>
                        </Col>
                        <Col xs={2}>
                            <AddButton divClassName={'divContainerAddButtonTransaction'} linkToRoute={'/userTransaction/userTransactionForm'} propsToPass={{ category: 'Repayments', userNameCustomId: customId, userName: name }} />
                        </Col>
                    </Row>
                    <Row>
                        {handleTransaction('Repayments')}
                    </Row>
                </section>

            </div>
        </Container>

    );
}