import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext"

export default function DashboardLeagues(){

    const { usersTeams } = useContext(UserContext)
    const navigate = useNavigate()

    const handleViewLeague = (league_id) => {
        navigate(`/league/${league_id}`);
    };

    const handleNavigateToLeaguesHome = () => {
        navigate("/leagues-home")
    }
    console.log(usersTeams, 'lets look at this')

    return (
        <div>
        { usersTeams.length == 0 ? (
            <div className="flex flex-col items-center text-white">
                <div className="font-nunito text-3xl my-10">Join a league to get started!</div>
                <button className="bg-gray-800 mb-5 font-nunito text-white text-lg rounded-md border border-white hover:bg-gray-600 hover:text-white px-4 py-2 mt-2 transition-colors duration-300" onClick={handleNavigateToLeaguesHome}>Leagues Home</button>
            </div>
        ):(
            <div className="bg-night min-h-screen">
            {/* Set different widths for moble and web display
            This div handles all of the table headers */}
             <div className="flex bg-gray-800 w-11/12 md:w-4/5 mx-auto rounded-lg">
            <h2 className="text-white text-sm font-nunito w-1/3 md:text-4xl  md:w-1/5 text-center">League</h2>
            <h2 className="text-white text-sm font-nunito w-1/4 md:text-4xl md:w-1/5 text-center">Dates</h2>
            <h2 className="text-white text-sm font-nunito w-1/6 md:text-4xl md:w-1/5 text-center">Team</h2>
            <h2 className="text-white text-sm font-nunito w-1/12 md:text-4xl md:w-1/5 text-center">Rank</h2>
            </div>
            <div className="flex">
                <hr className="w-11/12 md:w-4/5"></hr>
            </div>
        {usersTeams.length > 0 && (
                        usersTeams.map((team) => (
                            
                            <div key={team.id} className="flex flex-col">
                                {/* here we are iterating through team info, the outer div gets our rows stacked in a single column
                                The row to be added is within the flex div below */}
                                <div className="flex bg-gray-700 w-11/12 md:w-4/5 mx-auto rounded-lg">
                                <p className="text-white text-xs w-1/3 md:text-xl font-nunito md:w-1/5 text-center">{team.league.league_name}</p>
                                <p className="text-white text-xs w-1/4 md:text-xl font-nunito md:w-1/5 text-center">{team.league.start_date} to {team.league.end_date}</p>
                                <p className="text-white text-xs w-1/6 md:text-xl font-nunito md:w-1/5 text-center">{team.team_name}</p>
                                <p className="text-white text-xs w-1/12 md:text-xl font-nunito md:w-1/5 text-center">{team.rank}/{team.league.number_of_teams}</p>
                                {/* This div helps us position our button for middle, but also gives us some control over the fractional widths
                                With this we can use min-w-min to make minimum width the width the min width of our content, like View for example */}
                                <div className="flex justify-center items-center w-1/12 md:w-1/5">
                                <button className=" bg-gray-800 min-w-min w-1/12 font-nunito text-white text-xs md:text-lg rounded-lg border border-white ml-5 md:ml-0 md:w-4/5 md:h-1/2 hover:bg-gray-600 hover:text-white  transition-colors duration-300" onClick={() => handleViewLeague(team.league.id)}>VIEW</button>
                                </div>
                                </div>
                                    <hr className="w-11/12 md:w-4/5"></hr>
                            </div>
                        ))
                    )}
        </div>
        )}
  
        </div>    
    )
}