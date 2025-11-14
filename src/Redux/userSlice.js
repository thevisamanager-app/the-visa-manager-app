// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { userApi } from '../api/userapi';

// export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
//   const response = await userApi.getAllUsers();
//   return response.data;
// });

// const userSlice = createSlice({
//   name: 'user',
//   initialState: { users: [], loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default userSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { userApi } from '../api/userApi';

// export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
//   const response = await userApi.getAllUsers();
//   return response.data;
// });

// const userSlice = createSlice({
//   name: 'user',
//   initialState: { users: [], loading: false, error: null, lastUpdated: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         console.log("[USER] Fetching users...");
//         state.loading = true;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         console.log("[USER] Users fetched:", action.payload.length);
//         state.loading = false;
//         state.users = action.payload;
//         state.lastUpdated = new Date().toISOString();
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         console.log("[USER] Fetch users FAILED:", action.error?.message);
//         state.loading = false;
//         state.error = action.error?.message || "Unknown error";
//       });
//   },
// });

// export const selectUsers = (state) => state.user.users;
// export const selectUserLoading = (state) => state.user.loading;
// export const selectUserError = (state) => state.user.error;

// export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

// Async API request
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async () => {
    const res = await apiClient.get('/getUsers');
    return res.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
