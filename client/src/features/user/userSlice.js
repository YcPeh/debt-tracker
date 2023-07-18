import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
// import { userInfo } from '../../userInfo'

const initialState = {
    userInfo: null,
    showForm: false,
    // reRender: false,
    colWidthUser: 12,
    colWidthAddButton: 12,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initialiseUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        openForm: (state) => {
            state.showForm = true;
        },
        closeForm: (state) => {
            state.showForm = false;
        },
        addUserInfo:(state,action) =>  {
            const newUser = action.payload;
            console.log('newUser')
            console.log(newUser)
            state.userInfo.push(newUser);
            // console.log('...action.payload')
            // console.log(...action.payload)
            // state.userInfo.push(...action.payload);
            // console.log(state.userInfo)
        },
        deleteUserInfo:(state,action) =>  {
            const idToRemove = action.payload;
            state.userInfo = state.userInfo.filter((user) => user._id !== idToRemove)
        },
        // startRender: (state) => {
        //     state.reRender = true;
        // },
        // stopRender: (state) => {
        //     state.reRender = false;
        // },
    },
})

export const { initialiseUserInfo, openForm, closeForm, startRender, stopRender, addUserInfo, deleteUserInfo } = userSlice.actions
export default userSlice.reducer