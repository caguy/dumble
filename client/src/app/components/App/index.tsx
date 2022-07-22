import { useAppSelector } from "@/app/hooks";
import { selectGameStatus } from "@/features/game/gameSlice";
import Game from "../Game";
import Intro from "../Intro";
import Title from "../Title";
import styles from "./App.module.scss";

export default function App() {
  const gameStatus = useAppSelector(selectGameStatus);

  const renderComponent = () => {
    switch (gameStatus) {
      case "INTRO":
        return <Intro />;
      case "TITLE":
        return <Title />;
      case "PLAYING":
        return <Game />;
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.appWrapper}>
      <div>{renderComponent()}</div>
    </div>
  );
}
