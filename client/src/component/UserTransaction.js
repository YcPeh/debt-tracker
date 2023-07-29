import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AddButton } from "./AddButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { calculateDebtRepaymentBalance, deleteTransaction, initiliaseTransaction, loadLineChart } from "../features/transaction/transactionSlice";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { HomeButton } from "./HomeButton";
import RenderBarChart from "./RenderBarChart";
import RenderDoughnutChart from "./RenderDoughnutChart";

export const UserTransaction = () =>{ 
    const location = useLocation();
    const {userNameCustomId, userName} = location.state || {}; 
    console.log('location.state UserTransaction')
    console.log(location.state)
    // console.log('userNameCustomId in UserTransaction')
    // console.log(userNameCustomId)
    const { selectedUserInfo } = useSelector((store) => store.user);
    const { transaction, debtRepayment, transType} = useSelector((store) => store.transaction);
    // console.log('transaction in UserTransaction start')
    // console.log(transaction)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = () => {
        try {
            // const res = await axios.get('http://localhost:5000/userTransaction')
            // const transaction = res.data.data.map(({
            //     userName, userNameCustomId, customId, title, date, category, type, currency, amount, description,
            // }) => ({
            //     userName, userNameCustomId, customId, title, date, category, type, currency, amount, description,
            // }));
            // dispatch(initiliaseTransaction(transaction));
            dispatch(calculateDebtRepaymentBalance(userNameCustomId));
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        getData();
    }, []);


    const { name, customId } = selectedUserInfo;
    if (!name || !customId) {
        navigate('/');
        // return <div>Loading selectedUserInfo from Redux store, go check redux console...</div>
    }

    const handleDelete = async (customId) => {
        try {
            // console.log('customId in handleDelete of UserTransaction');
            // console.log(customId);
            await axios.delete(`http://localhost:5000/userTransaction/${customId}`);
            dispatch(deleteTransaction(customId));
            dispatch(calculateDebtRepaymentBalance(userNameCustomId));
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = (props) => {
        // console.log('handleUpdate')
        // console.log('props')
        // console.log(props)
        navigate('/userTransaction/userTransactionForm', {state: props})
    }

    const handleHome = () => {
        dispatch(loadLineChart({userNameCustomId,userNameForLineChart:userName}));
        navigate('/');
    }

    const handleTransaction = (category) => {
        return (
            transaction && transaction.map((trans, index) => {
                if (trans.userNameCustomId === selectedUserInfo.customId) {
                    if (trans.category === category) {
                        const bodyInfo = [
                            { label: 'date', value: trans.date },
                            { label: 'category', value: trans.category },
                            { label: 'type', value: trans.type },
                            { label: 'description', value: trans.description },
                        ];
                        return (
                            <Accordion key={trans.customId}>
                                <Accordion.Item eventKey={trans.customId}>
                                    <Row>
                                        <Col className="p-0 d-flex justify-content-center align-items-center" xs={{ span: 1, offset: 1 }}>
                                            {/* <DeleteButton/> */}
                                            <DeleteButton handleDelete={()=>handleDelete(trans.customId)} key={trans.customId}/>
                                        </Col>
                                        <Col className="p-0 d-flex justify-content-center align-items-center" xs={{ span: 1, offset: 0 }}>
                                            <EditButton handleUpdate={() => handleUpdate({
                                                category,
                                                userNameCustomId: customId,
                                                userName: name,
                                                title: trans.title,
                                                date: trans.date,
                                                category: trans.category,
                                                type: trans.type,
                                                currency: trans.currency,
                                                amount: trans.amount,
                                                description: trans.description,
                                                customId: trans.customId,
                                            })} />
                                        </Col>
                                        <Col xs={{ span: 9, offset: 0 }}>
                                            <Accordion.Header>
                                                <Col className="p-0 d-flex justify-content-center text-center text-wrapper" xs={{ span: 5, offset: 0 }}>
                                                    {trans.title}
                                                </Col>
                                                <Col className="p-0 d-flex justify-content-center" xs={{ span: 1, offset: 0 }}>
                                                    |
                                                </Col>
                                                <Col className="p-0 d-flex justify-content-end text-wrapper" xs={{ span: 3, offset: 0 }}>
                                                    {trans.currency} {trans.amount}
                                                </Col>
                                            </Accordion.Header>
                                        </Col>
                                    </Row>
                                    <Accordion.Body>
                                        {bodyInfo.map((info, innerIndex) => (
                                            <Row key={innerIndex}>
                                                <Col className="p-0 d-flex justify-content-start text-wrapper" xs={{ span: 3, offset: 1 }}>
                                                    {info.label}
                                                </Col>
                                                <Col className="p-0 d-flex justify-content-center" xs={{ span: 1, offset: 0 }}>
                                                    :
                                                </Col>
                                                <Col className="p-0 d-flex justify-content-start text-wrapper" xs={{ span: 7, offset: 0 }}>
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
    // console.log('transaction in UserTransaction end (before return)')

    return (
        <Container fluid>
            <Row>
                <Col className="d-flex justify-content-end" xs={{ offset: 11, span: 1 }}>
                    <HomeButton handleHome={handleHome}/>
                </Col>
            </Row>
            <Row>
                <Col xs={{span:3, offset:0}}>
                    <RenderDoughnutChart 
                    ConsumablesRM={transType.debtConsumablesRM}
                    CashRM={transType.debtCashRM}
                    OnlineTransferRM={transType.debtOnlineTransferRM}
                    ConsumablesTHB={transType.debtConsumablesTHB}
                    CashTHB={transType.debtCashTHB}
                    OnlineTransferTHB={transType.debtOnlineTransferTHB}
                    title={'Debt Transaction Type'}
                    />
                </Col>
                <Col xs={{span:3, offset:0}}>
                    <RenderBarChart totalDebt={debtRepayment.totalDebtRM} remainingDebt={debtRepayment.totalDebtRM-debtRepayment.totalRepayRM} labels='Debts (RM)' currency={'RM'}/>
                </Col>
                <Col xs={{span:3, offset:0}}>
                    <RenderBarChart totalDebt={debtRepayment.totalDebtTHB} remainingDebt={debtRepayment.totalDebtTHB-debtRepayment.totalRepayTHB} labels='Debts (THB)' currency={'THB'}/>
                </Col>
                <Col xs={{span:3, offset:0}}>
                    <RenderDoughnutChart 
                    ConsumablesRM={transType.repayConsumablesRM}
                    CashRM={transType.repayCashRM}
                    OnlineTransferRM={transType.repayOnlineTransferRM}
                    ConsumablesTHB={transType.repayConsumablesTHB}
                    CashTHB={transType.repayCashTHB}
                    OnlineTransferTHB={transType.repayOnlineTransferTHB}
                    title={'Repayment Transaction Type'}
                    />
                </Col>
            </Row>
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