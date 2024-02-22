import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { getSingleLeague, getTeamsByLeague } from "../api/backend_calls";


export default function League() {

    let { leagueId } = useParams();
    const [leagueData, setLeagueData] = useState("")
    const [teamsData, setTeamsData] = useState("")


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
    
    return (
        <div>
        <div>League name {leagueData.league_name}</div>
        <div>This league starts on {leagueData.start_date} and ends on {leagueData.end_date}</div>
        <div>team size for this league is</div>
        </div>
    )
}