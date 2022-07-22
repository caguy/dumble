import { useAppDispatch } from "@/app/hooks";
import ChooseUsername from "@/features/user/components/ChooseUsername";
import { choosePlayerName } from "@/features/user/userSlice";

const Intro = () => {
  const dispatch = useAppDispatch();

  const onUsernameChosen = (params: { username: string }) => {
    dispatch(choosePlayerName({ name: params.username }));
  };

  return (
    <div>
      <h1>Dumble</h1>
      <ChooseUsername onSubmit={onUsernameChosen} />
    </div>
  );
};

export default Intro;
