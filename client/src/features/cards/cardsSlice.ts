import {
  createEntityAdapter,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { Kind, Suit } from "./cardsSettings";
import { RootState } from "../../app/store";

export interface Card {
  id: string;
  kind: Kind;
  suit: Suit;
  value: number;
}

const cardsAdapter = createEntityAdapter<Card>();

export const cardsSlice = createSlice({
  name: "cards",
  initialState: cardsAdapter.getInitialState(),
  reducers: {
    initializeCards: (state, action: PayloadAction<{ cards: Card[] }>) => {
      if (state.ids.length !== 0) return;
      cardsAdapter.upsertMany(state, {
        type: "cards",
        payload: action.payload.cards
      });
    }
  }
});

export const cardsSelectors = cardsAdapter.getSelectors(
  (state: RootState) => state.cards
);

export const { initializeCards } = cardsSlice.actions;

export default cardsSlice.reducer;
