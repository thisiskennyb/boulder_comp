import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { getSingleLeague, getTeamsByLeague, createTeam, joinTeam } from "../api/backend_calls";
import Modal from '../components/Modal';

import { toast } from "react-toastify";


export default function League() {

    let { leagueId } = useParams();
    const [leagueData, setLeagueData] = useState("")
    const [teamsData, setTeamsData] = useState([])
    const [isModalOpen, setModalOpen] = useState(false);
    const [teamNameInput, setTeamNameInput] = useState("")

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

      const handleTeamInput = (e) => {
        setTeamNameInput(e.target.value)
      }

      console.log(teamNameInput)

      const handleCreateTeam = async () => {
        const createNewTeam = await createTeam({league_id:leagueId, team_name:teamNameInput})
        console.log(createNewTeam)
        const updatedTeams = await getTeamsByLeague(leagueId);
        setTeamsData(updatedTeams);
        closeModal()
      }

      const handleJoinTeam = async (teamId, leagueId) => {
        try {
          const response = await joinTeam({league_id:leagueId, team_id:teamId})
          if (response.status == 200) {
            toast.success('You have joined the team!')
          }

        } catch (error) {
          console.error('Something went wrong', error.response.status)
          toast.error('You are already on this team!')
        }
        // need toast notification that team was succesfully joined

      }


      const closeModal = () => setModalOpen(false);

      const openModal = (event) => {
        event.preventDefault(); 
        setModalOpen(true);
      };
    
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
        <div>team size for this league is</div>
        <button onClick={openModal}>create team</button>
        <h2>Teams:</h2>
                <ul>
                    {teamsData.map((team, index) => (
                        <li key={index}>{team.team_name} <button onClick={() => handleViewTeam(team.id)}>view</button><button onClick={() => handleJoinTeam(team.id, team.league.id)}>join</button></li>
                    ))}
                </ul>
        </div>
    )
}