import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types/User.types";

const initialState: User = {
  name: null,
  isConnected: false,
  onlinePlayers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    choosePlayerName: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name;
    },
    connected: (state) => {
      state.isConnected = true;
    },
    receiveOnlinePlayers: (
      state,
      action: PayloadAction<{ username: string }[]>
    ) => {
      state.onlinePlayers = action.payload;
    },
  },
});

export const { choosePlayerName, connected, receiveOnlinePlayers } =
  userSlice.actions;

export const selectUserName = (state: RootState) => state.user.name;
export const selectOnlinePlayers = (state: RootState) =>
  state.user.onlinePlayers;

export default userSlice.reducer;
