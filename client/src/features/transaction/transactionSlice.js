import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    transaction:null,
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
            console.log('newTransaction')
            console.log(newTransaction)
            // state.transaction = [...state.transaction, newTransaction]
        },
        deleteTransaction: (state, action) => {
            const idToRemove = action.payload;
            // console.log('idToRemove in deleteTransaction')
            // console.log(idToRemove)
            state.transaction = state.transaction.filter((trans) => trans.customId !== idToRemove)
        },
    }
});

export const { initiliaseTransaction, addTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
