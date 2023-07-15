import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
// import { userInfo } from '../../userInfo'

const initialState = {
    // userInfo: userInfo,
    userInfo: null,
    showForm: false,
    colWidthUser: 12,
    colWidthAddButton: 12,
}

// Create the async thunk for adding user info
export const addUserAsync = createAsyncThunk(
    'user/addUserInfo',
    async (payload) => {
        const { nameData, imageData, formData } = payload;
        // console.log('hereee');
        // console.log(nameData);
        // console.log(imageData);
        // console.log(formData);

        // let formData = new FormData();
        // formData.append('name', nameData);
        // formData.append('image', new Blob({data: imageData}, { contentType: imageData.contentType }));

        // const formDataForLogging = formData;

        // console.log('image.data')
        // console.log(image.data)

        // console.log('formData');
        // console.log(formData);
        // console.log('hahaha')
        console.log("formData.get('name')")
        console.log(formData.get('name'))
        console.log("formData.get('image')")
        console.log(formData.get('image'))
        try {
            // Make the API request
            // await axios.post('http://localhost:5000/addUser', formData);
            await axios.post('http://localhost:5000', formData,{
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
            // await axios.post('/addUser', ,);
            // Return the payload to update the state
            console.log('in try')
            // console.log('formData', formDataForLogging);
            return payload;
        } catch (error) {
            // Handle any errors
            console.log('in catch')
            console.log(error);
            throw error;
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initialiseUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        // addUserInfo: (state,action) => {
        //     // console.log([...state.userInfo])
        //     const {name, imageFile} = action.payload;
        //     console.log("addUserInfo action.payload")
        //     console.log("name")
        //     console.log(name)

        //     const formData = new FormData();
        //     formData.append("name", name);

        //     const reader = new FileReader();
        //     reader.onload = () => {
        //         const result = reader.result;
        //         const fileData = new Uint8Array(result);
        //         console.log("fileData")
        //         console.log(fileData)
        //         formData.append("imageFile", fileData);
        //     };

        //     reader.readAsArrayBuffer(imageFile);

        //     try {
        //         await axios.post("http://localhost:5000/addUser", formData, {
        //           headers: {
        //             "Content-Type": "multipart/form-data",
        //           },
        //         });
        //         dispatch(addUserInfo({ name: name, imageFile: imageFile }));
        //       } catch (error) {
        //         console.log(error);
        //       }

        //     // const newUserInfo = [...state.userInfo];
        //     // const newUser = {
        //     //     id: (state.userInfo.length + 1).toString(),
        //     //     name: name,
        //     //     path: path,
        //     // }
        //     // newUserInfo.push(newUser);
        //     // state.userInfo = newUserInfo;
        // },
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
    extraReducers: (builder) => {
        builder
            .addCase(addUserAsync.pending, (state) => {
                // Handle pending state if needed
            })
            .addCase(addUserAsync.fulfilled, (state, action) => {
                // Update the state with the fulfilled action payload
                const { name, image } = action.payload;
                console.log('hahaha')
                console.log(name)
                console.log(image)
                // const newUser = {
                //   id: (state.userInfo.length + 1).toString(),
                //   name: name,
                //   imageFile: imageFile,
                // };
                // state.userInfo.push(newUser);
            })
            .addCase(addUserAsync.rejected, (state, action) => {
                // Handle the rejected state if needed
            });
    },
})

export const { initialiseUserInfo, addUserInfo, setColWidth, openForm, closeForm } = userSlice.actions
export default userSlice.reducer