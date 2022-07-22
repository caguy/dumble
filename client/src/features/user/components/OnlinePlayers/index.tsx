import { useAppSelector } from "@/app/hooks";
import { selectOnlinePlayers } from "../../userSlice";

const OnlinePlayers = () => {
  const players = useAppSelector(selectOnlinePlayers);

  return (
    <>
      {players.map((player, index) => (
        <div key={index}>{player.username}</div>
      ))}
    </>
  );
};

export default OnlinePlayers;
