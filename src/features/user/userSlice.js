import { createSlice } from '@reduxjs/toolkit'
import { userInfo } from '../../userInfo'

const initialState = {
    userInfo: userInfo,
    userRows: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserInfo: (state,action) => {
            console.log(action)
            state.userRows = action.payload;
        },
    },
})
// Action creators are generated for each case reducer function
export const { addUserInfo } = userSlice.actions
export default userSlice.reducer