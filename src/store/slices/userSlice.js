import {createSlice, createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    users: [],
    token: localStorage.getItem('token') || null ,
    role: localStorage.getItem('role') || null ,
    loading: false,
    hash: '',
    userId: null,
    error: null,
    currentUser: null,
    total: 0
}

export const postRegister  = createAsyncThunk(
    'register/postRegister',
    async (data) => {
        const res = await axios.post(`http://92.245.114.113:5959/accounts/user/register/${data.count}`, data , { headers: { Authorization: `Bearer ${initialState.token}`} })
        console.log(res.data);
        return res.data
    })

export const postLogin  = createAsyncThunk(
    'login/postLogin',
    async (data, { rejectWithValue }) => {
        try{
            const res = await axios.post(`http://92.245.114.113:5959/accounts/login`, data)
            console.log('login',res.data);
            return res.data
        }catch (e){
            return rejectWithValue(e.response.data.message)
        }
    })

export const postAdmin  = createAsyncThunk(
    'login/postAdmin',
    async (data) => {
        const res = await axios.post(`http://92.245.114.113:5959/accounts/admin/login`, data)
        console.log('login',res.data);
        return res.data

    })


export const postForgot  = createAsyncThunk(
    'register/postForgot',
    async (data) => {
        const res = await axios.post(`http://92.245.114.113:5959/accounts/forgotpass`, { ...data, link: 'http://92.245.114.113:5959/password' })
        console.log(res.data);
        return res.data
    })


export const patchUsers  = createAsyncThunk(
    'users/patchUsers',
    async ({ data, hash}) => {
        console.log(hash, "dawdawd")
        const res = await axios.patch(`http://92.245.114.113:5959/users/${hash}`, data , { headers: { Authorization: `Bearer ${initialState.token}` } })
        return res.data
    })



export const patchPassword  = createAsyncThunk(
    'users/patchPassword',
    async ({ data, id}) => {
        const res = await axios.patch(`http://92.245.114.113:5959/accounts/changePass/${id}`, data , { headers: { Authorization: `Bearer ${initialState.token}` } })
        return res.data
    })


export const getUsers  = createAsyncThunk(
    'users/getUsers',
    async (page) => {
        console.log(page, "dwadd")

        const res = await axios.get(`http://92.245.114.113:5959/users`, { headers: { Authorization: `Bearer ${initialState.token}` },
            params:{page}
        }
        )
        return res.data
    })


export const getUserss  = createAsyncThunk(
    'users/getUserss',
    async ( hash) => {
        const res = await axios.get(`http://92.245.114.113:5959/users/${hash}`, { headers: { Authorization: `Bearer ${initialState.token}` } })
        return res.data
    })


export const getProfile  = createAsyncThunk(
    'users/getProfile',
    async (thunkAPI) => {
        const res = await axios.get(`http://92.245.114.113:5959/users/myProfile`, { headers: { Authorization: `Bearer ${initialState.token}` } })
        return res.data
    })

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (hash, thunkAPI) => {
        const res = await axios.delete(`http://92.245.114.113:5959/users/${hash}`,
            { headers: { Authorization: `Bearer ${initialState.token}` } } )
        console.log(res.data);
        return hash
    })


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        email(state, action) {
            console.log(action);
            state.hash = action.payload;
        },
        setUserId(state, action){
            state.userId = action.payload
        },
        hash(state, action) {
            console.log(action)
            state.hash = action.payload
        }
    },
    extraReducers: {
        [postRegister.pending]: (state) => {
            state.loading = true
        },
        [postRegister.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.token = payload.accessToken
            state.role = payload.role
            // localStorage.setItem('role', payload.role)
            // localStorage.setItem('token', payload.accessToken)
        },
        [postRegister.rejected]: (state) => {
            state.loading = false
        },



        [postLogin.pending]: (state) => {
            state.loading = true

        },

        [postLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.token = payload.accessToken
            state.role = payload.role
            localStorage.setItem('role', payload.role)
            localStorage.setItem('token', payload.accessToken)

        },

        [postLogin.rejected]: (state,{payload}) => {
            state.loading = false
            state.error = payload
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


        [postForgot.pending]: (state) => {
            state.loading = true
        },
        [postForgot.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.users = payload
        },
        [postForgot.rejected]: (state) => {
            state.loading = false
        },



        [patchUsers.pending]: (state) => {
            state.loading = true
        },
        [patchUsers.fulfilled]: (state, { payload }) => {
            state.loading = false
        },
        [patchUsers.rejected]: (state) => {
            state.loading = false
        },



        [patchPassword.pending]: (state) => {
            state.loading = true
        },
        [patchPassword.fulfilled]: (state, { payload }) => {
            state.currentUser = false
        },
        [patchPassword.rejected]: (state) => {
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
    },
})
export const {
    hash,
    setUserId
} = userSlice.actions
export const userSliceReducer = userSlice.reducer