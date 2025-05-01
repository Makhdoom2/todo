import { User } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    // setAuthToken(state, action: PayloadAction<string>) {
    //   state.token = action.payload;
    // },
    logout(state) {
      state.user = null;
    },
  },
});

export const {
  setUser,
  // setAuthToken,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
