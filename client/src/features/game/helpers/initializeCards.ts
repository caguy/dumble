import { v4 as uuidv4 } from "uuid";
import { kinds, suits } from "../settings/Card.settings";
import { Card } from "../types/Card.types";
import shuffle from "@/common/helpers/shuffle";

export default () =>
  shuffle(
    Object.keys(suits)
      .map((suitKey) =>
        Object.entries(kinds).map(
          ([kindKey, kindValue]) =>
            ({
              id: uuidv4(),
              kind: kindKey,
              suit: suitKey,
              value: kindValue.value,
            } as Card)
        )
      )
      .flat()
  );
