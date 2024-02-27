import { useNavigate } from "react-router-dom";

export default function LeaguesHome() {
  const navigate = useNavigate();

  const onCreateHandler = () => {
    navigate("/create-league");
  };

  const onJoinHandler = () => {
    navigate("/join-league");
  };

  return (
    <>
      <button onClick={onCreateHandler}>create</button>
      <button onClick={onJoinHandler}>join</button>
    </>
  );
}
