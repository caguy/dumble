import { EntityId } from "@reduxjs/toolkit";

export interface Player {
  id: string;
  hand: EntityId[];
  name: string;
}
