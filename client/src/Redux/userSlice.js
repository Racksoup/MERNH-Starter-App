import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem('userToken', action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.removeItem('userToken');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAdmin.fulfilled, (state, action) => {
        userSlice.caseReducers.userLoaded(action.payload);
      })
      .addCase(loadAdmin.rejected, (state) => {
        userSlice.caseReducers.logout();
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        userSlice.caseReducers.loginSuccess(action.payload);
        userSlice.caseReducers.loadAdmin();
      })
      .addCase(login.rejected, (state) => {
        userSlice.caseReducers.logout();
      });
  },
});

export const loadAdmin = createAsyncThunk('user/loadAdmin', async () => {
  if (localStorage.userToken) {
    setAuthToken(localStorage.userToken);
  }
  if (localStorage.token) {
    const res = await axios.get('/api/users');
    return res.data;
  }
});

export const login = createAsyncThunk('user/login', async (username, password) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ username, password });
  const res = await axios.post('/api/users', body, config);
  return res.data;
});

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const { userLoaded, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
