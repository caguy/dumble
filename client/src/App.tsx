import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { newGame } from "./features/cards/cardsSettings";
import { initializeCards } from "./features/cards/cardsSlice";
import { selectGameStatus } from "./features/game/gameSlice";
import "./App.scss";
import Board from "./features/game/components/Board";
import Title from "./features/game/components/Title";

export default function App() {
  const dispatch = useAppDispatch();
  const gameStatus = useAppSelector(selectGameStatus);

  useEffect(() => {
    dispatch(initializeCards({ cards: newGame() }));
  }, [dispatch]);

  switch (gameStatus) {
    case "TITLE":
      return <Title />;
    case "PLAYING":
      return <Board />;
    default:
      return <></>;
  }
}
