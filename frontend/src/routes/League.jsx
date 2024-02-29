import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleLeague } from "../api/League/backend_calls";
import { createTeam, joinTeam, getTeamsByLeague } from "../api/Team/backend_calls";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

export default function League() {
  const { leagueId } = useParams();
  const [leagueData, setLeagueData] = useState("");
  const [teamsData, setTeamsData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [teamNameInput, setTeamNameInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeague = async () => {
      try {
        const leagueResponse = await getSingleLeague(leagueId);
        const teamsResponse = await getTeamsByLeague(leagueId);
        setLeagueData(leagueResponse.data);
        setTeamsData(teamsResponse.data);
      } catch (error) {
        console.error("Error fetching league and teams data:", error);
      }
    };
    fetchLeague();
  }, [isModalOpen]);

  const handleViewTeam = (team_id) => {
    navigate(`/team/${team_id}`);
  };

  const handleTeamInput = (e) => {
    setTeamNameInput(e.target.value);
  };

  const handleCreateTeam = async () => {
    try {
      const response = await createTeam({ league_id: leagueId, team_name: teamNameInput });
      if (response.status === 201) {
        toast.success('Team successfully created');
        const updatedTeams = await getTeamsByLeague(leagueId);
        setTeamsData(updatedTeams.data);
        closeModal();
      }
    } catch (error) {
      console.error('Something went wrong', error.response.status);
      toast.error('You are already a member of a team');
    }
  };

  const handleJoinTeam = async (teamId, leagueId) => {
    try {
      const response = await joinTeam({ league_id: leagueId, team_id: teamId });
      if (response.status === 200) {
        toast.success('You have joined the team!');
      }
    } catch (error) {
      console.error('Something went wrong', error.response.status);
      toast.error('You can only join one team per league');
    }
  };

  const closeModal = () => setModalOpen(false);

  const openModal = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  console.log(teamsData, 'what do we have here')

  return (
    <div className="bg-night min-h-screen py-5">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="font-nunito text-center">Please enter team name</div>
        <div className="flex flex-col items-center">
          <input
            id="team-name"
            type="text"
            className="p-2 my-3 border border-gray-300 rounded-md font-nunito focus:outline-none focus:border-blue-500"
            placeholder="team name"
            onChange={handleTeamInput}
          />
          <div>
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-nunito py-2 px-4 border border-gray-700 rounded-full focus:outline-none focus:shadow-outline" onClick={handleCreateTeam}>Submit</button>
          </div>
        </div>
      </Modal>

      <div className="flex items-center text-white font-nunito text-3xl justify-center">
      <img src="https://placekitten.com/200/200" alt='placeholder for league' className="w-20 h-35 rounded-full mb-4 mx-4" />
      <div className="text-white font-nunito text-base md:text-3xl">{leagueData.league_name}</div>
      </div>
      <div className="text-white font-nunito text-xs md:text-xl text-center">This league starts on {leagueData.start_date} and ends on {leagueData.end_date}</div>
      <div className="text-white font-nunito text-sm md:text-xl text-center">team size for this league is: {leagueData.team_size}</div>
      {new Date() < new Date(leagueData.start_date) && (
        <button onClick={openModal}>create team</button>
      )}

      <div className="flex bg-gray-800 w-11/12 md:w-4/5 mx-auto rounded-lg mt-8 items-center">
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
        teamsData.map((team, index) => (
            <div key={team.id} className="flex flex-col">
                <div className="flex bg-gray-700 w-11/12 md:w-4/5 mx-auto rounded-lg items-center">
                <h2 className="text-white text-sm md:text-xl font-nunito w-1/6 md:w-1/4 text-center">{team.rank}</h2>
                <p className="text-white text-sm md:text-xl font-nunito w-1/4 md:w-1/4 text-center">{team.team_name}</p>
                <p className="text-white text-sm md:text-xl font-nunito w-1/6 md:w-1/4 text-center">{team.score}</p>
                <div className="flex justify-between items-center w-1/4 md:w-1/4">
                  <div className="flex items-center w-1/12 md:w-1/2">
                    <button className=" bg-gray-800 min-w-min w-1/4 font-nunito text-white text-xs md:text-xl rounded-lg border border-white ml-3 md:ml-0 md:w-4/5 md:h-1/2 hover:bg-gray-600 hover:text-white  transition-colors duration-300"
                      onClick={() => handleViewTeam(team.id)}
                      >View
                    </button>
                  </div>

              <div className="flex items-center w-1/12 md:w-1/2">
                <button className=" bg-gray-800 min-w-min w-1/3 font-nunito text-white text-xs md:text-xl rounded-lg border border-white ml-3 md:ml-0 md:w-4/5 md:h-1/2 hover:bg-gray-600 hover:text-white  transition-colors duration-300" onClick={() => handleJoinTeam(team.id, team.league.id)}>Join</button>
              </div> 
            </div>

                </div>
                <hr className="w-11/12 md:w-4/5"></hr>
            </div>            
                ))
            )}

    </div>
  );
}
