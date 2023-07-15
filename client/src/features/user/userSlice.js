import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
// import { userInfo } from '../../userInfo'

const initialState = {
    userInfo: null,
    showForm: false,
    colWidthUser: 12,
    colWidthAddButton: 12,
}

// // Create the async thunk for adding user info
// export const addUserAsync = createAsyncThunk(
//     'user/addUserInfo',
//     async (payload) => {
//         const { nameData, imageData, formData } = payload;
//         console.log("formData.get('name')")
//         console.log(formData.get('name'))
//         console.log("formData.get('image')")
//         console.log(formData.get('image'))
//         try {
//             // Make the API request
//             await axios.post('http://localhost:5000', formData,{
//                 headers: {
//                   "Content-Type": "multipart/form-data",
//                 },
//               });
//             console.log('in try')
//             return payload;
//         } catch (error) {
//             // Handle any errors
//             console.log('in catch')
//             console.log(error);
//             throw error;
//         }
//     }
// );

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initialiseUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setColWidth: (state, action) => {
            // console.log(action.type)
            // console.log(action.payload)
            state.colWidthUser = action.payload === 1 ? 6 : 4
            if (action.payload === 1) {
                state.colWidthUser = 6;
                state.colWidthAddButton = 6;
            } else if (action.payload === 3) {
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

export const { initialiseUserInfo, refreshUser, addUserInfo, setColWidth, openForm, closeForm } = userSlice.actions
export default userSlice.reducer