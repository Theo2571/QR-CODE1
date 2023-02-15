import {createSlice} from '@reduxjs/toolkit';
import { archiveUser, deleteUser, getProfile, getUsers, getUserss, patchUsers, postAdmin, postLogin, postRegister, PrintQr, restoreUser } from '../actions/userActions';


const initialState = {
    users: [],
    token: localStorage.getItem('token') || null ,
    role: localStorage.getItem('role') || null ,
    loading: false,
    hash: '',
    userId: null,
    error: "Invalid password",
    currentUser: null,
    total: 0
};


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        email(state, action) {
            state.hash = action.payload;
        },
        setUserId(state, action){
            state.userId = action.payload
        },
        hash(state, action) {
            state.hash = action.payload
        }
    },
    extraReducers: {
        [postRegister.pending]: (state) => {
            state.loading = true
        },
        [postRegister.fulfilled]: (state) => {
            state.loading = false
        },
        [postRegister.rejected]: (state) => {
            state.loading = false
        },


        [postLogin.pending]: (state) => {
            state.loading = true

        },
        [postLogin.rejected]: (state,{payload}) => {
            state.loading = false
            state.error = payload
        },
        [postLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.token = payload.accessToken
            state.role = payload.role
            localStorage.setItem('role', payload.role)
            localStorage.setItem('token', payload.accessToken)
        },


        [postAdmin.pending]: (state) => {
            state.loading = true
        },
        [postAdmin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.token = payload.accessToken
            state.role = payload.role
            localStorage.setItem('role', payload.role)
            localStorage.setItem('token', payload.accessToken)
        },
        [postAdmin.rejected]: (state) => {
            state.loading = false
        },


        [patchUsers.pending]: (state) => {
            state.loading = true
        },
        [patchUsers.fulfilled]: (state) => {
            state.loading = false
        },
        [patchUsers.rejected]: (state) => {
            state.loading = false
        },


        [getUsers.pending]: (state) => {
            state.loading = true
        },
        [getUsers.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.users = payload.items
            state.total = payload.total
        },
        [getUsers.rejected]: (state) => {
            state.loading = false
        },


        [getUserss.pending]: (state) => {
            state.loading = true
        },
        [getUserss.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.users = payload.items
        },
        [getUserss.rejected]: (state) => {
            state.loading = false
        },


        [getProfile.pending]: (state) => {
            state.loading = true
        },
        [getProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentUser = payload
        },
        [getProfile.rejected]: (state) => {
            state.loading = false
        },

        [archiveUser.pending]: (state) => {
            state.loading = true
        },
        [archiveUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users.filter(item=>item.hash !== action.payload)

        },
        [archiveUser.rejected]: (state) => {
            state.loading = false
        },

        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users.filter(item=>item.hash !== action.payload)
        },
        [deleteUser.rejected]: (state) => {
            state.loading = false
        },

        [restoreUser.pending]: (state) => {
            state.loading = true
        },
        [restoreUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users.filter(item=>item.hash !== action.payload)
        },
        [restoreUser.rejected]: (state) => {
            state.loading = false
        },

        [PrintQr.pending]: (state) => {
            state.loading = true
        },
        [PrintQr.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.currentUser = payload
        },
        [PrintQr.rejected]: (state) => {
            state.loading = false
        },

    },
});

export const {
    hash,
    setUserId,
    email
} = userSlice.actions;

export const userSliceReducer = userSlice.reducer;