import {
  createEntityAdapter,
  createSlice,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { findRuns, findSameKind } from "./helpers/combinations";
import { Card } from "./types/Card.types";
import { Player } from "./types/Player.types";
import { Game } from "./types/Game.types";
import messages from "./settings/messages";
import { choosePlayerName } from "@/features/user/userSlice";

const cardsAdapter = createEntityAdapter<Card>();
const playersAdapter = createEntityAdapter<Player>();

const initialState: Game = {
  cards: cardsAdapter.getInitialState(),
  stack: [],
  discard: [],
  trick: [],
  turn: null,
  phase: null,
  firstPlayer: null,
  players: playersAdapter.getInitialState(),
  status: "INTRO",
};

// Paramétrage du store
export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (
      state,
      action: PayloadAction<{
        cards: Card[];
        players: Omit<Player, "hand">[];
      }>
    ) => {
      // Initialisation du jeu de cartes
      if (state.cards.ids.length !== 0) {
        cardsAdapter.removeAll(state.cards);
      }
      cardsAdapter.upsertMany(state.cards, {
        type: "cards",
        payload: action.payload.cards,
      });

      // Distribution des cartes
      const stack = action.payload.cards.map((card) => card.id);
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

      // Initialisation du tour de jeu
      const firstPlayer = players[Math.floor(Math.random() * players.length)];
      state.turn = firstPlayer.id;
      state.firstPlayer = firstPlayer.id;
      state.phase = "discard";
      state.status = "PLAYING";
    },
    endGame: () => ({ ...initialState, status: "TITLE" as Game["status"] }),
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
  extraReducers: (builder) => {
    builder.addCase(choosePlayerName, (state) => {
      state.status = "TITLE";
    });
  },
});

// Export des actions
export const { startGame, endGame, discard, draw } = gameSlice.actions;

// Export des selecteurs d'entités
export const cardsSelectors = cardsAdapter.getSelectors(
  (state: RootState) => state.game.cards
);

export const playersSelectors = playersAdapter.getSelectors(
  (state: RootState) => state.game.players
);

// Export des sélecteurs custom
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

// Export du reducer
export default gameSlice.reducer;
