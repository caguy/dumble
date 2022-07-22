import { FormEvent, useState } from "react";
import styles from "./ChooseUsername.module.scss";

interface ChooseUsernameProps {
  onSubmit: (params: { username: string }) => void;
}

const ChooseUsername = ({ onSubmit }: ChooseUsernameProps) => {
  const [username, setUsername] = useState("");

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ username });
  };

  return (
    <>
      <h2 className={styles.title}>Choisissez votre nom de joueur</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <label htmlFor="username" className={styles.inputLabel}>
          Nom de joueur
        </label>
        <input
          id="username"
          value={username}
          onChange={onUsernameChange}
          className={styles.input}
        />
        <div className={styles.actions}>
          <button type="submit">OK</button>
        </div>
      </form>
    </>
  );
};

export default ChooseUsername;
