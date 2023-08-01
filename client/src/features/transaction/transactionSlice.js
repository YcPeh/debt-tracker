import { createSlice } from '@reduxjs/toolkit'

const getSortedDateTransaction = (transaction,userNameCustomId) => {
    const trimmedData = transaction.filter((trans) => trans.userNameCustomId === userNameCustomId)
        .map((trans) => {
            return {
                date: trans.date.substring(0, 10),
                amount: trans.amount,
                category: trans.category,
                userName: trans.userName,
            }
        });
    trimmedData.sort((a, b) => a.date.localeCompare(b.date));
    return trimmedData
};

const getNettAmount = (transaction) => {
    let nett = 0;
    const result = transaction.map((trans) => {
        if (trans.category === 'Debts') {
            nett += trans.amount;
        } else if (trans.category === 'Repayments') {
            nett -= trans.amount;
        }
        return {
            date: trans.date,
            category: trans.category,
            amount: nett,
            userName: trans.userName,
        };
    });
    return result;
};

const getSingleDate = (data) => {
    const result = [];
    let numOfDateSame = 0
    data.forEach((item, index) => {
        result.push(item);
        if (index >= 1 && result[index - numOfDateSame - 1].date === result[index - numOfDateSame].date) {
            result.splice(index - numOfDateSame - 1, 1)
            numOfDateSame += 1;
        }
    })
    return result
};

const initialState = {
    transaction: [],
    // selectedTransaction: [],
    debtRepayment: [],
    transType: [],
    sortedSingleDateTransactionWithNettAmount:[],
    userNameForLineChart:'',
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        initiliaseTransaction: (state, action) => {
            state.transaction = action.payload
        },
        addTransaction: (state, action) => {
            const newTransaction = action.payload;
            // console.log('newTransaction.date')
            // console.log(newTransaction.date)
            state.transaction = [...state.transaction, newTransaction]
        },
        deleteTransaction: (state, action) => {
            const idToRemove = action.payload;
            // console.log('idToRemove in deleteTransaction')
            // console.log(idToRemove)
            state.transaction = state.transaction.filter((trans) => trans.customId !== idToRemove)
        },
        updateTransaction: (state, action) => {
            // console.log('action.payload in updateTransaction')
            // console.log(action.payload)
            const { customId, ...updatedData } = action.payload;
            // console.log('...updatedData')
            // console.log(...updatedData)
            state.transaction = state.transaction.map((trans) => {
                if (trans.customId === customId) {
                    return { ...trans, ...updatedData }
                } else {
                    return trans
                }
            })
        },
        calculateDebtRepaymentBalance: (state, action) => {
            const userNameCustomId = action.payload;
            // console.log('userNameCustomId in calculateDebtRepaymentBalance reducer')
            // console.log(userNameCustomId)
            const debtRepayment = {
                totalDebtRM: 0,
                totalDebtTHB: 0,
                totalRepayRM: 0,
                totalRepayTHB: 0,
            };
            const transType = {
                debtConsumablesRM: 0,
                debtCashRM: 0,
                debtOnlineTransferRM: 0,
                debtConsumablesTHB: 0,
                debtCashTHB: 0,
                debtOnlineTransferTHB: 0,
                repayConsumablesRM: 0,
                repayCashRM: 0,
                repayOnlineTransferRM: 0,
                repayConsumablesTHB: 0,
                repayCashTHB: 0,
                repayOnlineTransferTHB: 0,
            };
            state.transaction.forEach((trans) => {
                if (trans.userNameCustomId === userNameCustomId) {
                    if (trans.category === 'Debts') {
                        if (trans.currency === 'RM') {
                            debtRepayment.totalDebtRM += trans.amount;
                            if (trans.type === 'Consumables') {
                                transType.debtConsumablesRM += trans.amount;
                            }
                            if (trans.type === 'Cash') {
                                transType.debtCashRM += trans.amount;
                            }
                            if (trans.type === 'Online Transfer') {
                                transType.debtOnlineTransferRM += trans.amount;
                            }
                        } else if (trans.currency === 'THB') {
                            debtRepayment.totalDebtTHB += trans.amount;
                            if (trans.type === 'Consumables') {
                                transType.debtConsumablesTHB += trans.amount;
                            }
                            if (trans.type === 'Cash') {
                                transType.debtCashTHB += trans.amount;
                            }
                            if (trans.type === 'Online Transfer') {
                                transType.debtOnlineTransferTHB += trans.amount;
                            }
                        }
                    } else if (trans.category === 'Repayments') {
                        if (trans.currency === 'RM') {
                            debtRepayment.totalRepayRM += trans.amount;
                            if (trans.type === 'Consumables') {
                                transType.repayConsumablesRM += trans.amount;
                            }
                            if (trans.type === 'Cash') {
                                transType.repayCashRM += trans.amount;
                            }
                            if (trans.type === 'Online Transfer') {
                                transType.repayOnlineTransferRM += trans.amount;
                            }
                        } else if (trans.currency === 'THB') {
                            debtRepayment.totalRepayTHB += trans.amount;
                            if (trans.type === 'Consumables') {
                                transType.repayConsumablesTHB += trans.amount;
                            }
                            if (trans.type === 'Cash') {
                                transType.repayCashTHB += trans.amount;
                            }
                            if (trans.type === 'Online Transfer') {
                                transType.repayOnlineTransferTHB += trans.amount;
                            }
                        }
                    }
                }
            });
            state.debtRepayment = debtRepayment;
            state.transType = transType;
        },
        loadLineChart: (state, action) => {
            // console.log('action.payload in loadLineChart')
            // console.log(action.payload)

            let userNameCustomId;
            let userNameForLineChart;
            if (action.payload === undefined || action.payload.userNameCustomId === '' || action.payload.userNameForLineChart === '') {
                userNameCustomId = state.transaction[0].userNameCustomId;
                userNameForLineChart = state.transaction[0].userName;
            } else {
                userNameCustomId = action.payload.userNameCustomId
                userNameForLineChart = action.payload.userNameForLineChart
            }
                
            

            // const userNameCustomId = action.payload.userNameCustomId || state.transaction[0].userNameCustomId;
            // const userNameForLineChart = action.payload.userNameForLineChart || state.transaction[0].userNameCustomId;
            // const userNameCustomId = action.payload || state.transaction[0].userNameCustomId;
            // const userNameForLineChart = action.payload || state.transaction[0].userNameCustomId;

            const sortedDateTransaction = getSortedDateTransaction(state.transaction,userNameCustomId);
            // console.log('sortedDateTransaction in loadLineChart reducer')
            // console.log(sortedDateTransaction)
            const sortedDateTransactionWithNettAmount = getNettAmount(sortedDateTransaction);
            const sortedSingleDateTransactionWithNettAmount = getSingleDate(sortedDateTransactionWithNettAmount);
            state.sortedSingleDateTransactionWithNettAmount = sortedSingleDateTransactionWithNettAmount;

            state.userNameForLineChart = userNameForLineChart;
        },
    }
});

export const { initiliaseTransaction, addTransaction, deleteTransaction, updateTransaction, calculateDebtRepaymentBalance, loadLineChart } = transactionSlice.actions;
export default transactionSlice.reducer;
