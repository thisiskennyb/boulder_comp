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
        // const createNewTeam = await createTeam({league_id:leagueId, team_name:teamNameInput})
        // if 
        // console.log(createNewTeam)
        // const updatedTeams = await getTeamsByLeague(leagueId);
        // setTeamsData(updatedTeams);
        // closeModal()
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
        <button onClick={openModal}>create team</button>
        <h2>Teams:</h2>

        {teamsData && teamsData.map((team, index) => (
  <tr key={team.id}>
    <td>{team.rank}</td>
    <td>{team.team_name}</td>
    <td>{team.score}</td>
    <td><button onClick={() => handleViewTeam(team.id)}>view</button></td>
    <td><button onClick={() => handleJoinTeam(team.id, team.league.id)}>join</button></td>
  </tr>
))}
        
        
        
        {/* <div>League name {leagueData.league_name}</div>
        <div>This league starts on {leagueData.start_date} and ends on {leagueData.end_date}</div>
        <div>team size for this league is: {leagueData.team_size}</div>
        <button onClick={openModal}>create team</button>
        <h2>Teams:</h2>
                <ul>
                    {teamsData.map((team, index) => (
                        <li key={index}>{team.team_name} <button onClick={() => handleViewTeam(team.id)}>view</button><button onClick={() => handleJoinTeam(team.id, team.league.id)}>join</button></li>
                    ))}
                </ul> */}

            
                {/* <ul>
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
                    </ul> */}
                 
        </div>
    )
}