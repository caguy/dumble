import { Middleware } from "redux";
import { io, Socket } from "socket.io-client";
import UserEvent from "./settings/UserEvent";
import { choosePlayerName, connected, receiveOnlinePlayers } from "./userSlice";

const userMiddleware: Middleware = (store) => {
  const dispatch = store.dispatch;
  let socket: Socket;

  return (next) => (action) => {
    //const isConnectionEstablished = socket && state.user.isConnected;

    if (choosePlayerName.match(action)) {
      socket = io("http://localhost:3000");

      socket.on(UserEvent.UserConnected, () => {
        dispatch(connected());
        socket.emit(UserEvent.UsernameChosen, {
          username: action.payload.name,
        });
      });

      socket.on(
        UserEvent.GetOnlinePlayers,
        (players: { username: string }[]) => {
          dispatch(receiveOnlinePlayers(players));
        }
      );
    }

    next(action);
  };
};

export default userMiddleware;
