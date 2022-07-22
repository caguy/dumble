import { EntityId, EntityState } from "@reduxjs/toolkit";
import { Card } from "./Card.types";
import { Player } from "./Player.types";

export interface Game {
  cards: EntityState<Card>;
  stack: EntityId[];
  discard: EntityId[];
  trick: EntityId[];
  turn: EntityId | null;
  phase: "discard" | "draw" | null;
  firstPlayer: EntityId | null;
  players: EntityState<Player>;
  status: "INTRO" | "TITLE" | "PLAYING";
}
