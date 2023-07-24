import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    transaction:null,
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        initiliaseTransaction: (state, action) => {
            // console.log(action.payload)
            state.transaction = action.payload
        },
    }
});

export const { initiliaseTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
