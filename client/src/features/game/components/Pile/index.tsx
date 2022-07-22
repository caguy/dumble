import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Flipped } from "react-flip-toolkit";
import Card from "../Card";
import { Card as CardType } from "../../types/Card.types";
import { draw, selectCurrentPlayer, selectIsPickable } from "../../gameSlice";
import styles from "./Pile.module.scss";

interface PileProps {
  cards: CardType[];
  type: "stack" | "discard";
}

const randomTransform = () => Math.floor(Math.random() * 6) - 3;
const boxShadow = (elevation: number) =>
  `${elevation * 0.5}px ${elevation * 0.25}px ${
    elevation * 0.5
  }px rgba(0, 0, 0, 0.25)`;

const transforms = Array(52)
  .fill(null)
  .map(
    () =>
      `translate(${randomTransform()}px, ${randomTransform()}px) rotate(${randomTransform()}deg)`
  );

const Pile = ({ cards, type }: PileProps) => {
  const flipped = type === "stack";

  const dispatch = useAppDispatch();
  const currentPlayer = useAppSelector(selectCurrentPlayer);
  const isPickable = useAppSelector((state) =>
    selectIsPickable(state, currentPlayer ?? "")
  );

  const pick = () => {
    if (!isPickable) return;
    dispatch(draw({ from: type }));
  };

  return (
    <div
      className={styles.stack}
      style={{ boxShadow: boxShadow(cards.length) }}
    >
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={styles.card}
          style={{
            transform: transforms[index],
          }}
        >
          <Flipped flipId={card.id}>
            <div onClick={pick}>
              <Card kind={card.kind} suit={card.suit} flipped={flipped} />
            </div>
          </Flipped>
        </div>
      ))}
    </div>
  );
};

export default Pile;
