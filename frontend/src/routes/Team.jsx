import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTeam } from "../api/Team/backend_calls";

export default function Team() {
  let { teamId } = useParams();

  const [team, setTeam] = useState(null);
  const [leagueStartDate, setLeagueStartDate] = useState('');
  const [leagueEndDate, setLeagueEndDate] = useState('');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const team = await getTeam(teamId);
      setTeam(team.data);
      setLeagueStartDate(team.league['start_date']);
      setLeagueEndDate(team.league['end_date']);
      setMembers(team.members);
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

  const calculateTotalScore = () => {
    let totalScore = 0;

    for (let member of members) {
      totalScore += calculateUserScore(member.sends);
    }

    return totalScore;
  };

  console.log(team);

  return (
    <div>
      <div>Score: {team?.score}</div>
      <div>Rank: {team?.rank}</div>
      {members.map((member) => (
        <div key={member.id}>
          <ul>
            {member.sends.map((send) => (
              <li key={send.id}>
                <strong>Boulder:</strong> {send.boulder.name}<br />
                <strong>Grade:</strong> {send.boulder.grade}<br />
                <strong>Area:</strong> {send.boulder.crag}<br />
                <strong>Username:</strong> {member.username}<br />
                <strong>Date of Send:</strong> {send.send_date}<br />
                <strong>Points for Send:</strong> {send.score}<br />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
