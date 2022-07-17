import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { cardsSelectors } from "../../cards/cardsSlice";
import { startGame } from "../gameSlice";
import shuffle from "../../../helpers/shuffle";
import { v4 as uuidv4 } from "uuid";

const Title = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelectors.selectIds);

  function onStartGame() {
    dispatch(
      startGame({
        cards: shuffle(cards),
        players: Array(4)
          .fill(null)
          .map((_, index) => ({
            id: uuidv4(),
            name: `Joueur ${index + 1}`
          }))
      })
    );
  }

  return (
    <>
      <h1>Moins de 10</h1>
      <button onClick={onStartGame}>Démarrer la partie</button>
    </>
  );
};

export default Title;
