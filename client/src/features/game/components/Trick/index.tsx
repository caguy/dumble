import { Flipped } from "react-flip-toolkit";
import { Card as CardType } from "../../types/Card.types";
import styles from "./Trick.module.scss";
import Card from "../Card";

interface TrickProps {
  cards: CardType[];
}

const Trick = ({ cards }: TrickProps) => {
  return (
    <>
      {cards.map((card) => (
        <Flipped key={card.id} flipId={card.id}>
          <div className={styles.card}>
            <Card kind={card.kind} suit={card.suit} />
          </div>
        </Flipped>
      ))}
    </>
  );
};

export default Trick;
