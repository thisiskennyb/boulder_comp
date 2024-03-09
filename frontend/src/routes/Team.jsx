import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getTeam } from "../api/Team/backend_calls";
import TeamSendTable from "../components/TeamSendTable";
import UserContext from "../contexts/UserContext";
import defaultImage from "../assets/default_image.png"

export default function Team() {
  let { teamId } = useParams();

  const [team, setTeam] = useState(null);
  const [leagueStartDate, setLeagueStartDate] = useState('');
  const [leagueEndDate, setLeagueEndDate] = useState('');
  const [members, setMembers] = useState([]);

  const { userDashboard } = useContext(UserContext)

  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchTeam = async () => {
      const team = await getTeam(teamId);
      if (team?.status == 200) {
        const teamInfo = team?.data // stores teamInfo in a variable
        setTeam(teamInfo); //prevents having to ?. before accessing, as the variable will not be null once it is assigned
        setLeagueStartDate(teamInfo.league['start_date']);
        setLeagueEndDate(teamInfo.league['end_date']);
        const updatedMembers = teamInfo.members.map(member => ({
          ...member, score: calculateUserScore(member.sends) //When we map over members, we use calculateUserScore to add score to member object
        }))
        setMembers(updatedMembers); // updatedMembers have their individual score
      }
    };
    fetchTeam();
  }, []);


  function isDateInRange(dateToCheck, startDate = leagueStartDate, endDate = leagueEndDate) {
    const date = new Date(dateToCheck);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return start <= date && date <= end;
  }




  const calculateUserScore = (send_arr) => {
    let score = 0;

    for (let send of send_arr) {
      if (isDateInRange(send.send_date)) {
        score += send.score;
      }
    }

    return score;
  };

  const teamSendData = [];
  members.forEach(member => { // For each member, for each send
    member.sends.forEach(send => {
      if (isDateInRange(send.send_date)) { // Check the date of each send
        teamSendData.push({ //If the dates are in range push new object into teamSendData
          boulder: send.boulder.name,
          grade: send.boulder.grade,
          crag: send.boulder.crag,
          username: member.username, // We did this to get username, could look at sendSerializer to make this easier in future
          send_date: send.send_date,
          score: send.score // Keeping send score, username, and send data together
        });
      }
    });
  });

  const handleNavitageImageUpload = () => {
    navigate(`/select-team-image/${teamId}`)
  }

  // Sort team send data by send date in descending order
  const sortedTeamSends = teamSendData.sort((a, b) => new Date(b.send_date) - new Date(a.send_date));

  console.log(team)

  return (
    <div className="bg-night min-h-screen py-4">
      <div className="container mx-auto">
        {/* Team Information */}
        <div className="text-center">
          <div className="flex flex-col items-center justify-center">
            {/* Check for picture, render placeholder if not picture */}
            {team && team.team_picture ? (
              <img src={team?.team_picture} alt='placeholder for league' className="size-32 rounded-full my-4" />
            ) : (
              <img src={defaultImage} alt='placeholder for league' className="size-32 rounded-full my-4" />
            )}

            {team && userDashboard?.user == team.captain.id && (
              <button className="bg-gray-800 font-nunito min-w-min text-white text-lg md:text-xl rounded-md border border-white hover:bg-gray-600 hover:text-white" onClick={handleNavitageImageUpload}>
                UPLOAD
              </button>
            )}
            
          </div>
  
          <h1 className="text-white font-nunito text-3xl font-bold">{team?.team_name}</h1>
          <hr className="border-t-2 border-gray-300 my-2" />
          <div className="flex justify-around">
            <div>
              <p className="text-white font-nunito text-xl">Team Score: {team?.score}</p>
            </div>
            <div>
              <p className="text-white font-nunito text-xl">Rank: {team?.rank}</p>
            </div>
          </div>
        </div>
  
        {/* Render TeamSendTable component with sorted team send data */}
        <TeamSendTable teamSends={sortedTeamSends} />
      </div>
    </div>
  );
}
