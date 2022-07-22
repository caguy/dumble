import { Flipper } from "react-flip-toolkit";
import styles from "./Board.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  endGame,
  selectCurrentPlayer,
  selectDiscard,
  selectStack,
  selectTrick,
} from "../../gameSlice";
import Hand from "../Hand";
import Pile from "../Pile";
import StatusBar from "../StatusBar";
import Trick from "../Trick";

const Board = () => {
  const stack = useAppSelector(selectStack);
  const discard = useAppSelector(selectDiscard);
  const trick = useAppSelector(selectTrick);
  const currentPlayer = useAppSelector(selectCurrentPlayer);

  const dispatch = useAppDispatch();

  const stop = () => {
    dispatch(endGame());
  };

  return (
    <Flipper
      flipKey={
        JSON.stringify(stack) + JSON.stringify(discard) + JSON.stringify(trick)
      }
      spring={{ stiffness: 400, damping: 50 }}
    >
      <div className={styles.board}>
        <div className={styles.status}>
          <StatusBar />
        </div>
        <div className={styles.action}>
          <button onClick={stop}>Fin de partie</button>
        </div>
        <div className={styles.main}>
          <div className={styles.stacks}>
            <div>
              <div className={styles.label}>Pioche</div>
              <Pile cards={stack} type="stack" />
            </div>
            <div>
              <div className={styles.label}>Défausse</div>
              <Pile cards={discard} type="discard" />
            </div>
          </div>
          <div className={styles.trick}>
            <div className={styles.label}>Pli</div>
            <div className={styles.trick_zone}>
              <Trick cards={trick} />
            </div>
          </div>
        </div>
        {currentPlayer && (
          <div className={styles.hand}>
            <Hand playerId={currentPlayer} />
          </div>
        )}
      </div>
    </Flipper>
  );
};

export default Board;
