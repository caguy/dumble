import { useAppDispatch, useAppSelector } from "../../hooks";
import { startGame } from "../../../features/game/gameSlice";
import { v4 as uuidv4 } from "uuid";
import initializeCards from "@/features/game/helpers/initializeCards";
import { selectUserName } from "@/features/user/userSlice";

const Title = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUserName);

  function onStartGame() {
    dispatch(
      startGame({
        cards: initializeCards(),
        players: Array(4)
          .fill(null)
          .map((_, index) => ({
            id: uuidv4(),
            name: `Joueur ${index + 1}`,
          })),
      })
    );
  }

  return (
    <>
      <h1>Dumble</h1>
      <h2>Que voulez-vous faire, {username} ?</h2>
      <div>
        <button onClick={onStartGame}>Partie locale</button>
      </div>
      <div>
        <button>Partie en ligne</button>
      </div>
    </>
  );
};

export default Title;
