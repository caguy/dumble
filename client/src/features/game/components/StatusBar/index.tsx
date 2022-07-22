import { useAppSelector } from "@/app/hooks";
import { selectGameMessage } from "../../gameSlice";
import styles from "./StatusBar.module.scss";

const StatusBar = () => {
  const message = useAppSelector(selectGameMessage);

  return <div className={styles.status}>{message}</div>;
};

export default StatusBar;
