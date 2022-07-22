import styles, { cssExports } from "./Card.module.scss";
import { Kind, Suit } from "../../types/Card.types";

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
