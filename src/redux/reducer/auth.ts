import { createSlice } from "@reduxjs/toolkit";

interface User {
  user: string | null;
  klaytn: any;
}

const initialState: User = {
  user: null,
  klaytn: null,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setKlaytn: (state, action) => {
      state.klaytn = action.payload;
    },
  },
});

export const { setUser, setKlaytn } = authReducer.actions;
export default authReducer.reducer;
