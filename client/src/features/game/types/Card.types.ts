import { kinds, suits } from "../settings/Card.settings";

export interface Card {
  id: string;
  kind: Kind;
  suit: Suit;
  value: number;
}

export type Suit = keyof typeof suits;
export type Kind = keyof typeof kinds;
