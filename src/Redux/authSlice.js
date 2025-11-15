import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// persist user to async storage
export const loadUserFromStorage = createAsyncThunk(
  'auth/loadUser',
  async () => {
    const userJSON = await AsyncStorage.getItem('user');
    return userJSON ? JSON.parse(userJSON) : null;
  }
);

// save user after login
export const saveUserToStorage = createAsyncThunk(
  'auth/saveUser',
  async (user) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    return user;
  }
);

// logout user
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    await AsyncStorage.removeItem('user');
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(saveUserToStorage.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const { setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
