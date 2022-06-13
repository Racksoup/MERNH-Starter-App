import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  admin: null,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.admin = action.payload;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem('adminToken', action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.removeItem('adminToken');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAdmin.fulfilled, (state, action) => {
        adminSlice.caseReducers.adminLoaded(action.payload);
      })
      .addCase(loadAdmin.rejected, (state) => {
        adminSlice.caseReducers.logout();
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        adminSlice.caseReducers.loginSuccess(action.payload);
        adminSlice.caseReducers.loadAdmin();
      })
      .addCase(login.rejected, (state) => {
        adminSlice.caseReducers.logout();
      });
  },
});

export const loadAdmin = createAsyncThunk('admin/loadAdmin', async () => {
  if (localStorage.adminToken) {
    setAuthToken(localStorage.adminToken);
  }
  if (localStorage.token) {
    const res = await axios.get('/api/admin');
    return res.data;
  }
});

export const login = createAsyncThunk('admin/login', async (username, password) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ username, password });
  const res = await axios.post('/api/admin', body, config);
  return res.data;
});

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const { adminLoaded, loginSuccess, logout } = adminSlice.actions;
export default adminSlice.reducer;
