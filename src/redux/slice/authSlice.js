import { createSlice } from "@reduxjs/toolkit";



export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user; 
      state.token = action.payload.token || state.token;
      //  console.log("✅ setUser called with:", action.payload);
    },
    removeUser(state) {
      state.user = null
      state.token = null
    }
  }
})

export const { setUser, removeUser } = authSlice.actions
export const authSlicePath = (store) => store.auth.user
export default authSlice.reducer;

