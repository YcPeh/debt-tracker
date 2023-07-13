import { createSlice } from '@reduxjs/toolkit'
import { userInfo } from '../../userInfo'

const initialState = {
    userInfo: userInfo,
    showForm: false,
    colWidthUser: 12,
    colWidthAddButton:12,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserInfo: (state,action) => {
            // console.log([...state.userInfo])
            const {name, path} = action.payload;
            const newUserInfo = [...state.userInfo];
            const newUser = {
                id: (state.userInfo.length + 1).toString(),
                name: name,
                path: path,
            }

            newUserInfo.push(newUser);
            // console.log(newUserInfo);
            state.userInfo = newUserInfo;
        },
        setColWidth: (state,action) => {
            // console.log(action.type)
            // console.log(action.payload)
            state.colWidthUser = action.payload === 1 ? 6 : 4
            if (action.payload === 1) {
                state.colWidthUser = 6;
                state.colWidthAddButton = 6;
            } else if (action.payload === 3){
                state.colWidthUser = 4;
                state.colWidthAddButton = 12;
            } else {
                state.colWidthUser = 4;
                state.colWidthAddButton = 4;
            }
        },
        openForm: (state) => {
            state.showForm = true;
        },
        closeForm: (state) => {
            state.showForm = false;
        },
    },
})

export const { addUserInfo, setColWidth, openForm, closeForm } = userSlice.actions
export default userSlice.reducer