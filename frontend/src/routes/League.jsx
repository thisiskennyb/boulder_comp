import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getSingleLeague, getTeamsByLeague } from "../api/backend_calls";


export default function League() {

    let { leagueId } = useParams();
    const [leagueData, setLeagueData] = useState("")
    const [teamsData, setTeamsData] = useState([])

    const navigate = useNavigate();


    useEffect(() => {
        const fetchLeague = async () => {
            // returs the individual league data
            const league =  await getSingleLeague(leagueId)
            // returns all team data for the given league
            const teams = await getTeamsByLeague(leagueId)
            console.log("chips", league)
            console.log("dope", teams)
            setLeagueData(league)
            setTeamsData(teams)
    }  
        fetchLeague()
      },[]); 


      const handleViewTeam = (team_id) => {
        navigate(`/team/${team_id}`);
      }
    
    return (
        <div>
        <div>League name {leagueData.league_name}</div>
        <div>This league starts on {leagueData.start_date} and ends on {leagueData.end_date}</div>
        <div>team size for this league is</div>
        <h2>Teams:</h2>
                <ul>
                    {teamsData.map((team, index) => (
                        <li key={index}>{team.team_name} <button onClick={() => handleViewTeam(team.id)}>view</button></li>
                    ))}
                </ul>
        </div>
    )
}