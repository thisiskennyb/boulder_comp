import { useNavigate } from "react-router-dom";
import joinLeagueIcon from "../assets/joinLeagueIcon.png"
import createLeagueIcon from "../assets/createLeagueIcon.png"

export default function LeaguesHome() {
  const navigate = useNavigate();

  const onCreateHandler = () => {
    navigate("/create-league");
  };

  const onJoinHandler = () => {
    navigate("/join-league");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-night">
      {/* Text at the top */}
      <h1 className="text-white font-nunito text-3xl my-8">Welcome to Leagues Home</h1>
      
      {/* Grid container for buttons and icons */}
      <div className="grid grid-cols-2 gap-24">
        {/* Button and icon for creating */}
        <div className="flex flex-col items-center">
          <img src={createLeagueIcon} alt="Create League Icon" className="h-24 mb-4" />
          <button onClick={onCreateHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
            Create
          </button>
        </div>

        {/* Button and icon for joining */}
        <div className="flex flex-col items-center">
          <img src={joinLeagueIcon} alt="Join League Icon" className="h-24 mb-4" />
          <button onClick={onJoinHandler} className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg">
            Join
          </button>
        </div>
      </div>
    </div>
  );
}