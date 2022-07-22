import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string | null;
}

const initialState: User = {
  name: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    choosePlayerName: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name;
    },
  },
});

export const { choosePlayerName } = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.name;

export default userSlice.reducer;
