import { getKindSortValue, Kind, Suit } from "../cards/cardsSettings";
import { Card } from "../cards/cardsSlice";

export const findSameKind = (cards: Card[]) => {
  const combinations: { kind: Kind; size: number; cards: Card[] }[] = [];

  cards.forEach((card) => {
    const { kind } = card;
    if (!combinations.find((combination) => combination.kind === kind)) {
      const cardsOfKind = cards.filter((card) => card.kind === kind);
      if (cardsOfKind.length > 1)
        combinations.push({
          kind,
          size: cardsOfKind.length,
          cards: cardsOfKind
        });
    }
  });

  return combinations;
};

export const findRuns = (cards: Card[]) => {
  const cardsBySuit: Partial<Record<Suit, Card[]>> = {};
  const combinations: { size: number; cards: Card[] }[] = [];

  // On regroupe les cartes par couleur
  cards.forEach((card) => {
    if (cardsBySuit[card.suit] === undefined) {
      cardsBySuit[card.suit] = [card];
    } else {
      (cardsBySuit[card.suit] as Card[]).push(card);
    }
  });

  Object.keys(cardsBySuit).forEach((suit) => {
    if (cardsBySuit[suit as Suit]?.length ?? 0 > 1) {
      const sortedSuit = [...(cardsBySuit[suit as Suit] ?? [])].sort(
        (a, b) => getKindSortValue(a.kind) - getKindSortValue(b.kind)
      );

      let i = 0;
      while (i < sortedSuit.length) {
        const run = [];
        while (i < sortedSuit.length) {
          run.push(sortedSuit[i]);
          if (
            i < sortedSuit.length - 1 &&
            getKindSortValue(sortedSuit[i].kind) -
              getKindSortValue(sortedSuit[i + 1].kind) ===
              -1
          ) {
            i++;
          } else {
            if (run.length >= 3)
              combinations.push({ size: run.length, cards: run });
            break;
          }
        }
        i++;
      }
    }
  });

  return combinations;
};
