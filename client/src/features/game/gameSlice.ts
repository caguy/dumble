import {
  createEntityAdapter,
  createSlice,
  EntityId,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Card, cardsSelectors } from "../cards/cardsSlice";
import { findRuns, findSameKind } from "./combinations";

export interface Player {
  id: string;
  hand: EntityId[];
  name: string;
}

export interface Game {
  stack: EntityId[];
  discard: EntityId[];
  trick: EntityId[];
  turn: EntityId | null;
  phase: "discard" | "draw" | null;
  firstPlayer: EntityId | null;
  players: EntityState<Player>;
  status: "TITLE" | "PLAYING";
}

const playersAdapter = createEntityAdapter<Player>();

const initialState: Game = {
  stack: [],
  discard: [],
  trick: [],
  turn: null,
  phase: null,
  firstPlayer: null,
  players: playersAdapter.getInitialState(),
  status: "TITLE",
};

const messages = new Map<Game["phase"], string>([
  ["discard", "choisissez vos cartes à défausser"],
  ["draw", "prenez une carte dans la pioche ou la défausse"],
]);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (
      state,
      action: PayloadAction<{
        cards: EntityId[];
        players: Omit<Player, "hand">[];
      }>
    ) => {
      const stack = action.payload.cards;
      const players = action.payload.players.map((player) => ({
        ...player,
        hand: stack.splice(0, 5),
      }));
      const discard = stack.shift();
      if (discard) state.discard.push(discard);
      state.stack = stack;
      playersAdapter.upsertMany(state.players, {
        type: "cards",
        payload: players,
      });
      const firstPlayer = players[Math.floor(Math.random() * players.length)];
      state.turn = firstPlayer.id;
      state.firstPlayer = firstPlayer.id;
      state.phase = "discard";
      state.status = "PLAYING";
    },
    endGame: () => initialState,
    discard: (
      state,
      action: PayloadAction<{ cards: EntityId[]; player: EntityId }>
    ) => {
      let playerHand = state.players.entities[action.payload.player]?.hand;
      if (playerHand === undefined) return;

      for (const card of action.payload.cards) {
        playerHand = [
          ...playerHand.slice(
            0,
            playerHand?.findIndex((val) => val === card)
          ),
          ...playerHand.slice(playerHand?.findIndex((val) => val === card) + 1),
        ];
      }

      action.payload.cards.forEach((card) => {
        state.trick.push(card);
      });

      playersAdapter.updateOne(state.players, {
        id: action.payload.player,
        changes: {
          hand: playerHand,
        },
      });

      state.phase = "draw";
    },
    draw: (state, action: PayloadAction<{ from: "stack" | "discard" }>) => {
      const { from } = action.payload;
      const currentPlayer = state.turn as EntityId;
      const currentPlayerIndex = state.players.ids.findIndex(
        (player) => player === currentPlayer
      );
      const pickedCard = state[from].pop() as EntityId;

      playersAdapter.updateOne(state.players, {
        id: currentPlayer,
        changes: {
          hand: state.players.entities[currentPlayer ?? ""]?.hand.concat(
            pickedCard
          ),
        },
      });

      state.discard = state.discard.concat(state.trick);
      state.trick = [];

      state.turn =
        state.players.ids[
          currentPlayerIndex + 1 < state.players.ids.length
            ? currentPlayerIndex + 1
            : 0
        ];
      state.phase = "discard";
    },
  },
});

export const { startGame, endGame, discard, draw } = gameSlice.actions;

export const playersSelectors = playersAdapter.getSelectors(
  (state: RootState) => state.game.players
);

export const selectGameStatus = (state: RootState) => state.game.status;
export const selectStack = (state: RootState) =>
  state.game.stack
    .map((card) => cardsSelectors.selectById(state, card))
    .filter((card) => card !== undefined) as Card[];
export const selectDiscard = (state: RootState) =>
  state.game.discard
    .map((card) => cardsSelectors.selectById(state, card))
    .filter((card) => card !== undefined) as Card[];
export const selectTrick = (state: RootState) =>
  state.game.trick
    .map((card) => cardsSelectors.selectById(state, card))
    .filter((card) => card !== undefined) as Card[];
export const selectPlayersIds = (state: RootState) =>
  playersSelectors.selectIds(state);
export const selectPlayerHand = (state: RootState, id: EntityId) =>
  playersSelectors
    .selectById(state, id)
    ?.hand.map((card) => cardsSelectors.selectById(state, card))
    .filter((card) => card !== undefined) ?? [];
export const selectPlayerCombinations = (
  state: RootState,
  playerId: EntityId
) => {
  const hand = selectPlayerHand(state, playerId);
  const runs = findRuns(hand as Card[]);
  const sameKinds = findSameKind(hand as Card[]);
  return [
    ...runs.map((run) => run.cards),
    ...sameKinds.map((kind) => kind.cards),
  ];
};
export const selectPlayerName = (state: RootState, id: EntityId) =>
  playersSelectors.selectById(state, id)?.name;
export const selectPlayerScore = (state: RootState, id: EntityId) =>
  selectPlayerHand(state, id)?.reduce(
    (previous, current) => previous + (current?.value ?? 0),
    0
  );
export const selectCurrentPlayer = (state: RootState) => state.game.turn;
export const selectGameMessage = (state: RootState) =>
  `Tour de ${
    playersSelectors.selectById(state, state.game.turn as EntityId)
      ?.name as string
  } : ${messages.get(state.game.phase)}`;
export const selectIsPickable = (state: RootState, player: EntityId) =>
  state.game.phase === "draw" && state.game.turn === player;
export const selectPhase = (state: RootState) => state.game.phase;

export default gameSlice.reducer;
