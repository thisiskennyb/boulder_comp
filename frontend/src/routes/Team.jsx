import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getTeam } from "../api/backend_calls";


// We need each team member, their individual score, and the boulders that were sent during the comp
// the score is based off of the boulders that are valid in the leagues time range

// 


export default function Team() {
    
    let { teamId } = useParams();

    const [team, setTeam] = useState(null);
    const [leagueStartDate, setLeagueStartDate] = useState('');
    const [leagueEndDate, setLeagueEndDate] = useState('');
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchTeam = async () => {
            const team =  await getTeam(teamId);
            setTeam(team);
            setLeagueStartDate(team.league['start_date']);
            setLeagueEndDate(team.league['end_date']);
            setMembers(team.members);
        };  
        fetchTeam();
    },[]); 

    function isDateInRange(dateToCheck, startDate=leagueStartDate, endDate=leagueEndDate) {
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

    return(
        <div>
            <div>This is the teams page {teamId}</div>
        
            {team && (
                <>
                    <h1>Team: {team.team_name}</h1>
                    <h2>Team Members</h2>
                    <ul>
                        {members.map((member, index) => (
                            <li key={index}>
                                {member.username}
                                <ul>
                                    {member.sends.map((send, sendIndex) => (
                                        isDateInRange(send.send_date) && (
                                            <li key={sendIndex}>
                                                {send.boulder.name} - {send.score}
                                            </li>
                                        )
                                    ))}
                                </ul>
                                <div>Total Score: {calculateUserScore(member.sends)}</div>
                            </li>
                        ))}
                    </ul>
                    <div>Total Team Score: {calculateTotalScore()}</div>
                </>
            )}
        </div>
    );
}