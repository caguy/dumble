import { Game } from "../types/Game.types";

export default new Map<Game["phase"], string>([
  ["discard", "choisissez vos cartes à défausser"],
  ["draw", "prenez une carte dans la pioche ou la défausse"],
]);
