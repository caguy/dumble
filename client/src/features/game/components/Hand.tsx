import { EntityId } from "@reduxjs/toolkit";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Card from "../../cards/components/Card";
import {
  discard,
  selectPhase,
  selectPlayerCombinations,
  selectPlayerHand,
  selectPlayerName,
  selectPlayerScore,
  Game,
} from "../gameSlice";
import styles from "./Hand.module.scss";
import { Card as CardType } from "../../cards/cardsSlice";
import { Flipped } from "react-flip-toolkit";

interface HandProps {
  playerId: EntityId;
}

const isInCombination = (card: EntityId, combination: CardType[]) =>
  combination.map((card) => card.id as EntityId).includes(card);

const isActive = (
  card: EntityId,
  selection: EntityId[],
  combinations: CardType[][],
  phase: Game["phase"]
) => {
  if (selection.includes(card) || selection.length === 0) return true;
  if (phase === "draw") return false;

  const combinationsWithCard = combinations
    .map((combination) =>
      isInCombination(card, combination) ? combination : undefined
    )
    .filter((val) => val !== undefined);

  if (combinationsWithCard.length === 0) return false;

  for (const combination of combinationsWithCard) {
    for (const selected of selection) {
      if (isInCombination(selected, combination ?? [])) return true;
    }
  }

  return false;
};

const Hand = ({ playerId }: HandProps) => {
  const hand = useAppSelector((state) => selectPlayerHand(state, playerId));
  const name = useAppSelector((state) => selectPlayerName(state, playerId));
  const score = useAppSelector((state) => selectPlayerScore(state, playerId));
  const phase = useAppSelector(selectPhase);
  const combinations = useAppSelector((state) =>
    selectPlayerCombinations(state, playerId)
  );
  const dispatch = useAppDispatch();

  const [selection, setSelection] = useState<EntityId[]>([]);

  const select = (id: EntityId) => {
    if (!isActive(id, selection, combinations, phase)) return;
    if (selection.includes(id)) {
      const cardIndex = selection.findIndex((card) => card === id);
      setSelection((selection) => [
        ...selection.slice(0, cardIndex),
        ...selection.slice(cardIndex + 1),
      ]);
    } else {
      setSelection((selection) => selection.concat(id));
    }
  };

  const play = () => {
    dispatch(discard({ cards: selection, player: playerId }));
    setSelection([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.header_player}>{name}</span>
        <span> - {score} points</span>
      </div>
      <div>
        {hand?.map(
          (card) =>
            card && (
              <Flipped key={card.id} flipId={card.id}>
                <div
                  className={`${styles.card} ${
                    selection.includes(card.id) ? styles["card-selected"] : ""
                  } ${
                    !isActive(card.id, selection, combinations, phase)
                      ? styles["card-disabled"]
                      : ""
                  }`}
                  onClick={() => select(card.id)}
                >
                  <Card kind={card.kind} suit={card.suit} />
                </div>
              </Flipped>
            )
        )}
      </div>
      <div>
        <button
          disabled={selection.length === 0 || phase === "draw"}
          onClick={play}
        >
          Jouer
        </button>
        <button disabled={score > 10 || phase !== "discard"} onClick={play}>
          Dumble !
        </button>
      </div>
    </div>
  );
};

export default Hand;
