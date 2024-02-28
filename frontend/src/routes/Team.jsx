import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTeam } from "../api/Team/backend_calls";
import TeamSendTable from "../components/TeamSendTable";

export default function Team() {
  let { teamId } = useParams();

  const [team, setTeam] = useState(null);
  const [leagueStartDate, setLeagueStartDate] = useState('');
  const [leagueEndDate, setLeagueEndDate] = useState('');
  const [members, setMembers] = useState([]);

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

  // Sort team send data by send date in descending order
  const sortedTeamSends = teamSendData.sort((a, b) => new Date(b.send_date) - new Date(a.send_date));


  return (
    <div className="container mx-auto">
      {/* Team Information */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{team?.team_name}</h1>
        <hr className="border-t-2 border-gray-300 my-2" />
        <div className="flex justify-around">
          <div>
            <p>Team Score: {team?.score}</p>
          </div>
          <div>
            <p>Rank: {team?.rank}</p>
          </div>
        </div>
      </div>

      {/* Render TeamSendTable component with sorted team send data */}
      <TeamSendTable teamSends={sortedTeamSends} />
    </div>
  );
}
