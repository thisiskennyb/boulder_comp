import { useContext } from "react"
import UserContext from "../contexts/UserContext"


export default function DashboardLeagues(){

    const { usersTeams, fetchUserTeams, highestBoulderGrade, setHighestBoulderGrade} = useContext(UserContext)

    console.log(usersTeams)

    return (
        <UserContext.Provider value={usersTeams}>
        <div>
        {usersTeams.length > 0 && (
                        usersTeams.map((team) => (
                            <div key={team.id}>
                                <h2>League Name: {team.league.league_name}</h2>
                                <p>Duration: {team.league.start_date} to {team.league.end_date}</p>
                                <p>team name: {team.team_name}</p>
                                <p>team rank: {team.rank}/{team.league.number_of_teams}</p>
                                <button onClick={() => handleViewLeague(team.league.id)}>view</button>
                            </div>
                        ))
                    )}
        </div>
        </UserContext.Provider>

       
    )
}