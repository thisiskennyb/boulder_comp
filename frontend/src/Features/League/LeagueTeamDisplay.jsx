import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import { joinTeam } from '../../api/Team/backend_calls';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

export default function LeagueTeamDisplay({teamsData, leagueParticipants, userDashboardID, toggleJoinLeague}){
// This component takes in 
// teamsData, the teams that belong to a specific league
// leagueParticipants, a list of user ID's that have joined a team in the league
// userDashboardID, the users ID
// toggleJoinLeague, a function that triggers the useEffect in League.jsx

// Create Team and Join buttons are conditionally rendered, showing if the user is NOT a participant in the league already
    const {contextFetchUserTeams } = useContext(UserContext)
    const navigate = useNavigate()

        // OnClick for view team
    const handleViewTeam = (team_id) => {
        navigate(`/team/${team_id}`);
    };




        // OnClick for Join Team, updates state that triggers useEffect
    const handleJoinTeam = async (teamId, leagueId) => {
        try {
        const response = await joinTeam({ league_id: leagueId, team_id: teamId });
        if (response.status === 200) {
            toast.success('You have joined the team!');
            toggleJoinLeague()
            contextFetchUserTeams()
        }
        } catch (error) {
        console.error('Something went wrong', error.response.status);
        toast.error('You can only join one team per league');
        }
    };



    return (
        <>

      <div className="flex bg-gray-800 text-white text-base w-11/12 md:w-4/5 mx-auto rounded-lg mt-8 items-center">
        <h2 className="text-white text-base md:text-4xl font-nunito w-1/6 md:w-1/4 text-center">Rank</h2>
        <h2 className="text-white text-base font-nunito md:text-3xl w-1/4 md:w-1/4 text-center">Team</h2>
        <h2 className="text-white text-base font-nunito md:text-3xl w-1/6 md:w-1/4 text-center">Score</h2>
        <div className="flex justify-end md:justify-evenly">
        <h2 className="text-white text-base font-nunito md:text-3xl w-1/4 md:w-1/4 text-center">Actions</h2>
        </div>
      </div>
      <div className="flex">
        <hr className="w-11/12 md:w-4/5"></hr>
      </div>




      {teamsData?.length > 0 && (
        teamsData.map((team) => (
            <div key={team.id} className="flex flex-col">
                <div className="flex bg-gray-700 w-11/12 md:w-4/5 mx-auto rounded-lg items-center">
                <h2 className="text-white text-sm md:text-xl font-nunito w-1/6 md:w-1/4 text-center">{team.rank}</h2>
                <p className="text-white text-sm md:text-xl font-nunito w-1/4 md:w-1/4 text-center">{team.team_name}</p>
                <p className="text-white text-sm md:text-xl font-nunito w-1/6 md:w-1/4 text-center">{team.score}</p>
                <div className="flex justify-between items-center w-1/4 md:w-1/4">
                  <div className="flex items-center w-1/12 md:w-1/2">
                    <button className=" bg-gray-800 min-w-min w-1/4 font-nunito text-white text-xs md:text-2xl rounded-lg border border-white ml-3 md:ml-0 md:w-4/5 md:h-1/2 hover:bg-gray-600 hover:text-white  transition-colors duration-300"
                      onClick={() => handleViewTeam(team.id)}
                      >VIEW
                    </button>
                  </div>

              <div className="flex items-center w-1/12 md:w-1/2">
          
                 {/* This check is simply ensuring that the user is not already a participant, and the league has not already started */}
      {/* We make sure we have leagueData and userDashboard data before trying to map the league participant ids into a list to check against the user id */}
              {team.members && leagueParticipants && team.members.length < team.league.team_size && !leagueParticipants.includes(userDashboardID) && (
                <button className="bg-gray-800 min-w-min w-1/3 font-nunito text-white text-xs md:text-xl rounded-lg border border-white ml-3 md:ml-0 md:w-4/5 md:h-1/2 hover:bg-gray-600 hover:text-white transition-colors duration-300" onClick={() => handleJoinTeam(team.id, team.league.id)}>Join</button>
          )}
              </div> 
            </div>

                </div>
                <hr className="w-11/12 md:w-4/5"></hr>
            </div>            
                ))
            )}
        </>
    )
}