import { Card as CardType } from "@/features/cards/cardsSlice";
import Card from "@/features/cards/components/Card";
import { Flipped } from "react-flip-toolkit";
import styles from "./Trick.module.scss";

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
