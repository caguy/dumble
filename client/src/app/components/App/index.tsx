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
        return (
          <div>
            <Intro />
          </div>
        );
      case "TITLE":
        return (
          <div>
            <Title />
          </div>
        );
      case "PLAYING":
        return (
          <div className={styles.fullWidth}>
            <Game />
          </div>
        );
      default:
        return <></>;
    }
  };

  return <div className={styles.appWrapper}>{renderComponent()}</div>;
}
