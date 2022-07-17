import { useAppSelector } from "../../../app/hooks";
import { selectGameMessage } from "../gameSlice";
import styles from "./Status.module.scss";

const Status = () => {
  const message = useAppSelector(selectGameMessage);

  return <div className={styles.status}>{message}</div>;
};

export default Status;
