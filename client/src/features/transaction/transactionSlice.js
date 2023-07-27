import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    transaction: [],
    // selectedTransaction: [],
    debtRepayment: [],
    transType:[],
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
            console.log('newTransaction.date')
            console.log(newTransaction.date)
            state.transaction = [...state.transaction, newTransaction]
        },
        deleteTransaction: (state, action) => {
            const idToRemove = action.payload;
            // console.log('idToRemove in deleteTransaction')
            // console.log(idToRemove)
            state.transaction = state.transaction.filter((trans) => trans.customId !== idToRemove)
        },
        updateTransaction: (state, action) => {
            console.log('action.payload in updateTransaction')
            console.log(action.payload)
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
                debtCashRM:0,
                debtOnlineTransferRM:0,
                debtConsumablesTHB: 0,
                debtCashTHB:0,
                debtOnlineTransferTHB:0,
                repayConsumablesRM: 0,
                repayCashRM:0,
                repayOnlineTransferRM:0,
                repayConsumablesTHB: 0,
                repayCashTHB:0,
                repayOnlineTransferTHB:0,
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

            // console.log('totalDebtRM', debtRepayment.totalDebtRM);
            // console.log('totalDebtTHB', debtRepayment.totalDebtTHB);
            // console.log('totalRepayRM', debtRepayment.totalRepayRM);
            // console.log('totalRepayTHB', debtRepayment.totalRepayTHB);

            state.debtRepayment = debtRepayment;
            state.transType = transType;



        },

    }
});

export const { initiliaseTransaction, addTransaction, deleteTransaction, updateTransaction, calculateDebtRepaymentBalance } = transactionSlice.actions;
export default transactionSlice.reducer;
