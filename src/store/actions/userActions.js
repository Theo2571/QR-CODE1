import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const postRegister = createAsyncThunk(
  "register/postRegister",
  async (data) => {
    const res = await axios.post(
      `${BASE_URL}/accounts/user/register/${data.count}`,
      data,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return res.data;
  }
);

export const postLogin = createAsyncThunk(
  "login/postLogin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/accounts/login`, data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const postAdmin = createAsyncThunk("login/postAdmin", async (data) => {
  const res = await axios.post(`${BASE_URL}/accounts/admin/login`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
});

export const patchUsers = createAsyncThunk(
  "users/patchUsers",
  async ({ data, hash }) => {
    const res = await axios.patch(`${BASE_URL}/users/${hash}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  }
);

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ limit, page, archived, createDateStart, createDateEnd, print }) => {
    const res = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      params: { page, archived, limit, createDateStart, createDateEnd, print },
    });
    return res.data;
  }
);

export const getUserss = createAsyncThunk("users/getUserss", async (hash) => {
  const res = await axios.get(`${BASE_URL}/users/${hash}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
});

export const getProfile = createAsyncThunk(
  "users/getProfile",
  async (thunkAPI) => {
    const res = await axios.get(`${BASE_URL}/users/myProfile`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (hash) => {
  const res = await axios.delete(`${BASE_URL}/users/${hash}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return hash;
});

export const restoreUser = createAsyncThunk(
  "users/restoreUser",
  async (hash) => {
    const res = await axios.patch(
      `${BASE_URL}/users/restore/${hash}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return hash;
  }
);

export const archiveUser = createAsyncThunk(
  "users/archiveUser",
  async (hash) => {
    const res = await axios.patch(
      `${BASE_URL}/users/archive/${hash}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return hash;
  }
);

export const PrintQr = createAsyncThunk("users/PrintQr", async (hashes) => {
  const res = await axios.patch(
    `${BASE_URL}/users/print`,
    { hashes },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  return hashes;
});
