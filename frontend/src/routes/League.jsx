import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { createTeam } from "../api/Team/backend_calls";
import { joinTeam } from "../api/Team/backend_calls";
import { getTeamsByLeague } from "../api/Team/backend_calls";
import { getSingleLeague } from "../api/League/backend_calls";
import Modal from '../components/Modal';
import { toast } from "react-toastify";


export default function League() {

    let { leagueId } = useParams();
    const [leagueData, setLeagueData] = useState("")
    const [teamsData, setTeamsData] = useState(null)
    const [isModalOpen, setModalOpen] = useState(false);
    const [teamNameInput, setTeamNameInput] = useState("")

    const navigate = useNavigate();


    useEffect(() => {
        const fetchLeague = async () => {
            // returs the individual league data
            const league =  await getSingleLeague(leagueId)
            // returns all team data for the given league
            const teams = await getTeamsByLeague(leagueId)
            setLeagueData(league.data)
            setTeamsData(teams.data)
    }  
        fetchLeague()
      },[isModalOpen]); 


      const handleViewTeam = (team_id) => {
        navigate(`/team/${team_id}`);
      }

      const handleTeamInput = (e) => {
        setTeamNameInput(e.target.value)
      }

  

      const handleCreateTeam = async () => {
        try {
          const response = await createTeam({league_id:leagueId, team_name:teamNameInput})
          if (response.status == 201) {
            toast.success('Team successfully created')
                const updatedTeams = await getTeamsByLeague(leagueId);
                setTeamsData(updatedTeams);
                closeModal()
          }

        } catch (error) {
          console.error('Something went wrong', error.response.status)
          toast.error('You are already a member of a team')
        }
      }

      const handleJoinTeam = async (teamId, leagueId) => {
        try {
          const response = await joinTeam({league_id:leagueId, team_id:teamId})
          if (response.status == 200) {
            toast.success('You have joined the team!')
          }

        } catch (error) {
          console.error('Something went wrong', error.response.status)
          toast.error('You can only join one team per league')
        }

      }


      const closeModal = () => setModalOpen(false);

      const openModal = (event) => {
        event.preventDefault(); 
        setModalOpen(true);
      };


      console.log(teamsData)
    
    return (
        <div>
        
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className='font-nunito text-center'>
                Please enter team name
            </div>
            <div className="flex flex-col items-center">
                <input
                id="team-name"
                type="text"
                className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500"
                placeholder="team name"
                onChange={handleTeamInput}
                />
                <div>
                <button onClick={handleCreateTeam} className="bg-gray-800 hover:bg-gray-700 text-white font-nunito py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline">
                    Submit
                </button>
                </div>
            </div>
        </Modal>

        <div>League name {leagueData.league_name}</div>
        <div>This league starts on {leagueData.start_date} and ends on {leagueData.end_date}</div>
        <div>team size for this league is: {leagueData.team_size}</div>
        {new Date() < new Date(leagueData.start_date) && (
          <button onClick={openModal}>create team</button>
        )}
        <h2>Teams:</h2>


        {Array.isArray(teamsData) && teamsData.map((team, index) => (
          <div key={team.id}>
            <span>{team.rank}</span>
            <span>{team.team_name}</span>
            <span>{team.score}</span>
            <span><button onClick={() => handleViewTeam(team.id)}>view</button></span>
            <span><button onClick={() => handleJoinTeam(team.id, team.league.id)}>join</button></span>

  
    {/* <td>{team.rank}</td>
    <td>{team.team_name}</td>
    <td>{team.score}</td>
    <td><button onClick={() => handleViewTeam(team.id)}>view</button></td>
    <td><button onClick={() => handleJoinTeam(team.id, team.league.id)}>join</button></td> */}
  </div>
))}
                 
        </div>
    )
}