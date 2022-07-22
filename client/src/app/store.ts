import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "@/features/game/gameSlice";
import userReducer from "@/features/user/userSlice";
import userMiddleware from "@/features/user/userMiddleware";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
