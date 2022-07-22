import { createPortal } from "react-dom";
import styles from "./Popup.module.scss";

interface PopupProps {
  open: boolean;
  children: React.ReactNode;
}

const Popup = ({ open, children }: PopupProps) => {
  const popup = (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.popup}>{children}</div>
    </>
  );

  return open ? (
    createPortal(popup, document.getElementById("root") as HTMLElement)
  ) : (
    <></>
  );
};

export default Popup;
