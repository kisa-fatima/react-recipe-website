import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdminLoggedIn: false,
  adminEmail: null,
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.isAdminLoggedIn = true;
      state.adminEmail = action.payload?.email || null;
    },
    logoutAdmin: (state) => {
      state.isAdminLoggedIn = false;
      state.adminEmail = null;
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer; 