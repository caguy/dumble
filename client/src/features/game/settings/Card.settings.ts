import { Kind, Suit } from "../types/Card.types";

export const suits = {
  HEART: {
    label: "Cœur",
    icon: "❤️",
  },
  DIAMOND: {
    label: "Carreau",
    icon: "♦️",
  },
  CLUB: {
    label: "Trèfle",
    icon: "♣️",
  },
  SPADE: {
    label: "Pique",
    icon: "♠️",
  },
};

export const getSuitLabel = (suit: Suit) => suits[suit].label;
export const getSuitIcon = (suit: Suit) => suits[suit].icon;

export const kinds = {
  "1": {
    value: 1,
    label: "As",
    sortValue: 1,
  },
  "2": {
    value: 2,
    label: "2",
    sortValue: 2,
  },
  "3": {
    value: 3,
    label: "3",
    sortValue: 3,
  },
  "4": {
    value: 4,
    label: "4",
    sortValue: 4,
  },
  "5": {
    value: 5,
    label: "5",
    sortValue: 5,
  },
  "6": {
    value: 6,
    label: "6",
    sortValue: 6,
  },
  "7": {
    value: 7,
    label: "7",
    sortValue: 7,
  },
  "8": {
    value: 8,
    label: "8",
    sortValue: 8,
  },
  "9": {
    value: 9,
    label: "9",
    sortValue: 9,
  },
  "10": {
    value: 10,
    label: "10",
    sortValue: 10,
  },
  JACK: {
    value: 10,
    label: "Valet",
    sortValue: 11,
  },
  QUEEN: {
    value: 10,
    label: "Reine",
    sortValue: 12,
  },
  KING: {
    value: 10,
    label: "Roi",
    sortValue: 13,
  },
};

export const getKindLabel = (kind: Kind) => kinds[kind].label;
export const getKindSortValue = (kind: Kind) => kinds[kind].sortValue;
