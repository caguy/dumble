import { Kind, Suit } from "../cardsSettings";
import styles, { cssExports } from "./Card.module.scss";

interface CardProps {
  kind: Kind;
  suit: Suit;
  flipped?: boolean;
}

const Card = ({ kind, suit, flipped = false }: CardProps) => {
  const classNames = [styles.card];
  if (flipped) {
    classNames.push(styles["card-back"]);
  } else {
    classNames.push(
      styles[
        `card-${kind.toLowerCase()}-${suit.toLowerCase()}` as keyof typeof cssExports
      ]
    );
  }

  return <div className={classNames.join(" ")} />;
};

export default Card;
