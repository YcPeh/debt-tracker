import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: [],
    selectedUserInfo: [],
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
            console.log('uerSlice addUserInfo newUser')
            console.log(newUser)
            // state.userInfo.push(newUser);
            state.userInfo = [...state.userInfo, newUser];
        },
        deleteUserInfo:(state,action) =>  {
            const idToRemove = action.payload;
            state.userInfo = state.userInfo.filter((user) => user.customId !== idToRemove)
        },
        updateUserPhoto: (state,action) => {
            console.log('updateUserPhoto action.payload');
            console.log(action.payload);
            const {customId, imageName} = action.payload;
            state.userInfo = state.userInfo.map((user) =>{ 
                // console.log(' inside updateUserPhoto map function')
                // console.log(user)
                if(user.customId === customId){
                    return {...user, imageName:imageName};
                } else {
                    return user;
                }
            })
        },
        selectUser: (state,action) => {
            state.selectedUserInfo = action.payload;
        },
    },
})

export const { initialiseUserInfo, openForm, closeForm, addUserInfo, deleteUserInfo, updateUserPhoto, selectUser } = userSlice.actions;
export default userSlice.reducer;