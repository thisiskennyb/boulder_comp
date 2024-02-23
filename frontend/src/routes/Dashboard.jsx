import { teamsUserIsIn } from "../api/backend_calls"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardTeamCard from "../components/DashboardTeamCard"

export default function Dashboard() {

    const [usersTeams, setUsersTeams] = useState([])

    const navigate = useNavigate();

    // get all teams the user is on upon page load
    useEffect(() => {
        const fetchUserTeams = async () => {
            try {
                const data = await teamsUserIsIn();
                setUsersTeams(data);
            } catch (error) {
                console.error("Error fetching leagues:", error);
            }
        };

        fetchUserTeams();
    }, []);

    const handleViewLeague = (league_id) => {
        navigate(`/league/${league_id}`);
    }



    return (
    <>
    <h1>Welcome to your dashboard!</h1>
    <h4>Here you can see your latest sends and stuff</h4>
    {usersTeams.map((team) => (
                <div key={team.id}>
                    <h2>League Name: {team.league.league_name}</h2>
                    <p>team name: {team.team_name}</p>
                    <p>team rank: {team.rank}/{team.league.number_of_teams}</p>
                    <p>team score: {team.score}</p>
                    <button onClick={() => handleViewLeague(team.league.id)}>view</button>
                    
                    {/* Add other league details as needed */}
                    {/* <button onClick={() => viewHandler(league.id)}>View</button> */}
                </div>
            ))}

    </>)
}