import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: null,
    showForm: false,
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
        },
        deleteUserInfo:(state,action) =>  {
            const idToRemove = action.payload;
            state.userInfo = state.userInfo.filter((user) => user.customId !== idToRemove)
        },
    },
})

export const { initialiseUserInfo, openForm, closeForm, addUserInfo, deleteUserInfo } = userSlice.actions
export default userSlice.reducer